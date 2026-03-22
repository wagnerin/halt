"use client";

import { ErrorState } from "@/components/feedback/error-state";

type PublicErrorProps = {
  error: Error;
  reset: () => void;
};

export default function PublicError({ error, reset }: PublicErrorProps) {
  return (
    <ErrorState
      title="Public page failed to load"
      message={error.message || "Please retry in a moment."}
      onRetry={reset}
    />
  );
}
