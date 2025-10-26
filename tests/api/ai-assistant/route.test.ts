import { describe, it, expect } from 'vitest'
import { POST } from '../../../app/api/ai-assistant/route'

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/ai-assistant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('AI Assistant API validation', () => {
  it('returns 400 when fields are missing', async () => {
    const res = await POST(makeRequest({}))
    expect(res.status).toBe(400)
  })

  it('returns 400 when fields are wrong type', async () => {
    const res = await POST(makeRequest({ project_id: 1, question: {}, context: [] }))
    expect(res.status).toBe(400)
  })
})
