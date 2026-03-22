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
    <section className="space-y-2 rounded border border-[#2f3c4d] bg-gradient-to-b from-[var(--surface)] to-[#11161d] p-2.5 shadow-[0_8px_22px_rgba(0,0,0,0.22)]">
      <header className="flex items-center justify-between gap-2 border-b border-[#2f3c4d] pb-1.5">
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#b8c6d8]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-0.5 text-[10px] text-[var(--text-muted)]/85">{subtitle}</p>
          ) : null}
        </div>
        {action ? <div className="text-[10px]">{action}</div> : null}
      </header>
      {children}
    </section>
  );
}
