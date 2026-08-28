# Rizq AI Interview

**Practice real interviews with an AI that generates the questions, listens to your spoken answers, and grades you like an interviewer would.**

🔗 **Live demo:** https://youtu.be/a6E0kU97PMs
---

## Screenshots

<p align="center">
  <img src="https://github.com/Saquib016/AI-Powered-Mock-Interview-Platform/blob/main/Project%20video%20and%20Images/Screenshot%202026-08-29%20023008.png?raw=true" alt="Landing page" width="800"/>
</p>

<p align="center">
  <img src="https://github.com/Saquib016/AI-Powered-Mock-Interview-Platform/blob/main/Project%20video%20and%20Images/Screenshot%202026-08-29%20023027.png?raw=true" alt="Landing page" width="800"/>
</p>

<p align="center">
  <img src="https://github.com/Saquib016/AI-Powered-Mock-Interview-Platform/blob/main/Project%20video%20and%20Images/Screenshot%202026-08-29%20023035.png?raw=true" width="800"/>
</p>

<p align="center">
  <img src="https://github.com/Saquib016/AI-Powered-Mock-Interview-Platform/blob/main/Project%20video%20and%20Images/Screenshot%202026-08-29%20023049.png?raw=true" width="800"/>
</p>

<p align="center">
  <img src="https://github.com/Saquib016/AI-Powered-Mock-Interview-Platform/blob/main/Project%20video%20and%20Images/Screenshot%202026-08-29%20023115.png?raw=true" width="800"/>
</p>

<p align="center">
  <img src="https://github.com/Saquib016/AI-Powered-Mock-Interview-Platform/blob/main/Project%20video%20and%20Images/Screenshot%202026-08-29%20023126.png?raw=true" width="800"/>
</p>

<p align="center">
  <img src="https://github.com/Saquib016/AI-Powered-Mock-Interview-Platform/blob/main/Project%20video%20and%20Images/Screenshot%202026-08-29%20023140.png?raw=true" width="800"/>
</p>

<p align="center">
  <img src="https://github.com/Saquib016/AI-Powered-Mock-Interview-Platform/blob/main/Project%20video%20and%20Images/Screenshot%202026-08-29%20023153.png?raw=true" width="800"/>
</p>
---

## What it does

Rizq AI Interview takes a job role, job description, and your years of experience, and generates a tailored mock interview using Google's Gemini AI. You answer each question out loud (speech-to-text, no typing), and Gemini grades every answer with a rating and specific written feedback — the same way a real interviewer would evaluate you, minus the scheduling and the awkwardness of practicing in front of another person.

## Features

- **AI-generated, role-specific questions** — not a static question bank; every set of questions is generated fresh from the job description you provide.
- **Speech-to-text answers** — record your spoken response directly in the browser; nothing is typed.
- **Per-question countdown timer** — auto-advances when time runs out, so practice sessions feel time-pressured like a real interview.
- **AI-graded feedback** — a rating out of 10 and specific written feedback per question, plus an overall score.
- **Downloadable PDF report** — export your full feedback report (question, your answer, model answer, feedback) as a PDF to review later or share.
- **Interview history** — every past interview is saved and browsable from the dashboard.
- **Question bank / PYQ (Previously Asked Questions)** — practice from a curated bank outside the AI-generated flow.
- **Gamified learning track** — a Duolingo-style course/lesson mode for structured practice.
- **Authentication** — full sign-up/sign-in via Clerk, protected dashboard routes.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Auth | Clerk |
| Database | Neon (serverless Postgres) |
| ORM | Drizzle ORM |
| AI | Google Gemini API (`@google/generative-ai`) |
| PDF export | jsPDF |
| Speech-to-text | `react-hook-speech-to-text` (browser Web Speech API — Chrome/Edge only) |

## Project structure

```
app/
├── page.js                        # Landing page
├── layout.js                      # Root layout, fonts, ClerkProvider
├── dashboard/
│   ├── page.jsx                   # Dashboard home
│   ├── _components/                # Header, AddNewInterview, InterviewList, etc.
│   ├── interview/[interviewId]/
│   │   ├── page.jsx                # Interview instructions/webcam permission
│   │   ├── start/                  # Live interview: questions, timer, recording
│   │   └── feedback/                # Graded feedback + PDF export
│   ├── question/                   # Standalone question bank
│   ├── pyq/[pyqId]/                # Previously-asked-questions practice
│   ├── (mainGame)/courses|learn/    # Gamified course track
│   └── (DuoGame)/game/              # Duolingo-style practice game
├── api/interviews/route.js         # Interview creation API route
utils/
├── db.js                           # Drizzle + Neon client
├── schema.js                       # Database schema (all tables)
└── GeminiAIModal.js                 # Gemini chat session config
middleware.js                       # Clerk route protection
drizzle.config.js                   # Drizzle CLI config (loads .env.local explicitly)
```

## Getting started

### 1. Prerequisites

- **Node.js 22.x** (current LTS as of 2026). Avoid Node 20.x — it reached end-of-life in April 2026.
- A Chrome or Edge browser for testing (speech-to-text requires the Web Speech API, which Firefox/Safari don't fully support).

### 2. Install

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.local` (already included as a template) and fill in real values:

```dotenv
# Clerk — https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database — https://neon.tech
DRIZZLE_DB_URL=postgresql://user:password@your-neon-host/dbname?sslmode=require

# AI — https://aistudio.google.com/app/apikey
GEMINI_API_KEY=...

# Optional — safe to leave blank, unused/dead code paths in this build
NEXT_PUBLIC_OPENAI_API_KEY=
NEXT_PUBLIC_LLAMA_API_KEY=

# Optional — cosmetic UI copy only, safe to leave blank
NEXT_PUBLIC_INFORMATION=
NEXT_PUBLIC_QUESTION_NOTE=
```

No quotes around values. Get each key from the exact dashboards linked above — do not reuse keys/strings from anywhere else, they're project-specific.

### 4. Push the database schema

```bash
npm run db:push
```

This creates every table (`mockInterview`, `question`, `userAnswer`, courses, etc.) in your Neon database, defined in `utils/schema.js`.

> **Note:** `drizzle.config.js` explicitly loads `.env.local` via `dotenv` before reading `DRIZZLE_DB_URL`. This is required because `drizzle-kit`'s CLI does not auto-load `.env.local` the way Next.js's dev server does — without this, `db:push` silently fails to connect and no tables get created.

### 5. Run it

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in Chrome.

## Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push the Drizzle schema to your database |
| `npm run db:studio` | Open Drizzle Studio (visual DB browser) |
| `npm run db:seed` | Run the seed script |

## Troubleshooting

**"Failed to create interview" / 500 error on `/api/interviews`**
Check your terminal (not the browser) for the real error logged as `[POST /api/interviews] ...`. Common causes, in order of likelihood:
- `relation "mockInterview" does not exist` → you haven't successfully run `npm run db:push`, or it ran without `DRIZZLE_DB_URL` set.
- `password authentication failed` → your `DRIZZLE_DB_URL` password doesn't match what Neon currently has. Copy a fresh connection string from the Neon dashboard rather than retyping it.
- A hang of 15–25 seconds before failing → likely a network/firewall issue blocking outbound requests to Google's Gemini API or a slow Neon cold-start, not a code bug.

**Clerk error: `auth() and currentUser() are only supported in App Router`**
Make sure `middleware.js` uses the current `clerkMiddleware` syntax: `await auth.protect()`, not the older `auth().protect()`. Clerk changed this partway through their v5 releases.

**Runtime error mentioning `async_id_symbol` / "cannot be converted to a ByteString"**
This is a known Node.js bug (nodejs/node#53069) specific to Node 22.2.0–22.3.x combined with Next.js 14.x. Use Node 22.4+ or another stable LTS version.

**Speech-to-text doesn't record anything**
Use Chrome or Edge. The Web Speech API this app relies on is not fully supported in Firefox or Safari.

## Security notes

- Never commit real values in `.env.local` — it's already gitignored.
- Never hardcode a database connection string directly in `drizzle.config.js` or any source file. Always read it from `process.env`.
- If a database credential is ever accidentally committed or shared, rotate it immediately from your Neon dashboard — treat it as compromised the moment it's visible anywhere outside your local `.env.local`.

## License

No license file is included in this project. All rights are reserved by default; do not redistribute without permission.

## Support

If this helped you, consider starring the repo.
