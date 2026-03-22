"use client";

import { ErrorState } from "@/components/feedback/error-state";

type ResultDetailErrorProps = {
  error: Error;
  reset: () => void;
};

export default function ResultDetailError({ error, reset }: ResultDetailErrorProps) {
  return (
    <ErrorState
      title="Unable to load result session"
      message={error.message || "Please retry shortly."}
      onRetry={reset}
    />
  );
}
