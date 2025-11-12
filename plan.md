# plan.md

## Overview

AI-augmented portfolio (Next.js 16 + Tailwind 4) with an AI “Deep Dive” assistant. Goals: fast, clean, and reliable; modern micro-animations without hurting performance.

## Scope

- In: docs/DX, small UX/content tweaks, AI route guardrails, micro-animations
- Out: redesign, databases, long-lived chat memory, big vendor migrations

## Requirements

- Functional: sections render; AI modal streams; API validates inputs and errors sanely
- Non-functional: fast (desktop LCP < 2.5s), a11y basics, secure env usage (Windows `MISTRAL_API_KEY`), maintainable TS

## Design / Architecture

- App Router (`app/`), shadcn/ui components, Tailwind v4 styles
- AI route: `app/api/ai-assistant/route.ts` → Mistral AI agent stream → modal accumulates → markdown render
- Config: minimal Next config; analytics via `@vercel/analytics`

## Tech Stack

- Frontend: Next 16, React 19, TS 5, Tailwind 4, shadcn/ui, Lucide
- Backend: Route Handlers + `@mistralai/mistralai`
- Tooling: ESLint (flat), Vitest, Playwright

## Implementation Plan

Completed (summary)
- PLAN-1, ENV-1, DOCS-1, DX-1, LINT-1, TEST-1, TEST-2, PERF-1, A11Y-1, API-1, CI-1, GIT-1

Next tasks
- [ ] ANIM-1: Add modern micro-animations
  - Acceptance: subtle hover/press states, section entrances; respects `prefers-reduced-motion`; no layout shift; no FPS drops on mid‑tier laptop
- [ ] PERF-2: Measure and tune
  - Acceptance: Lighthouse desktop LCP ≤ 2.5s; CLS ≤ 0.1; include before/after note in plan Changelog
- [ ] A11Y-2: Quick audit
  - Acceptance: Lighthouse a11y score ≥ 95; keyboard-focusable controls; no color-contrast fails
- [ ] TEST-3: Modal render smoke
  - Acceptance: Unit test mounts `AIAssistantModal` with a sample response and verifies markdown renders without runtime errors
 - [x] NAV-1: Add sticky header with jump navigation
   - Acceptance: Header with links to #hero, #skills, #case-studies; accessible skip link to main content; smooth scrolling
 - [x] HERO-CTA-1: Recruiter AI CTA in hero
   - Acceptance: Secondary CTA opens AI modal with preset recruiter prompts and follow-up; uses overview context
 - [x] CONTENT-1: Rename case study titles
   - Acceptance: Card titles reflect actual project names (Toyota Material Handling, Aqua Robur Technologies, Göteborgs Spårvägar); section heading remains "Case Studies" inclusive

## Testing Strategy
- Unit (Vitest), E2E (Playwright). Keep fast: smoke first, expand as needed.

## Runtime & Resilience
- ErrorBoundary around markdown; API validation + streaming try/catch; avoid risky "latest" pins; smoke tests

## Quality Gates
- PASS (local 2025-10-26 23:24): Lint (eslint .)
- PASS (local 2025-10-26 23:23): Unit (vitest run 3/3)
- PASS (local 2025-10-26 23:24): E2E (playwright smoke 1/1)
- PASS (local 2025-10-26 23:25): Build (next build)

## Milestones & Timeline (lightweight)
- M1 (Today): PLAN-1, ENV-1, DOCS-1
- M2: DX-1, LINT-1, CI-1
- M3: TEST-1, PERF-1, A11Y-1, API-1

## Commit cadence
- Small, descriptive commits; commit after milestones

## Branch strategy (dev → main)
- Work on `dev`; open PR to `main` for promotion; Vercel auto-deploys `main`

## Risks, Assumptions, Constraints
- Requires `MISTRAL_API_KEY` as a Windows system env var
- `next.config.mjs` suppresses TS/ESLint errors; may hide issues
- Streaming can be brittle; modal handles errors
- Unoptimized images may affect LCP; consider Next/Image or placeholders

## Open Questions
- Any additional projects/sections planned (blog, contact form, resume export)?
Contact form and resume export sounds good.

## Changelog
- 2025-10-26: Initial plan.
- 2025-10-26: Lint/config hardening; branch strategy; CI PR‑only; local Quality Gates PASS.
- 2025-10-26: Added sticky header with jump nav + skip link (NAV-1), Hero AI recruiter CTA with preset prompts (HERO-CTA-1), and renamed case study titles to project names; updated section heading (CONTENT-1). All gates PASS locally.

## References & Links
- README: `README.md`
- Key files: `app/page.tsx`, `app/api/ai-assistant/route.ts`, `components/ai-assistant-modal.tsx`, `app/globals.css`

## Handoff for Agent
- Next Task: Prompt user before continuing.
- Blockers: AI requires a valid `MISTRAL_API_KEY` set as Windows system env var
- Last Quality Gates: Build/Lint/Unit/E2E all PASS (2025-10-26)
- How to run (local):
  - Install dependencies: `pnpm install`
  - Start dev server: `pnpm dev` then open http://localhost:3000
  - Lint: `pnpm lint`; Build: `pnpm build`
- Deploy: Vercel auto-deploys on push to `main`
