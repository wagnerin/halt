"use client";

import { useMemo, useState } from "react";

type SafeCoverImageProps = {
  src: string | null | undefined;
  alt: string;
  className: string;
  placeholderLabel?: string;
  placeholderClassName?: string;
};

function normalizeImageSrc(src: string | null | undefined): string | null {
  if (typeof src !== "string") {
    return null;
  }

  const trimmed = src.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return trimmed;
    }
    return null;
  } catch {
    return null;
  }
}

export function SafeCoverImage({
  src,
  alt,
  className,
  placeholderLabel = "Image unavailable",
  placeholderClassName,
}: SafeCoverImageProps) {
  const normalizedSrc = useMemo(() => normalizeImageSrc(src), [src]);
  const [failedToLoad, setFailedToLoad] = useState(false);

  if (!normalizedSrc || failedToLoad) {
    return (
      <div
        className={
          placeholderClassName ??
          "flex items-center justify-center bg-gradient-to-br from-[var(--surface-2)] to-[var(--background)] text-xs text-[var(--text-muted)]"
        }
      >
        <span>{placeholderLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={normalizedSrc}
      alt={alt}
      className={className}
      onError={() => setFailedToLoad(true)}
    />
  );
}
