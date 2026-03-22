type AdminNewsStatusBadgeProps = {
  status: "DRAFT" | "PUBLISHED";
};

const STATUS_CLASSES: Record<AdminNewsStatusBadgeProps["status"], string> = {
  DRAFT: "border-yellow-400/40 bg-yellow-500/10 text-yellow-200",
  PUBLISHED: "border-emerald-400/40 bg-emerald-500/10 text-emerald-200",
};

export function AdminNewsStatusBadge({ status }: AdminNewsStatusBadgeProps) {
  return (
    <span className={`inline-flex rounded border px-2 py-1 text-xs ${STATUS_CLASSES[status]}`}>
      {status.toLowerCase()}
    </span>
  );
}
