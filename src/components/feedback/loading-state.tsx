type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "Loading..." }: LoadingStateProps) {
  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-muted)]">
      {label}
    </div>
  );
}
