## Sim Racing Media Platform (MVP foundation)

This repository contains the initial architecture baseline for a news-first sim racing media platform (HLTV-style), focused on:

- Feature-based architecture for Next.js App Router
- Prisma data model for editorial + competitive ecosystem
- Seed data for local development and demos
- Admin panel route and module design

### Added in this iteration

- `docs/architecture.md` - system architecture, folder structure, modules, admin design, roadmap, and risks
- `prisma/schema.prisma` - PostgreSQL Prisma schema covering MVP and engagement entities
- `prisma/seed.ts` - idempotent seed script with realistic sample data
- `package.json` - baseline scripts/dependencies for Next.js + Prisma + TypeScript + Tailwind
- `.env.example` - expected environment variables

### Quick start

1. Copy env template:
   - `cp .env.example .env`
2. Install dependencies:
   - `npm install`
3. Generate Prisma client:
   - `npm run db:generate`
4. Apply schema:
   - `npm run db:push`
5. Seed sample data:
   - `npm run db:seed`

For full architectural details, open `docs/architecture.md`.
