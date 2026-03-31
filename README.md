# KazJobs — Frontend

> Full stack job board built for the Kazakhstan market. This is the frontend of the KazJobs platform, built with Next.js 14, TypeScript, and Redux Toolkit.

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Redux Toolkit + RTK Query | State management + API calls |
| Tailwind CSS v3 | Styling |
| shadcn/ui | UI components |
| Axios | HTTP client (interceptors, token refresh) |

## Features

- **Authentication** — Register and login with role selection (Employer / Job Seeker), JWT access + refresh token flow
- **Job Listings** — Browse all jobs with filters by location, type, salary, and category
- **Job Detail** — Full job view with one-click apply for seekers
- **Employer Dashboard** — Post, edit and delete jobs, view applicants per job, update application status
- **Seeker Dashboard** — Track all applications with real-time status (pending / accepted / rejected)
- **Profile** — Role-aware profile page, separate views for employer and seeker
- **Favorites** — Save jobs locally, persisted across sessions
- **Protected Routes** — Route-level auth guard via middleware, role-based access control
- **Token Refresh** — Automatic silent token refresh on 401, queue-safe retry logic

## Project Structure

```
front/
├── app/                        # Next.js App Router pages (thin, no logic)
├── features/                   # Feature-based modules
│   ├── auth/                   # Login, register, auth slice, useAuth hook
│   ├── jobs/                   # Job card, list, filters, form, queries
│   ├── applications/           # Apply modal, application card, queries
│   ├── dashboard/              # Employer and seeker dashboards
│   ├── profile/                # Role-aware profile + settings
│   └── categories/             # Category pages (in progress)
├── components/
│   ├── ui/                     # shadcn components
│   ├── layout/                 # Navbar, Footer
│   └── shared/                 # StatusBadge, LoadingSpinner, RouteGuard
├── store/                      # RTK store configuration
├── lib/                        # axios instance, localStore utility, utils
├── constants/                  # KZ cities, job types, categories
└── types/                      # Global TypeScript interfaces
```

## Architecture Decisions

**Feature-based structure** — Each domain (auth, jobs, applications) owns its components, RTK slice, queries, and hooks. Touching one feature means working in one folder.

**RTK Query for all API calls** — Chosen over TanStack Query for consistency with the existing Redux store. One devtools panel, one mental model.

**Axios interceptors** — Automatic Bearer token injection on every request. Silent refresh on 401 using refresh token. Logout and redirect on refresh failure.

**localStorage for session** — Pragmatic choice for portfolio stage. Designed to swap to httpOnly cookies with minimal changes (update `lib/localStore.ts` + `middleware.ts`).

**Next.js middleware for route protection** — Server-side optimistic check on cookie before page renders. No client-side flicker.

## Getting Started

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Add your backend URL:
# NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1

# Run development server
npm run dev
```

## Environment Variables

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

## Backend

This frontend connects to the KazJobs REST API built with Node.js, Express, and MongoDB.

API Docs: See `/api-docs` or the backend repo.

Endpoints used:
- `POST /users/register` — Register
- `POST /users/login` — Login
- `POST /users/refresh-token` — Token refresh
- `GET /jobs` — All jobs (public)
- `GET /jobs/:id` — Single job (public)
- `POST /jobs` — Create job (employer)
- `PATCH /jobs/:id` — Update job (employer)
- `DELETE /jobs/:id` — Delete job (employer)
- `POST /applications` — Apply to job (seeker)
- `GET /applications` — My applications (seeker)
- `PATCH /applications/:id` — Update status (employer)

## Author

Built as a fullstack portfolio project targeting the Kazakhstan job market# kazjobs-front
