# Noor Latif — Portfolio

Next.js 16 + Tailwind CSS 4 portfolio with an AI "Deep Dive" assistant powered by Mistral.

## Prerequisites

- Node.js 20 LTS or newer (recommended 20.11+)
- Bun (latest version)

## Setup

1) Install dependencies

```bash
bun install
```

2) Set up environment variables

Create a `.env.local` file in the project root:

```bash
MISTRAL_API_KEY=your-api-key
```

Alternatively, you can set it as an environment variable in your shell:

```bash
export MISTRAL_API_KEY="your-api-key"
```

3) Run the dev server

```bash
bun dev
# open http://localhost:3000
```

## Scripts

```bash
# Development
bun dev

# Lint
bun lint

# Build & Start
bun build
bun start

# Type checking
bun typecheck

# Unit tests (Vitest)
bun test          # run once
bun test:unit     # watch mode

# E2E tests (Playwright)
bun playwright:install   # one-time browser install
bun test:e2e
bun test:e2e:ui          # optional UI mode
```

## Notes

- The AI route (`/api/ai-assistant`) reads `process.env.MISTRAL_API_KEY`. Ensure it's set in your environment variables or `.env.local` file.
- Path aliases (`@/*`) are configured in `tsconfig.json` and recognized by tests via `vitest.config.ts`.
- Deployment: pushing to `main` auto-deploys via Vercel. Work on `dev`, promote via PR to `main` after CI passes.

## Contributing

- Use Git and Bun with descriptive commits.
- Keep changes small and focused. Update `plan.md` and tests alongside code.

## Branch strategy (dev → main)

- Do day-to-day work on `dev`. CI runs on pushes to `dev` and on PRs into `main`.
- Promote by opening a PR from `dev` → `main`. PR merge to main automatically deploys the website.

## License

Private; no external redistribution.