import Link from "next/link";
import { notFound } from "next/navigation";

import { requireMinimumRole } from "@/lib/auth";
import {
  getAdminNewsArticleForEdit,
  getAdminNewsFormOptions,
} from "@/features/news/domain";
import { AdminNewsForm } from "@/features/news/ui";
import { cuidSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

type AdminNewsEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminNewsEditPage({ params }: AdminNewsEditPageProps) {
  await requireMinimumRole("EDITOR");
  const { id } = await params;
  const parsedId = cuidSchema.safeParse(id);
  if (!parsedId.success) {
    notFound();
  }

  const [article, options] = await Promise.all([
    getAdminNewsArticleForEdit(parsedId.data),
    getAdminNewsFormOptions(),
  ]);
  if (!article) {
    notFound();
  }

  return (
    <section className="space-y-4">
      <header className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
        <h2 className="text-lg font-semibold">Edit article</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Update content, status, slug, tags, and related entities.
        </p>
        <Link className="mt-2 inline-block text-xs text-[var(--accent)]" href="/admin/news">
          ← Back to news list
        </Link>
      </header>
      <AdminNewsForm mode="edit" options={options} initialArticle={article} />
    </section>
  );
}
