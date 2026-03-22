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
    <section className="space-y-2 rounded border border-[var(--border)] bg-[var(--surface)] p-2.5">
      <header className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-1.5">
        <div>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-0.5 text-[10px] text-[var(--text-muted)]/90">{subtitle}</p>
          ) : null}
        </div>
        {action ? <div className="text-[10px]">{action}</div> : null}
      </header>
      {children}
    </section>
  );
}
