## Summary

- What changed and why
- Link to related issues (if any)

## Checklist

- [ ] Lint passes locally: `pnpm lint`
- [ ] Unit tests pass: `pnpm test`
- [ ] E2E smoke passes locally: `pnpm test:e2e` (optional when not touching UI)
- [ ] Build succeeds: `pnpm build`
- [ ] plan.md updated (Quality Gates, Changelog) if relevant
- [ ] Descriptive commits

## Notes

- Branch strategy: work on `dev`, promote via PR to `main`. Vercel auto-deploys `main`.
