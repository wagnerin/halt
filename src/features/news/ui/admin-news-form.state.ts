import type { AdminNewsEditArticle } from "../domain";

export type AdminNewsFormStatus = "DRAFT" | "PUBLISHED";

export type AdminNewsFormState = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  status: AdminNewsFormStatus;
  tagIds: string[];
  relatedDriverIds: string[];
  relatedTeamIds: string[];
  relatedTournamentIds: string[];
};

export function buildInitialAdminNewsFormState(
  initialArticle?: AdminNewsEditArticle
): AdminNewsFormState {
  if (!initialArticle) {
    return {
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      coverImage: "",
      status: "DRAFT",
      tagIds: [],
      relatedDriverIds: [],
      relatedTeamIds: [],
      relatedTournamentIds: [],
    };
  }

  return {
    slug: initialArticle.slug,
    title: initialArticle.title,
    excerpt: initialArticle.excerpt,
    content: initialArticle.content,
    coverImage: initialArticle.coverImage ?? "",
    status: initialArticle.status,
    tagIds: initialArticle.tagIds,
    relatedDriverIds: initialArticle.relatedDriverIds,
    relatedTeamIds: initialArticle.relatedTeamIds,
    relatedTournamentIds: initialArticle.relatedTournamentIds,
  };
}

export function toggleSelectedId(values: string[], id: string): string[] {
  if (values.includes(id)) {
    return values.filter((value) => value !== id);
  }

  return [...values, id];
}
