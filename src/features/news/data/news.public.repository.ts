import {
  findPublishedArticleBySlugMock,
  listPublishedNewsMock,
  listRelatedPublishedNewsMock,
} from "./mock-news.repository";
import type {
  NewsArticleRecord,
  NewsListRecord,
  RelatedNewsRecord,
} from "./news.public.types";

// Public news pages run against mock data for local development.
export async function listPublishedNews(limit = 20): Promise<NewsListRecord[]> {
  return listPublishedNewsMock(limit);
}

export async function findPublishedArticleBySlug(
  slug: string
): Promise<NewsArticleRecord | null> {
  return findPublishedArticleBySlugMock(slug);
}

export async function listRelatedPublishedNews(
  articleId: string,
  tagSlugs: string[],
  limit = 3
): Promise<RelatedNewsRecord[]> {
  return listRelatedPublishedNewsMock(articleId, tagSlugs, limit);
}
