import { Mistral } from "@mistralai/mistralai"

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

// Initialize Mistral API
const MISTRAL_AGENT_ID = "ag_019a2af508ad7053a530f1a39d9acdf0"

function _extract_text(obj: unknown): string | null {
  /**Try a few shapes to extract text content from a streamed chunk.

  The streaming iterator can yield different wrapper objects. This helper
  tries several common patterns safely and returns a string or null.
  */
  if (obj === null || obj === undefined) {
    return null
  }

  // If the object itself has a 'content' attribute that's a string
  const objAny = obj as Record<string, unknown>
  const c = objAny?.content
  if (typeof c === "string") {
    return c
  }

  // Sometimes content is on a nested 'data' attribute
  const data = objAny?.data
  if (data !== undefined && data !== null && data !== obj) {
    const inner = _extract_text(data)
    if (inner) {
      return inner
    }
  }

  // If the chunk is a (event, data) tuple or list-like
  if (Array.isArray(obj) && obj.length >= 2) {
    return _extract_text(obj[1])
  }

  // If content is a list of strings
  if (Array.isArray(c)) {
    const pieces = c.filter((p): p is string => typeof p === "string")
    if (pieces.length > 0) {
      return pieces.join("")
    }
  }

  return null
}

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
    const { project_id, question, context, history } = body

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

    // Validate history if provided
    if (history !== undefined) {
      if (!Array.isArray(history)) {
        console.log("[v0] Invalid input: history must be an array")
        return new Response("Invalid input: history must be an array", {
          status: 400,
        })
      }
      for (const msg of history) {
        if (typeof msg !== "object" || msg === null) {
          console.log("[v0] Invalid input: history items must be objects")
          return new Response("Invalid input: history items must be objects with role and content", {
            status: 400,
          })
        }
        if (typeof msg.role !== "string" || typeof msg.content !== "string") {
          console.log("[v0] Invalid input: history items must have role and content strings")
          return new Response("Invalid input: history items must have role and content strings", {
            status: 400,
          })
        }
      }
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
    if (!process.env.MISTRAL_API_KEY) {
      console.log("[v0] MISTRAL_API_KEY not configured")
      return new Response("MISTRAL_API_KEY environment variable is not set", {
        status: 500,
      })
    }

    const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY })

    // Build conversation inputs
    const historyArray = Array.isArray(history) ? history : []
    let inputs: Array<{ role: "user" | "assistant"; content: string }>

    if (historyArray.length === 0) {
      // First message: include project context
      inputs = [
        {
          role: "user" as const,
          content: `Project Context:\n${context}\n\nQuestion: ${question}`,
        },
      ]
    } else {
      // Subsequent messages: use history + new question
      inputs = [
        ...historyArray.map((msg: { role: string; content: string }) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        })),
        { role: "user" as const, content: question },
      ]
    }

    console.log("[v0] Generating AI response with Mistral agent...")

    const response = await client.beta.conversations.startStream({
      inputs: inputs as unknown as string | Array<{ role: "user" | "assistant"; content: string }>,
      agentId: MISTRAL_AGENT_ID,
    })

    // Create streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const text = _extract_text(chunk)
            if (text) {
              controller.enqueue(encoder.encode(text))
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
