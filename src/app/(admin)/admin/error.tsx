"use client";

import { ErrorState } from "@/components/feedback/error-state";

type AdminErrorProps = {
  error: Error;
  reset: () => void;
};

export default function AdminError({ error, reset }: AdminErrorProps) {
  return (
    <ErrorState
      title="Admin area error"
      message={error.message || "Unable to load admin area."}
      onRetry={reset}
    />
  );
}
