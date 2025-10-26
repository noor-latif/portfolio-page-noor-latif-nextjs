# plan.md

## Overview

Local-first portfolio for Noor Latif built with Next.js 16 (App Router) and Tailwind CSS 4. It showcases measurable impact across DevOps, automation, and IoT, and includes an AI “Deep Dive” assistant.

Key bits
- Sections: Hero, Skills/Certifications, Case Studies, Footer
- AI assistant: `/api/ai-assistant` streams Gemini output
- Content: `data/*.md` for long-form case studies
- UI: Tailwind v4 + shadcn/ui + Lucide, dark by default
- Analytics: `@vercel/analytics` (works locally too)

Success
- Smooth UX and fast loads (target desktop LCP < 2.5s)
- AI answers stream reliably with graceful errors
- Local setup is quick and documented

Principles
- Prefer simple solutions. Avoid overengineering—this is a CV portfolio.

## Scope

### In Scope
- Documentation of current behavior and architecture
- Improving developer ergonomics (env example, docs, tasks)
- Non-breaking UX/content refinements
- Guardrails for the AI API route (validation already present)

### Out of Scope (initial)
- Major redesign or rebrand
- Complex backend/databases; long-lived chat memory
- Vendor lock-in changes (e.g., migrating away from Vercel)

## Requirements

### Functional
- Render landing sections: `HeroSection`, `SkillsCertificationsSection`, `CaseStudiesSection`, `Footer`
- Case studies display metrics/tags and open an AI “Deep Dive” modal per project
- API: POST `/api/ai-assistant` accepts `{ project_id, question, context }` strings; streams Gemini output
- Basic error handling for invalid input, missing env, and simulated rate-limit

### Non-functional
- Performance: responsive, fast first paint; images currently unoptimized flag is enabled
- Reliability: API validates inputs and handles streaming errors
- Security: GEMINI_API_KEY must be set as a Windows system env var; do not log secrets
- Accessibility: adequate contrast/focus states
- Maintainability: TypeScript strict; consistent UI primitives; clear docs

## Design / Architecture

- Next.js App Router under `app/`
  - `app/page.tsx`: layout of sections
  - `app/layout.tsx`: theme/fonts, Vercel Analytics
  - `app/api/ai-assistant/route.ts`: server route calling Google GenAI with streaming
- Components
  - `components/ai-assistant-modal.tsx`: client modal streaming text; guards and UX states
  - `components/*-section.tsx`: hero, skills/certifications, case studies list, footer
  - `components/ui/*`: shadcn/ui primitives (button, card, dialog, inputs…)
- Content: `data/*.md` for detailed write-ups referenced by the modal context strings
- Styles: Tailwind v4 (`app/globals.css`) with theme tokens and electric-blue accents
- Config: `next.config.mjs` currently ignores TypeScript and ESLint errors during builds

Data flow (AI deep dive)
- Modal selects question → POST to `/api/ai-assistant` with project context → server validates + streams Gemini → modal accumulates chunks → markdown renders into the response area

## Tech Stack

Frontend
- Next.js 16 (App Router), React 19, TypeScript 5
- Tailwind CSS 4, shadcn/ui, Lucide Icons

Backend (server routes)
- Next.js Route Handlers (Node runtime)
- Google GenAI (Gemini 2.5 Flash) via `@google/genai`

Tooling
- ESLint, PostCSS, Tailwind
- Vitest (unit), Playwright (e2e)

## Implementation Plan (Checklist)

- [ ] PLAN-1: Create plan.md (this file)
  - Acceptance: File added at repo root with all canonical sections; reviewed in PR
  - Dependencies: none
- [ ] ENV-1: Configure Windows System Environment Variable `GEMINI_API_KEY`
  - Acceptance: API reads `process.env.GEMINI_API_KEY`; no `.env` file used
  - Dependencies: PLAN-1
- [ ] DOCS-1: Update README for local-only workflow (no Vercel links)
  - Acceptance: Windows-friendly commands; env setup documented; local deploy only
  - Dependencies: ENV-1
- [ ] DX-1: Add VS Code tasks (Dev/Lint/Build) and problem matchers
  - Acceptance: One-click run from VS Code Tasks; outputs surface in Problems panel
  - Dependencies: PLAN-1
- [ ] LINT-1: Minimal ESLint setup (flat config)
  - Acceptance: `pnpm lint` runs cleanly with light rules; no blocking on build
  - Dependencies: DX-1
- [ ] TEST-1: Unit tests (Vitest) for `lib/utils.ts` and API validation
  - Acceptance: `pnpm test` runs/passes; coverage on changed files > 60%
  - Dependencies: LINT-1
- [ ] TEST-2: E2E tests (Playwright) for core journeys (home loads, AI modal opens)
  - Acceptance: `pnpm test:e2e` passes; home renders hero and sections; modal opens
  - Dependencies: DOCS-1
- [ ] PERF-1: Add simple image optimization or placeholders (if needed) and measure LCP
  - Acceptance: Home LCP < 2.5s on desktop in local Lighthouse
  - Dependencies: none
- [ ] A11Y-1: Quick accessibility pass (aria, focus order, contrast)
  - Acceptance: No critical Lighthouse a11y violations on home
  - Dependencies: none
- [ ] API-1: Harden AI route (rate limiting and input size caps)
  - Acceptance: Excessive payloads rejected; basic rate limit returns 429 with retry guidance
  - Dependencies: ENV-1
- [ ] CI-1: GitHub Actions for install/lint/typecheck/build/tests
  - Acceptance: Green checks on PRs; failures block merges
  - Dependencies: LINT-1
- [ ] GIT-1: Use Git + pnpm with descriptive commits
  - Acceptance: Conventional-style or clear message format
  - Dependencies: PLAN-1

## Testing Strategy
- Unit: utilities (e.g., `cn()`), React components with shallow render for fail-fast
- Integration: API route with mocked Gemini client and env via dependency injection
- E2E (optional later): Playwright smoke test for homepage and AI modal open/stream placeholder
- Coverage: Start modest (>60% on changed files); report via Vitest + c8

## Runtime Errors: prevention and handling (simple)
- Pin or update for breaking changes: avoid "latest" for risky libs; update code as needed (e.g., ReactMarkdown className removal)
- Error Boundaries around risky UI: wrap markdown render in a minimal ErrorBoundary with a small fallback
- Guardrails in API: validation + streaming try/catch (already present)
- Fast feedback: dev logs in console, E2E smoke to catch regressions, keep fixes minimal

## Quality Gates
- Build: PASS (2025-10-26) — Next 16 build succeeded; removed deprecated eslint config from `next.config.mjs`
- Lint: PASS (2025-10-26) — Minimal ESLint (flat config) runs clean with light rules
- Unit tests: PASS (2025-10-26) — Vitest 2 ran 3 tests (utils + API validation)
- E2E tests: PASS (2025-10-26) — Playwright smoke test verified homepage sections

Timestamps will be added once checks are executed locally or in CI.

## Milestones & Timeline (lightweight)
- M1 (Today): PLAN-1, ENV-1, DOCS-1
- M2: DX-1, LINT-1, CI-1
- M3: TEST-1, PERF-1, A11Y-1, API-1

## Risks, Assumptions, Constraints
- Requires `GEMINI_API_KEY` as a Windows system env var
- `next.config.mjs` suppresses TS/ESLint errors; may hide issues
- Streaming can be brittle; modal handles errors
- Unoptimized images may affect LCP; consider Next/Image or placeholders

## Open Questions
- Should type/ESLint errors fail builds on Vercel, or remain soft for velocity?
- Preferred minimal test stack: Vitest only, or add Playwright for E2E?
- Any additional projects/sections planned (blog, contact form, resume export)?

## Changelog
- 2025-10-26: Initial plan.md created with end-to-end plan and tasks.

## References & Links
- README: `README.md`
- Key files: `app/page.tsx`, `app/api/ai-assistant/route.ts`, `components/ai-assistant-modal.tsx`, `app/globals.css`

## Handoff for Agent
- Next Task: ENV-1 Add `.env.example` with `GEMINI_API_KEY`
- Blockers: None for docs; AI requires a valid key to function locally
- Last Quality Gates: Not yet run
- How to run (local):
  - Install dependencies: `pnpm install`
  - Start dev server: `pnpm dev` then open http://localhost:3000
  - Lint: `pnpm lint`; Build: `pnpm build`
- Deploy: Vercel (connected; pushes to `main` trigger deploy)
