import {
  findPublishedArticleBySlug,
  listPublishedNews,
  listRelatedPublishedNews,
} from "../data/news.public.repository";
import type {
  NewsArticleRecord,
  NewsListRecord,
  RelatedNewsRecord,
} from "../data/news.public.types";

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
