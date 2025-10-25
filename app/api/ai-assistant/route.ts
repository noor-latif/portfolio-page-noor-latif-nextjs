import { GoogleGenAI } from "@google/genai"

// Initialize Gemini API
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

export async function POST(request: Request) {
  try {
    // <SRE> Request logging
    console.log("[v0] Incoming AI assistant request")

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
