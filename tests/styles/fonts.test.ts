import { describe, it, expect } from "vitest"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

function readFileFromRoot(...pathSegments: string[]) {
  return readFileSync(resolve(process.cwd(), ...pathSegments), "utf8")
}

describe("Typography configuration", () => {
  it("sets Tomorrow as the default sans font", () => {
    const css = readFileFromRoot("app", "globals.css")
    expect(css).toMatch(/--font-sans:\s*var\(--font-tomorrow\)/)
  })

  it("keeps an explicit Inter override for the AI assistant", () => {
    const component = readFileFromRoot("components", "ai-assistant-modal.tsx")
    expect(component).toMatch(/font-\[family-name:var\(--font-inter\)\]/)
  })

  it("registers the Tomorrow font in the root layout", () => {
    const layout = readFileFromRoot("app", "layout.tsx")
    expect(layout).toContain("--font-tomorrow")
  })
})

