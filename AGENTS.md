# Agent Instructions

Instructions for AI coding agents (GitHub Copilot, Claude, etc.) working in this repository. This file is the entry point — read the linked doc for the area you're touching before making changes there.

## Project Summary

A URL shortener built with:

- **Next.js 16** (App Router) + **React 19** + **TypeScript** (strict mode)
- **Clerk** (`@clerk/nextjs`, `@clerk/ui`) for authentication
- **Drizzle ORM** over **Neon** serverless Postgres for the database
- **Tailwind CSS v4** + **shadcn/ui** + `@base-ui/react` for UI

## Coding Standards

For detailed guidelines on specific topics, refer to the modular documentation in the '/docs' directory:

- [docs/authentication.md](docs/authentication.md) — Clerk-only auth, protected routes, home redirect, modal sign-in/up
- [docs/ui-components.md](docs/ui-components.md) — shadcn/ui only, no hand-written custom components

## Critical Rules (always apply)

- **IMPORTANT: You MUST read the relevant individual instructions file(s) in `/docs` BEFORE generating any code.** If a task touches authentication or UI components, open and read the matching doc above first — do not rely on memory or skip this step.
- Never commit `.env` or any secret values; reference `process.env.VAR_NAME` by name only.
- Use the `@/*` path alias for internal imports (e.g. `@/lib/utils`, `@/db`) instead of relative `../../` paths.
- Default to Server Components; only add `"use client"` when the file needs hooks, event handlers, or browser APIs.
- Never query the database from Client Components — go through Server Components, Route Handlers, or Server Actions.
- Add UI primitives via `npx shadcn add <component>` instead of hand-writing `components/ui/*` from scratch.
- Run `npm run lint` after changes and fix any new errors before considering a task complete.
- Don't add new dependencies without first checking `package.json` for an existing equivalent (e.g. `cn`, `class-variance-authority`, `lucide-react` are already available).
- No test framework is configured yet. If a task requires tests, ask before installing one (Vitest is the natural fit for this stack).

