import { PublishStatus } from "@prisma/client";

import { prisma } from "@/lib/db";

export type NewsListRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  publishedAt: Date | null;
  authorName: string | null;
  tags: Array<{
    slug: string;
    name: string;
  }>;
};

export type NewsArticleRecord = NewsListRecord & {
  content: string;
  relatedDrivers: Array<{
    slug: string;
    nickname: string;
  }>;
  relatedTeams: Array<{
    slug: string;
    name: string;
  }>;
  relatedTournaments: Array<{
    slug: string;
    name: string;
  }>;
};

export type RelatedNewsRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  publishedAt: Date | null;
};

export async function listPublishedNews(limit = 20): Promise<NewsListRecord[]> {
  const articles = await prisma.newsArticle.findMany({
    where: {
      status: PublishStatus.PUBLISHED,
      publishedAt: {
        not: null,
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: limit,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
      author: {
        select: {
          name: true,
        },
      },
      tags: {
        select: {
          slug: true,
          name: true,
        },
      },
    },
  });

  return articles.map((article) => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    coverImage: article.coverImage,
    publishedAt: article.publishedAt,
    authorName: article.author?.name ?? null,
    tags: article.tags,
  }));
}

export async function findPublishedArticleBySlug(
  slug: string
): Promise<NewsArticleRecord | null> {
  const article = await prisma.newsArticle.findFirst({
    where: {
      slug,
      status: PublishStatus.PUBLISHED,
      publishedAt: {
        not: null,
      },
    },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      content: true,
      coverImage: true,
      publishedAt: true,
      author: {
        select: {
          name: true,
        },
      },
      tags: {
        select: {
          slug: true,
          name: true,
        },
      },
      relatedDrivers: {
        select: {
          slug: true,
          nickname: true,
        },
      },
      relatedTeams: {
        select: {
          slug: true,
          name: true,
        },
      },
      relatedTournaments: {
        select: {
          slug: true,
          name: true,
        },
      },
    },
  });

  if (!article) {
    return null;
  }

  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    coverImage: article.coverImage,
    publishedAt: article.publishedAt,
    authorName: article.author?.name ?? null,
    tags: article.tags,
    relatedDrivers: article.relatedDrivers,
    relatedTeams: article.relatedTeams,
    relatedTournaments: article.relatedTournaments,
  };
}

export async function listRelatedPublishedNews(
  articleId: string,
  tagSlugs: string[],
  limit = 3
): Promise<RelatedNewsRecord[]> {
  if (tagSlugs.length === 0) {
    return [];
  }

  return prisma.newsArticle.findMany({
    where: {
      id: {
        not: articleId,
      },
      status: PublishStatus.PUBLISHED,
      publishedAt: {
        not: null,
      },
      tags: {
        some: {
          slug: {
            in: tagSlugs,
          },
        },
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: limit,
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
    },
  });
}
