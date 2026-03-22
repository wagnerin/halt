"use client";

import { ErrorState } from "@/components/feedback/error-state";

type DriverProfileErrorProps = {
  error: Error;
  reset: () => void;
};

export default function DriverProfileError({
  error,
  reset,
}: DriverProfileErrorProps) {
  return (
    <ErrorState
      title="Unable to load driver profile"
      message={error.message || "Please retry shortly."}
      onRetry={reset}
    />
  );
}
