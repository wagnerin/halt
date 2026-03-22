import { PublishStatus } from "@prisma/client";

import type { AdminArticleInput } from "./admin-article.validation";

type JsonLikeRecord = Record<string, unknown>;

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function asNullableString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function mapRequestBodyToAdminArticleInput(
  payload: JsonLikeRecord
): AdminArticleInput {
  return {
    slug: String(payload.slug ?? ""),
    title: String(payload.title ?? ""),
    excerpt: String(payload.excerpt ?? ""),
    content: String(payload.content ?? ""),
    coverImage: asNullableString(payload.coverImage),
    status:
      payload.status === PublishStatus.PUBLISHED
        ? PublishStatus.PUBLISHED
        : PublishStatus.DRAFT,
    tagIds: asStringArray(payload.tagIds),
    relatedDriverIds: asStringArray(payload.relatedDriverIds),
    relatedTeamIds: asStringArray(payload.relatedTeamIds),
    relatedTournamentIds: asStringArray(payload.relatedTournamentIds),
  };
}
