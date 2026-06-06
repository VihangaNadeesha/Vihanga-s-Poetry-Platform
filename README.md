<<<<<<< HEAD
# රෝස අකුරු | Rosa Akuru

Production-ready Sinhala-first poetry platform built with Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion, NextAuth, and Supabase.

## Features

- Public home, poems, poem detail, about, and search pages
- Mood filtering, SEO metadata, social sharing, reactions, and comments
- Secure admin login with NextAuth credentials and bcrypt password hash
- Admin poem CRUD, cover image uploads, comment moderation, and analytics
- PostgreSQL migrations and Supabase Storage bucket setup
- Docker and Vercel deployment support

## Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

## Supabase Setup

1. Create a Supabase project.
2. Run the SQL files in `supabase/migrations` in order.
3. Copy project URL, anon key, and service role key into `.env`.
4. Generate an admin password hash:

```bash
node -e "require('bcryptjs').hash('change-this-password', 12).then(console.log)"
```

5. Set `ADMIN_EMAIL` to `admin@rosaakuru.lk` or update the seeded user email in Supabase.
6. Set `ADMIN_PASSWORD_HASH` to the generated hash.

## Environment Variables

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=replace-with-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=replace-with-supabase-service-role-key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-32-plus-character-secret
ADMIN_EMAIL=admin@rosaakuru.lk
ADMIN_PASSWORD_HASH=$2a$12$replace-with-bcrypt-hash
```

## Routes

- `/`
- `/poems`
- `/poems/[slug]`
- `/about`
- `/search`
- `/login`
- `/dashboard`
- `/dashboard/poems`
- `/dashboard/comments`
- `/dashboard/analytics`

## API Routes

- `GET /api/poems`
- `POST /api/poems`
- `PUT /api/poems/[id]`
- `DELETE /api/poems/[id]`
- `POST /api/comments`
- `DELETE /api/comments/[id]`
- `POST /api/reactions`
- `POST /api/upload`
- `/api/auth/[...nextauth]`

## Deployment

### Vercel

1. Import the repository into Vercel.
2. Add all environment variables from `.env.example`.
3. Deploy with the included `vercel.json`.

### Docker

```bash
docker compose up --build
```

The app runs on `http://localhost:3000`.
=======
# Vihanga-s-Poetry-Platform
A full-stack poetry publishing platform engineered with Next.js, React, and modern frontend libraries, featuring component-based architecture, responsive UI design, optimized routing, server-side rendering (SSR), and scalable content presentation for an enhanced user experience.
>>>>>>> c3bb3abacc428f8e828f18f19d0b68f9c4556ca2
