# CLAUDE.md

## Project overview

- **What:** "a portfolio website for an artist, its a stack of cards you can swipe through displaying the artists work"

## Architecture


- **Module boundaries:** `<frontend/>` frontend code `<sanity/>` sanity backend `<core/>`

## Do NOT

- Don't edit files in `<generated/>`, `<dist/>`, or `<prisma/migrations/>`.
- Don't add new dependencies without asking first.
- Don't use `<npm>` or `<yarn>` — this project uses `<pnpm>`.
- Don't silently swallow errors (no empty `catch` blocks).
- Don't add code comments unless they explain a non-obvious decision.

## Workflow expectations

- For non-trivial changes, outline a plan before editing.
- Prefer small, focused diffs over sweeping refactors.
- If a request is ambiguous, ask one or more clarifying questions instead of guessing.
- Match surrounding code style; flag it if you think a new pattern is warranted.
- When unsure whether something belongs in this repo, ask.
