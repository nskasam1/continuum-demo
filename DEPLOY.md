# Deploying Continuum to Vercel (2 minutes, no build step needed)

This is a single static `index.html` — no framework, no dependencies to install.

## Option A — Vercel CLI (fastest)
1. Install the CLI once: `npm i -g vercel`
2. From inside this folder, run: `vercel --prod`
3. Follow the prompts (log in / create account if needed, accept defaults). Vercel will detect it as a static site automatically.
4. You'll get a live `https://your-project-name.vercel.app` link — that's what goes in your appendix / email.

## Option B — Vercel dashboard (no CLI)
1. Push this folder to a new GitHub repo (or just this one file).
2. Go to vercel.com → "Add New… → Project" → import that repo.
3. Leave all build settings blank/default (Vercel auto-detects static HTML).
4. Click Deploy. You'll get the live link in under a minute.

## Option C — Netlify Drop (even faster, if you don't want GitHub)
Go to https://app.netlify.com/drop and drag this folder in. Instant live link, no account required for a quick test (you'll want an account to keep it live long-term).

Either way — grab the live URL and reference it in Appendix A of the case study, and optionally as a signature line under your name in the submission email.
