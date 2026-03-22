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

export type HomepageNewsData = {
  headline: NewsListItem | null;
  latestFeed: NewsListItem[];
};

export async function getNewsList(limit?: number): Promise<NewsListItem[]> {
  return listPublishedNews(limit);
}

export async function getHomepageNewsData(): Promise<HomepageNewsData> {
  const articles = await listPublishedNews(8);
  const [headline, ...latestFeed] = articles;

  return {
    headline: headline ?? null,
    latestFeed,
  };
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
