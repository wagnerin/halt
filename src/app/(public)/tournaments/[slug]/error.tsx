"use client";

import { ErrorState } from "@/components/feedback/error-state";

type TournamentDetailErrorProps = {
  error: Error;
  reset: () => void;
};

export default function TournamentDetailError({
  error,
  reset,
}: TournamentDetailErrorProps) {
  return (
    <ErrorState
      title="Unable to load tournament"
      message={error.message || "Please retry shortly."}
      onRetry={reset}
    />
  );
}
