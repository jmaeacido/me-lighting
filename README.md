# ME Lighting

Marketing site for ME Lighting — Vite + React frontend with a small Express server for production static hosting.

## Prerequisites

- [Node.js](https://nodejs.org/) 20+ (22/24 recommended)
- [pnpm](https://pnpm.io/) 10+ (this repo pins `packageManager` in `package.json`)

```bash
npm install -g pnpm@10
```

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). If port 3000 is busy, Vite picks the next available port.

## Production-like local run

Build the client into `dist/public` and the server into `dist/index.js`, then serve with Express:

**macOS / Linux**

```bash
pnpm install
pnpm build
pnpm start
```

**Windows (PowerShell)**

```powershell
pnpm install
pnpm build
$env:NODE_ENV="production"
node dist/index.js
```

Then open [http://localhost:3000](http://localhost:3000). Override the port with `PORT` if needed:

```powershell
$env:PORT="8080"
$env:NODE_ENV="production"
node dist/index.js
```

## Deploy on Vercel

This app is a static Vite SPA on Vercel (not the Express server). Config lives in `vercel.json`:

- Build: `pnpm run build:web` → output `dist/public`
- SPA fallback rewrite for client routes

Add these [Environment Variables](https://vercel.com/docs/projects/environment-variables) (Production + Preview) so analytics placeholders resolve at build time:

```env
VITE_ANALYTICS_ENDPOINT=https://manus-analytics.com
VITE_ANALYTICS_WEBSITE_ID=5582f454-542b-42b4-84e8-aed9433405be
```

Live: [https://me-lighting.vercel.app/](https://me-lighting.vercel.app/)

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Vite dev server (`--host`) |
| `pnpm build` | Build client + bundle Express server |
| `pnpm build:web` | Vite client only (used by Vercel) |
| `pnpm start` | Run production server (`NODE_ENV=production`) |
| `pnpm preview` | Vite preview of the client build |
| `pnpm check` | TypeScript check (`tsc --noEmit`) |
| `pnpm format` | Format with Prettier |

## Optional environment variables

Create a `.env` in the project root if you need these features. None are required for a basic local run.

| Variable | Used for |
| --- | --- |
| `PORT` | Production server port (default `3000`) |
| `VITE_ANALYTICS_ENDPOINT` | Umami analytics script base URL (HTML `%…%` placeholders) |
| `VITE_ANALYTICS_WEBSITE_ID` | Umami website ID |
| `VITE_OAUTH_PORTAL_URL` | OAuth / login portal URL |
| `VITE_APP_ID` | OAuth app ID |
| `VITE_FRONTEND_FORGE_API_URL` | Frontend Forge / Maps API base URL |
| `VITE_FRONTEND_FORGE_API_KEY` | Frontend Forge / Maps API key |
| `BUILT_IN_FORGE_API_URL` | Manus storage proxy base URL (Vite `/manus-storage`) |
| `BUILT_IN_FORGE_API_KEY` | Manus storage proxy bearer token |

Copy values from the live [Manus deploy](https://melighting-7xy3pymm.manus.space/) if you want local parity. Without the Forge storage variables, assets under `/manus-storage/...` may fail to load in local `pnpm dev`.

Example analytics values used by that deploy:

```env
VITE_ANALYTICS_ENDPOINT=https://manus-analytics.com
VITE_ANALYTICS_WEBSITE_ID=5582f454-542b-42b4-84e8-aed9433405be
```

## Project layout

```
client/                      React app (Vite root)
client/public/manus-storage/ Site images fetched for local serving
server/                      Express production static server
shared/                      Shared constants
dist/                        Build output (client → dist/public, server → dist/index.js)
```
