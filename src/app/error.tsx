"use client";

import { ErrorState } from "@/components/feedback/error-state";

type RootErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RootError({ error, reset }: RootErrorProps) {
  return (
    <ErrorState
      title="Application error"
      message={error.message || "Unexpected error occurred."}
      onRetry={reset}
    />
  );
}
