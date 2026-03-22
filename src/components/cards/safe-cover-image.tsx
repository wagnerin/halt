"use client";

import { useMemo, useState } from "react";

type SafeCoverImageProps = {
  src: string | null | undefined;
  alt: string;
  className: string;
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
  placeholderClassName,
}: SafeCoverImageProps) {
  const normalizedSrc = useMemo(() => normalizeImageSrc(src), [src]);
  const [failedToLoad, setFailedToLoad] = useState(false);

  if (!normalizedSrc || failedToLoad) {
    return (
      <div
        className={
          placeholderClassName ??
          "relative overflow-hidden bg-gradient-to-br from-[#1e2530] via-[#151c25] to-[#0d1117]"
        }
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(94,163,255,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.04)_35%,transparent_70%)]" />
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
