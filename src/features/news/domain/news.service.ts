import {
  findPublishedArticleBySlug,
  listPublishedNews,
  listRelatedPublishedNews,
  type NewsArticleRecord,
  type NewsListRecord,
  type RelatedNewsRecord,
} from "../data";

export type NewsListItem = NewsListRecord;

export type NewsDetail = NewsArticleRecord;

export type RelatedNewsItem = RelatedNewsRecord;

export async function getNewsList(limit?: number): Promise<NewsListItem[]> {
  return listPublishedNews(limit);
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsDetail | null> {
  return findPublishedArticleBySlug(slug);
}

export async function getRelatedNewsForArticle(
  articleId: string,
  tagSlugs: string[],
  limit?: number
): Promise<RelatedNewsItem[]> {
  return listRelatedPublishedNews(articleId, tagSlugs, limit);
}
