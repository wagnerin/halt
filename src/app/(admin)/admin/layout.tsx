import type { ReactNode } from "react";

import { requireMinimumRole } from "@/lib/auth";

type AdminLayoutProps = {
  children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  await requireMinimumRole("VIEWER");

  return (
    <section className="space-y-4">
      <header className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4">
        <h1 className="text-base font-semibold">Admin Panel</h1>
        <p className="text-sm text-[var(--text-muted)]">
          Protected area scaffold. CRUD modules intentionally deferred.
        </p>
      </header>
      {children}
    </section>
  );
}
