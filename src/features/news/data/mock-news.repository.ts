import { MOCK_NEWS_ARTICLES } from "./mock-news.data";
import type {
  NewsArticleRecord,
  NewsListRecord,
  RelatedNewsRecord,
} from "./news.public.types";

function toListRecord(article: NewsArticleRecord): NewsListRecord {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    coverImage: article.coverImage,
    publishedAt: article.publishedAt,
    authorName: article.authorName,
    tags: article.tags,
  };
}

export async function listPublishedNewsMock(limit = 20): Promise<NewsListRecord[]> {
  return [...MOCK_NEWS_ARTICLES]
    .sort((a, b) => {
      const aTime = a.publishedAt ? a.publishedAt.getTime() : 0;
      const bTime = b.publishedAt ? b.publishedAt.getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, limit)
    .map(toListRecord);
}

export async function findPublishedArticleBySlugMock(
  slug: string
): Promise<NewsArticleRecord | null> {
  return MOCK_NEWS_ARTICLES.find((article) => article.slug === slug) ?? null;
}

export async function listRelatedPublishedNewsMock(
  articleId: string,
  tagSlugs: string[],
  limit = 3
): Promise<RelatedNewsRecord[]> {
  if (tagSlugs.length === 0) {
    return [];
  }

  const tagSet = new Set(tagSlugs);

  return MOCK_NEWS_ARTICLES.filter((article) => article.id !== articleId)
    .filter((article) => article.tags.some((tag) => tagSet.has(tag.slug)))
    .sort((a, b) => {
      const aTime = a.publishedAt ? a.publishedAt.getTime() : 0;
      const bTime = b.publishedAt ? b.publishedAt.getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, limit)
    .map((article) => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      coverImage: article.coverImage,
      publishedAt: article.publishedAt,
    }));
}
