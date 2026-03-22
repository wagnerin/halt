"use client";

import { ErrorState } from "@/components/feedback/error-state";

type DriversErrorProps = {
  error: Error;
  reset: () => void;
};

export default function DriversError({ error, reset }: DriversErrorProps) {
  return (
    <ErrorState
      title="Unable to load drivers"
      message={error.message || "Please retry shortly."}
      onRetry={reset}
    />
  );
}
