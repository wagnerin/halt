import Link from "next/link";

import { requireMinimumRole } from "@/lib/auth";
import { getAdminNewsFormOptions } from "@/features/news/domain";
import { AdminNewsForm } from "@/features/news/ui";

export const dynamic = "force-dynamic";

export default async function AdminNewsCreatePage() {
  await requireMinimumRole("EDITOR");
  const options = await getAdminNewsFormOptions();

  return (
    <section className="space-y-4">
      <header className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
        <h2 className="text-lg font-semibold">Create article</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Create draft or published content and assign relations.
        </p>
        <Link className="mt-2 inline-block text-xs text-[var(--accent)]" href="/admin/news">
          ← Back to news list
        </Link>
      </header>
      <AdminNewsForm mode="create" options={options} />
    </section>
  );
}
