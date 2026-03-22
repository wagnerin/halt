import Link from "next/link";

import { canAccessRole, getCurrentUser, requireMinimumRole } from "@/lib/auth";
import { getAdminNewsList } from "@/features/news/domain";
import { AdminNewsListTable } from "@/features/news/ui";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  await requireMinimumRole("VIEWER");
  const [articles, user] = await Promise.all([getAdminNewsList(), getCurrentUser()]);
  const canEdit = user ? canAccessRole(user.role, "EDITOR") : false;

  return (
    <section className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
        <div>
          <h2 className="text-lg font-semibold">News management</h2>
          <p className="text-sm text-[var(--text-muted)]">
            Manage drafts, published articles, slug editing, tags, and related entities.
          </p>
        </div>
        {canEdit ? (
          <Link
            href="/admin/news/new"
            className="rounded border border-[var(--border)] px-3 py-2 text-sm hover:border-[var(--accent)]"
          >
            New article
          </Link>
        ) : null}
      </header>
      <AdminNewsListTable rows={articles} />
    </section>
  );
}
