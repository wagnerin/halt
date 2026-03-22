"use client";

import { ErrorState } from "@/components/feedback/error-state";

type NewsErrorProps = {
  error: Error;
  reset: () => void;
};

export default function NewsError({ error, reset }: NewsErrorProps) {
  return (
    <ErrorState
      title="Unable to load news page"
      message={error.message || "Please retry shortly."}
      onRetry={reset}
    />
  );
}
