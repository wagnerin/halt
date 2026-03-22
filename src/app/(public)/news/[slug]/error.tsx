"use client";

import { ErrorState } from "@/components/feedback/error-state";

type NewsArticleErrorProps = {
  error: Error;
  reset: () => void;
};

export default function NewsArticleError({ error, reset }: NewsArticleErrorProps) {
  return (
    <ErrorState
      title="Unable to load article"
      message={error.message || "Please retry shortly."}
      onRetry={reset}
    />
  );
}
