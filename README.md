# KazJobs Frontend

Next.js frontend for [KazJobs](https://kazjobs-front.vercel.app) — a job board platform built for Kazakhstan.

[![Live](https://img.shields.io/badge/Live-Vercel-black)](https://kazjobs-front.vercel.app)
[![Backend](https://img.shields.io/badge/API-Railway-purple)](https://kazjobs-back-production.up.railway.app)

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Redux Toolkit | Client state management |
| Axios | HTTP client with interceptors |
| Tailwind CSS v3 | Styling |
| shadcn/ui (Base UI) | UI component library |
| React Hook Form + Zod | Forms and validation |
| Vercel | Deployment |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Tashayev/kazjobs-front.git
cd kazjobs-front
npm install
```

### 2. Environment variables

Create `.env.local` in the root:

```env
# Local development
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1

# Production (already set on Vercel)
# NEXT_PUBLIC_API_URL=https://kazjobs-back-production.up.railway.app/api/v1
```

### 3. Run

```bash
npm run dev
```

App runs on `http://localhost:3000`

> Make sure the backend is running on port 4000 before starting the frontend locally.

---

## Running Full Stack Locally

```bash
# Terminal 1 — Backend
cd kazjobs-back
npm run dev
# → http://localhost:4000

# Terminal 2 — Frontend
cd kazjobs-front
npm run dev
# → http://localhost:3000
```

---

## Project Structure

```
front/
├── app/                          — Next.js App Router pages (thin, no logic)
│   ├── page.tsx                  — Home page
│   ├── auth/page.tsx             — Login / Register (tabs)
│   ├── jobs/page.tsx             — Job listings with filters
│   ├── jobs/[id]/page.tsx        — Single job detail
│   ├── dashboard/page.tsx        — Role-aware dashboard
│   ├── profile/
│   │   ├── layout.tsx            — Profile sidebar layout
│   │   └── [section]/page.tsx    — Dynamic profile sections
│   └── not-found.tsx             — Global 404 page
│
├── features/
│   ├── users/                    — Auth slice, thunks, useUser hook
│   │   ├── slice.ts
│   │   ├── thunk/
│   │   └── useUser.ts
│   └── jobs/                     — Jobs slice, thunks, useJobs hook
│       ├── slice.ts
│       ├── thunk/
│       └── useJobs.ts
│
├── components/
│   ├── ui/                       — shadcn components
│   ├── layout/                   — Navbar, Footer
│   └── shared/                   — RouteGuard, StatusBadge, LoadingSpinner
│
├── store/index.ts                — RTK store
├── lib/
│   ├── baseApi.ts                — Axios instance + interceptors
│   ├── localStore.ts             — SSR-safe localStorage wrapper
│   └── utils.ts                  — cn() and helpers
├── constants/index.ts            — KZ cities, job types, categories
└── types/index.ts                — Global TypeScript interfaces
```

---

## Features

**Authentication**
- Register with role selection (Employer / Job Seeker)
- Login with JWT — access token (1h) + refresh token (7d)
- Silent token refresh on 401 via Axios interceptors
- Auto logout on refresh failure

**Jobs**
- Browse all listings with filters — type, category, location
- Search by keyword or skill
- Job detail page with full info
- Apply button for seekers (hidden for employers)

**Employer**
- Post new jobs with full form (title, description, salary, skills, deadline, category)
- Edit and delete own jobs
- View applicants per job
- Update application status (pending / accepted / rejected)

**Seeker**
- Track all applications with real-time status
- One-click apply with optional CV link

**Profile**
- Role-aware sidebar — employers see all sections, seekers see personal + settings
- Edit username
- Change password
- Account deletion (UI ready, backend endpoint commented out)

---

## Architecture Decisions

**Feature-based structure** — each domain (users, jobs) owns its slice, thunks, hooks, and components. Touching one feature means working in one folder.

**Redux Toolkit for everything** — client state (auth, UI) and server data (jobs, applications). Chosen over TanStack Query for consistency and recognition in the KZ market.

**Axios interceptors** — one place handles token attachment and silent refresh. No manual token handling in components.

**localStorage for tokens** — pragmatic choice for portfolio stage. Designed to swap to httpOnly cookies with one file change (`lib/localStore.ts` + `middleware.ts`).

**Thin pages, smart features** — `app/` pages contain no business logic. All logic lives in `features/` hooks.

---

## Pages

| Route | Description | Auth |
|-------|-------------|------|
| `/` | Landing page with latest jobs | Public |
| `/auth` | Login / Register tabs | Public (redirects if logged in) |
| `/jobs` | All jobs with filters | Public |
| `/jobs/[id]` | Single job detail + apply | Public |
| `/dashboard` | Role-aware dashboard | Protected |
| `/profile/personal` | Edit profile info | Protected |
| `/profile/create-job` | Post new job | Employer |
| `/profile/my-jobs` | Manage posted jobs | Employer |
| `/profile/settings` | Change password, delete account | Protected |

---

## Deployment (Vercel)

1. Push repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import `kazjobs-front`
3. Set Root Directory to `.` (or leave default)
4. Add environment variable:
```
NEXT_PUBLIC_API_URL=https://kazjobs-back-production.up.railway.app/api/v1
```
5. Deploy

Vercel auto-detects Next.js and configures everything.