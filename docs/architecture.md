# Sim Racing Media Platform - MVP Architecture

## 1. Architecture

### 1.1 Architectural style

- **App type:** Next.js App Router monolith (modular monolith).
- **Data:** PostgreSQL + Prisma ORM.
- **Validation:** Zod at API boundaries.
- **Rendering:** Server Components by default, client components only for interactions.
- **API:** Route Handlers for mutations and internal APIs.
- **Deployment target:** Vercel-ready.

### 1.2 Layering rules

Each feature follows the same layering:

1. `domain/` - business rules and orchestration.
2. `data/` - Prisma queries and persistence concerns.
3. `api/` - HTTP handlers + Zod schemas + DTO mapping.
4. `ui/` - server/client components.

Rules:

- UI never accesses Prisma directly.
- Route Handlers call domain services, not raw data layer from components.
- Domain layer can depend on data layer interfaces/repositories.
- Shared cross-feature code lives in `src/lib`.

### 1.3 Core bounded contexts

- **Editorial:** news articles, tags, related entities, featured content.
- **Competition:** tournaments, race sessions, standings/results.
- **Entities:** drivers, teams, rosters, career metadata.
- **Engagement:** follows, top-10 weekly rankings, driver of the week.
- **Admin:** protected CRUD workflows and curation tools.

### 1.4 Runtime flow example (article page)

1. `app/(public)/news/[slug]/page.tsx` (Server Component) calls `features/news/domain/getArticleBySlug`.
2. Domain service asks `features/news/data/news.repository`.
3. Repository uses Prisma, fetches article + tags + related drivers/teams/tournaments.
4. Service builds view model and returns to Server Component.
5. Page renders SEO metadata + article + related content blocks.

---

## 2. Folder structure

```txt
src/
  app/
    (public)/
      page.tsx
      news/
        page.tsx
        [slug]/page.tsx
      drivers/
        page.tsx
        [slug]/page.tsx
      teams/
        page.tsx
        [slug]/page.tsx
      tournaments/
        page.tsx
        [slug]/page.tsx
      results/
        page.tsx
        [tournamentSlug]/[resultId]/page.tsx
    (admin)/
      admin/
        layout.tsx
        page.tsx
        news/
          page.tsx
          new/page.tsx
          [id]/edit/page.tsx
        drivers/
          page.tsx
          new/page.tsx
          [id]/edit/page.tsx
        teams/
          page.tsx
          new/page.tsx
          [id]/edit/page.tsx
        tournaments/
          page.tsx
          new/page.tsx
          [id]/edit/page.tsx
        results/
          page.tsx
          new/page.tsx
          [id]/edit/page.tsx
        featured/
          page.tsx
    api/
      admin/
        news/route.ts
        news/[id]/route.ts
        drivers/route.ts
        drivers/[id]/route.ts
        teams/route.ts
        teams/[id]/route.ts
        tournaments/route.ts
        tournaments/[id]/route.ts
        results/route.ts
        results/[id]/route.ts
        featured/route.ts
      follows/route.ts
  features/
    news/
      ui/
      domain/
      data/
      api/
    drivers/
      ui/
      domain/
      data/
      api/
    teams/
      ui/
      domain/
      data/
      api/
    tournaments/
      ui/
      domain/
      data/
      api/
    results/
      ui/
      domain/
      data/
      api/
    engagement/
      ui/
      domain/
      data/
      api/
    admin/
      ui/
      domain/
      data/
      api/
  components/
    layout/
    cards/
    tables/
    forms/
    feedback/
  lib/
    db/
    auth/
    validation/
    seo/
    utils/
  styles/
    globals.css
prisma/
  schema.prisma
  seed.ts
docs/
  architecture.md
```

---

## 3. Prisma schema

Implemented in `prisma/schema.prisma` with:

- Core entities: `NewsArticle`, `Driver`, `Team`, `Tournament`, `RaceResult`, `Follow`
- Editorial support: `Tag`, article-entity relations, featured articles
- Driver ecosystem: achievements + career timeline
- Competition support: standings table (`RaceStanding`)
- Engagement: weekly top 10 + driver of week
- Admin/security baseline: `User` + role enum

Highlights:

- Slug uniqueness for SEO-friendly routes.
- Enum-driven statuses for consistent UI filters.
- Many-to-many relations for article related content and tournament participants.
- Follow uniqueness constraints per `(user, driver)` and `(user, team)`.
- Explicit ranking entities for weekly top 10 curation.

---

## 4. Seed data

Implemented in `prisma/seed.ts`:

- Creates users for all roles (`admin`, `editor`, `viewer`)
- Creates tags, teams, drivers (with platforms/achievements/timeline)
- Creates tournaments with participants
- Creates published + draft articles with related entities
- Creates race result sessions with standings
- Creates follows, weekly top-10 ranking, and driver of the week
- Creates featured article/tournament records

Seed script is **idempotent** by using `upsert` and cleanup where needed.

---

## 5. Modules breakdown (frontend + backend)

### 5.1 News module

- Frontend:
  - News list page, article detail page, tag filters, related content blocks.
- Backend:
  - `listNews`, `getArticleBySlug`, `createArticle`, `updateArticle`, `publishArticle`.
  - Validation: `articleCreateSchema`, `articleUpdateSchema`.

### 5.2 Drivers module

- Frontend:
  - Driver list/profile, team link, achievements/timeline panels.
- Backend:
  - `listDrivers`, `getDriverBySlug`, CRUD for admin, ranking support fields.

### 5.3 Teams module

- Frontend:
  - Team list/profile, roster component.
- Backend:
  - CRUD, roster fetch/update, relation-safe deletion checks.

### 5.4 Tournaments module

- Frontend:
  - Tournament list/detail, status chips, participants/results widgets.
- Backend:
  - CRUD, participant assignment, status transitions.

### 5.5 Race results module

- Frontend:
  - Session page with standings table + summary stats.
- Backend:
  - CRUD race sessions, standings editing with order validation.

### 5.6 Engagement module

- Frontend:
  - Follow buttons, top 10 section, driver of week card.
- Backend:
  - Follow/unfollow endpoints, weekly ranking management, driver-of-week assignment.

### 5.7 Shared modules

- `lib/db`: Prisma client singleton.
- `lib/auth`: role guards for admin routes.
- `lib/validation`: reusable Zod fragments.
- `components/forms`: reusable controlled form pieces (inputs/selects/relation pickers).

---

## 6. Admin architecture

### 6.1 Route map

- `/admin` - dashboard (stats + recent activity)
- `/admin/news` - list/news table
- `/admin/news/new` - create article
- `/admin/news/[id]/edit` - edit article
- `/admin/drivers` + `/new` + `/[id]/edit`
- `/admin/teams` + `/new` + `/[id]/edit`
- `/admin/tournaments` + `/new` + `/[id]/edit`
- `/admin/results` + `/new` + `/[id]/edit`
- `/admin/featured` - homepage featured news, top10, driver of week, featured tournaments

### 6.2 Access control

- `admin`: full CRUD + curation + publication.
- `editor`: CRUD on editorial and results, no destructive user/role operations.
- `viewer`: read-only admin access (dashboard + listings).

### 6.3 Admin implementation pattern

- Each admin page uses a feature-specific form component and server action/route handler.
- Zod validation runs server-side for all create/update operations.
- Domain services enforce business rules:
  - `publishedAt` required when publishing.
  - Top 10 must contain exactly 10 unique drivers.
  - Driver of week must belong to active roster/tournament context if desired (rule toggle).

---

## 7. Implementation roadmap

1. **Foundation setup**
   - Initialize Next.js app with TypeScript + Tailwind.
   - Configure Prisma/PostgreSQL, run migrations, seed data.
   - Add dark theme tokens and base layout shell.

2. **Public MVP pages**
   - Build News list + article detail (SEO metadata + loading/error states).
   - Build Drivers/Teams/Tournaments list + detail pages.
   - Build Results pages and standings rendering.

3. **Admin MVP**
   - Add `/admin` protected layout with role guard.
   - Implement CRUD flows for News, Drivers, Teams, Tournaments, Results.
   - Implement Featured content editor.

4. **Engagement MVP**
   - Follow/unfollow endpoints + UI hooks.
   - Weekly Top 10 + Driver of Week publishing flow.
   - Related content logic tuning for article pages.

5. **Quality + production hardening**
   - Add integration tests for route handlers and repositories.
   - Add optimistic caching/revalidation strategy.
   - Improve SEO details (JSON-LD, canonical tags, sitemap, OpenGraph).

---

## 8. Risks

1. **Schema growth risk**
   - Editorial relations can become complex quickly.
   - Mitigation: keep relation tables explicit where reporting/admin needs increase.

2. **Content consistency risk**
   - Draft/publish workflows may create stale featured references.
   - Mitigation: transactional updates in domain service for publish + feature updates.

3. **Admin usability risk**
   - Complex relation editing (news to multiple entities) can be error-prone.
   - Mitigation: reusable relation-picker components and strong server validation.

4. **Performance risk on dense pages**
   - HLTV-style pages are data-heavy.
   - Mitigation: server-side pagination, selective includes, and cache/revalidate policy.

5. **Role leakage risk**
   - Misconfigured route guards can expose admin mutations.
   - Mitigation: centralized guard helpers and handler-level role checks.
