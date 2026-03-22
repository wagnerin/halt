type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Something went wrong",
  message = "Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="space-y-3 rounded-md border border-red-500/30 bg-red-500/10 p-4">
      <p className="text-sm font-semibold text-red-200">{title}</p>
      <p className="text-sm text-red-100/80">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="rounded border border-red-300/40 px-3 py-1 text-xs font-medium text-red-100 hover:bg-red-300/10"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}
