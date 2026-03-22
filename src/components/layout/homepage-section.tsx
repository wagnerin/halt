import type { ReactNode } from "react";

type HomepageSectionProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
};

export function HomepageSection({
  title,
  subtitle,
  action,
  children,
}: HomepageSectionProps) {
  return (
    <section className="space-y-2 rounded border border-[var(--border)] bg-[var(--surface)] p-3">
      <header className="flex items-center justify-between gap-3 border-b border-[var(--border)] pb-2">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-[11px] text-[var(--text-muted)]">{subtitle}</p>
          ) : null}
        </div>
        {action ? <div className="text-[11px]">{action}</div> : null}
      </header>
      {children}
    </section>
  );
}
