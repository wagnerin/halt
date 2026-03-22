# Source layout contract (implementation guide)

This file documents where new code should be placed as the UI and APIs are implemented.

## App Router surfaces

- `app/(public)` - public pages (news, drivers, teams, tournaments, results).
- `app/(admin)/admin` - protected admin pages and layout.
- `app/api` - route handlers (mutations and internal data APIs).

## Feature modules

- `features/news` - article listing/detail/editorial workflows.
- `features/drivers` - driver listing/profile and related metadata.
- `features/teams` - team listing/profile/roster concerns.
- `features/tournaments` - event metadata and participant flows.
- `features/results` - session and standings logic.
- `features/engagement` - follow, top 10, driver of week.
- `features/admin` - shared admin table/form patterns.

Each feature should include:

- `domain/` for use-cases and rules.
- `data/` for Prisma repositories.
- `api/` for Zod schemas and DTO translators.
- `ui/` for server/client presentation components.

## Shared libs

- `lib/db` - Prisma client singleton and query helpers.
- `lib/auth` - role checks and route guards.
- `lib/validation` - shared Zod schema fragments.
- `lib/seo` - metadata helpers and JSON-LD builders.
