"use client";

import { ErrorState } from "@/components/feedback/error-state";

type TournamentsErrorProps = {
  error: Error;
  reset: () => void;
};

export default function TournamentsError({ error, reset }: TournamentsErrorProps) {
  return (
    <ErrorState
      title="Unable to load tournaments"
      message={error.message || "Please retry shortly."}
      onRetry={reset}
    />
  );
}
