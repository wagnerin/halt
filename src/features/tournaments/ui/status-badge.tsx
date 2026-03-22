import type { TournamentListItem } from "../domain";

type StatusBadgeProps = {
  status: TournamentListItem["status"];
};

const STATUS_STYLES: Record<TournamentListItem["status"], string> = {
  UPCOMING: "border-blue-400/40 bg-blue-500/10 text-blue-200",
  LIVE: "border-emerald-400/40 bg-emerald-500/10 text-emerald-200",
  COMPLETED: "border-slate-400/40 bg-slate-500/10 text-slate-200",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded border px-2 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {status.toLowerCase()}
    </span>
  );
}
