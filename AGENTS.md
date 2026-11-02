<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — togetherwe-client

## Commands

- Dev/build/start: `npm run dev`, `npm run build`, `npm run start`. Lint: `npm run lint` (bare `eslint`, Next flat config).
- No test script and no test setup exists — don't invent test commands. Verify changes with `npm run lint` and `npx tsc --noEmit` (no typecheck script).
- Turbopack is the only dev/bundler path (Tailwind loads via `@tailwindcss/turbopack` rules in `next.config.ts`; there is no `tailwind.config` file — theme tokens/CSS variables live in `app/globals.css`).

## Architecture

- Next.js 16 App Router, React 19.3, `cacheComponents: true` in `next.config.ts`. This frontend is full-stack for **auth only**; event/gallery data comes from a sibling repo.
- Two separate data sources:
  - **External API**: `../togetherwe-server` (Express 5, run with `npm start` there, default `http://localhost:5000`). All reads go through `lib/api.ts` (`/all-events`, `/events/:id`, `/gallery`, `/recent-events`) with `cache: "no-store"`. Override with `SERVER_BASE_URL`. Run the server locally or these pages fail.
  - **Local MongoDB**: `lib/db.ts` + better-auth (`lib/auth.ts`, route `app/api/auth/[...all]`); email+password, optional Google OAuth, JWT plugin. Client counterpart: `lib/auth-client.ts`.
- Shared JSON shapes for the external API live in `types/event.ts` and `types/gallery.ts` — update them when backend responses change.
- `lib/navigation.ts` (`userLinks`) targets `/create-event`, `/manage-events`, `/joined-events`, which are not implemented under `app/` yet — work in progress, don't assume those pages exist.
- Component layout: homepage sections in `components/landing/*` (hero, stats, features, recent-events[+grid], gallery, newsletter, user-menu); reusable chrome in `components/shared/*` (navbar, footer, logo, theme-toggle, section-heading); auth forms in `components/auth/*`.

## Environment

- Flat `.env` at repo root (no `NEXT_PUBLIC_` prefixes needed since fetching happens in server components). Required for boot: `MONGODB_CLIENT` (`lib/db.ts` throws without it); also `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`.
- Env-name gotcha: `lib/db.ts` reads `MONGODB_NAME` for the DB name (falls back to `"togetherWe"`), but `.env` defines `MONGODB_DB_NAME` — those don't match. Use the name the code actually reads.
- Google OAuth is silently disabled unless both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set.

## Design system

- Visual reference for all UI: `design-reference/TogetherWe Homepage Design.html` (blue/purple/gradient identity, Manrope headings + Inter body).
- Brand tokens already live in `app/globals.css` (`:root` + `.dark`): `--brand-from/via/to`, `--highlight`, `--footer`, plus ready-made `@utility bg-brand-gradient` / `text-brand-gradient` — don't re-declare colors or gradients inline.
- Fonts are wired through `next/font` CSS variables (`--font-inter`, `--font-manrope`) set in `app/layout.tsx` and mapped in the `@theme` block of `globals.css` (`font-heading` applies to `h1`–`h4`). Don't hardcode font-family CSS.

## UI conventions

- shadcn/ui with `"style": "base-nova"` (`components.json`) — primitives are built on **`@base-ui/react` (Base UI), not Radix**; don't port Radix patterns when editing `components/ui/` or adding components via shadcn CLI.
- Icons: `lucide-react` (+ `react-icons` in existing files). Path aliases are standard `@/*` → repo root.
