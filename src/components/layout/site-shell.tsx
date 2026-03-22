import type { PropsWithChildren } from "react";

export function SiteShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[linear-gradient(180deg,#10161e_0%,#0d1218_100%)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-4 py-2.5">
          <span className="text-sm font-bold tracking-[0.1em] text-[#d8e6f5]">
            SIMRACING.GG
          </span>
          <span className="text-[10px] uppercase tracking-[0.08em] text-[var(--text-muted)]">
            News-first esports media
          </span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1240px] px-4 py-4">{children}</main>
    </div>
  );
}
