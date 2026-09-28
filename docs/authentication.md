# Authentication

## Clerk Only

All authentication and session handling in this app goes through **Clerk** (`@clerk/nextjs`, `@clerk/ui`). Do not introduce NextAuth.js, custom JWT/cookie sessions, Passport, Supabase Auth, or any other auth mechanism alongside it.

- Identify users with the Clerk `userId` (from `auth()` / `currentUser()`). Don't build a parallel credentials table.
- `ClerkProvider` in [app/layout.tsx](../app/layout.tsx) must remain the single provider wrapping the app.

## Protected Routes

`/dashboard` (and any nested routes under it) requires a signed-in user. Enforce this in `proxy.ts` with `createRouteMatcher`, not with per-page `if (!userId)` checks:

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});
```

Any new page that should require sign-in must be added to `isProtectedRoute`, keeping route protection centralized in the middleware.

## Home Page Redirect

A signed-in user visiting `/` must be redirected to `/dashboard`. Do this in `proxy.ts` (it already has access to `auth()`), not with a client-side `useEffect`:

```ts
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (isProtectedRoute(req)) await auth.protect();

  if (userId && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});
```

## Sign In / Sign Up UI

Sign in and sign up must always open as a **modal** — never a full-page navigation. Use the `mode="modal"` prop on Clerk's trigger components:

```tsx
<SignInButton mode="modal" />
<SignUpButton mode="modal" />
```

Don't link to standalone `/sign-in` or `/sign-up` pages as the primary entry point in app UI (nav, CTAs, etc.); the modal is the only supported entry point.

## Env Vars

Reference existing env vars by name only — never hardcode keys or URLs:

- `CLERK_SECRET_KEY` — server-only, never expose to the client or a `NEXT_PUBLIC_*` var.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — safe for client use.
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `NEXT_PUBLIC_CLERK_SIGN_UP_URL` and their fallback redirect equivalents — already defined in `.env`.

## Further Reference

Detailed Clerk workflows (custom UI, orgs, webhooks, testing, CLI/backend API) are documented as skills under `.agents/skills/clerk-*`. Consult the matching skill before implementing that specific area.
