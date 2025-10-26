import { GoogleGenAI } from "@google/genai"

// Simple in-memory rate limiter (per-process). Fine for local.
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 10
const rateMap = new Map<string, { count: number; reset: number }>()

function getClientId(req: Request) {
  const xf = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  const ua = req.headers.get("user-agent") || "unknown-agent"
  return xf || ua || "local"
}

function checkRate(req: Request) {
  const key = getClientId(req)
  const now = Date.now()
  const rec = rateMap.get(key)
  if (!rec || now > rec.reset) {
    rateMap.set(key, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS })
    return { ok: true as const }
  }
  if (rec.count >= RATE_LIMIT_MAX) {
    return { ok: false as const, retryAfterMs: rec.reset - now }
  }
  rec.count += 1
  return { ok: true as const }
}

// Initialize Gemini API
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

export async function POST(request: Request) {
  try {
    // <SRE> Request logging
    console.log("[v0] Incoming AI assistant request")

    // <SRE> Basic rate limiting
    const rl = checkRate(request)
    if (!rl.ok) {
      console.log("[v0] Rate limit exceeded")
      return new Response("Rate limit exceeded", {
        status: 429,
        headers: rl.retryAfterMs ? { "Retry-After": Math.ceil(rl.retryAfterMs / 1000).toString() } : {},
      })
    }

    // <SRE> Input size cap using content-length (best-effort)
    const len = Number(request.headers.get("content-length") || 0)
    const MAX_BYTES = 200_000 // ~200KB
    if (len && len > MAX_BYTES) {
      console.log("[v0] Payload too large")
      return new Response("Payload too large", { status: 413 })
    }

    // <SRE> Input validation
    const body = await request.json()
    const { project_id, question, context } = body

    if (!project_id || !question || !context) {
      console.log("[v0] Invalid input: missing required fields")
      return new Response("Invalid input: project_id, question, and context are required", {
        status: 400,
      })
    }

    if (typeof project_id !== "string" || typeof question !== "string" || typeof context !== "string") {
      console.log("[v0] Invalid input: fields must be strings")
      return new Response("Invalid input: project_id, question, and context must be strings", {
        status: 400,
      })
    }

    // <SRE> Field length limits
    if (question.length > 500 || context.length > 8000 || project_id.length > 100) {
      console.log("[v0] Invalid input: fields too long")
      return new Response("Invalid input: fields exceed allowed length", { status: 413 })
    }

    console.log(`[v0] Processing request for project: ${project_id}`)

    // <SRE> Rate limit simulation - triggered by 'test failure' phrase
    if (question.toLowerCase().includes("test failure")) {
      console.log("[v0] Rate limit triggered by test phrase")
      return new Response("Rate limit exceeded", { status: 429 })
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.log("[v0] GEMINI_API_KEY not configured")
      return new Response("GEMINI_API_KEY environment variable is not set", {
        status: 500,
      })
    }

    const prompt = `You are a professional technical analyst reviewing Noor Latif's engineering work. Answer the following question directly and professionally, without preambles or phrases like "Based on the context provided."

Project Context:
${context}

Question: ${question}

Provide a clear, technical answer with specific details. Use markdown formatting for readability. Be direct and skip unnecessary introductions.`

    console.log("[v0] Generating AI response with gemini-2.5-flash...")

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    })

    // Create streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            if (chunk.text) {
              controller.enqueue(encoder.encode(chunk.text))
            }
          }
          controller.close()
          console.log("[v0] Response stream completed successfully")
        } catch (error) {
          console.error("[v0] Error during streaming:", error)
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    })
  } catch (error) {
    // <SRE> Error handling
    console.error("[v0] Unhandled error in AI assistant:", error)
    console.error("[v0] Error details:", error)
    return new Response(`Internal server error: ${error instanceof Error ? error.message : "Unknown error"}`, {
      status: 500,
    })
  }
}
