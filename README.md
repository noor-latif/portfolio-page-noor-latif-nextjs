# Noor Latif — Portfolio (Local Only)

Next.js 16 + Tailwind CSS 4 portfolio with an AI “Deep Dive” assistant powered by Gemini. This repo is configured for local development and local-only deployment.

## Prerequisites

- Node.js 20 LTS or newer (recommended 20.11+)
- pnpm 9+
- Windows PowerShell (commands below are PowerShell-friendly)

## Setup

1) Install dependencies

```powershell
pnpm install
```

2) Set the Windows system environment variable for the AI key (no .env file)

- Permanent (Windows): System Properties > Environment Variables > User variables > New…
	- Name: GEMINI_API_KEY
	- Value: your-api-key
- Temporary for current PowerShell session only:

```powershell
$env:GEMINI_API_KEY = "your-api-key"
```

3) Run the dev server

```powershell
pnpm dev
# open http://localhost:3000
```

## Scripts

```powershell
# Development
pnpm dev

# Lint
pnpm lint

# Build & Start
pnpm build
pnpm start

# Unit tests (Vitest)
pnpm test     # run once
pnpm test:unit  # watch mode

# E2E tests (Playwright)
pnpm playwright:install   # one-time browser install
pnpm test:e2e
pnpm test:e2e:ui          # optional UI mode
```

## Notes

- The AI route (`/api/ai-assistant`) reads `process.env.GEMINI_API_KEY`. Ensure it’s set in Windows environment variables.
- Path aliases (`@/*`) are configured in `tsconfig.json` and recognized by tests via `vitest.config.ts`.
- Local-only: All cloud/live deploy links are intentionally removed.

## Contributing

- Use Git and pnpm with descriptive commits.
- Keep changes small and focused. Update `plan.md` and tests alongside code.

## License

Private; no external redistribution.