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

export type AdminNewsListRecord = {
  id: string;
  slug: string;
  title: string;
  status: PublishStatus;
  publishedAt: Date | null;
  updatedAt: Date;
  tags: Array<{
    id: string;
    name: string;
  }>;
};

export type AdminNewsEditRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  status: PublishStatus;
  publishedAt: Date | null;
  tagIds: string[];
  relatedDriverIds: string[];
  relatedTeamIds: string[];
  relatedTournamentIds: string[];
};

export type AdminNewsEditorOptions = {
  tags: Array<{ id: string; name: string; slug: string }>;
  drivers: Array<{ id: string; nickname: string; slug: string }>;
  teams: Array<{ id: string; name: string; slug: string }>;
  tournaments: Array<{ id: string; name: string; slug: string }>;
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

export async function listAdminNewsArticles(limit = 100): Promise<AdminNewsListRecord[]> {
  return prisma.newsArticle.findMany({
    orderBy: [
      {
        updatedAt: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
    take: limit,
    select: {
      id: true,
      slug: true,
      title: true,
      status: true,
      publishedAt: true,
      updatedAt: true,
      tags: {
        orderBy: {
          name: "asc",
        },
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export async function findAdminNewsArticleById(
  id: string
): Promise<AdminNewsEditRecord | null> {
  const article = await prisma.newsArticle.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      content: true,
      coverImage: true,
      status: true,
      publishedAt: true,
      tags: {
        select: {
          id: true,
        },
      },
      relatedDrivers: {
        select: {
          id: true,
        },
      },
      relatedTeams: {
        select: {
          id: true,
        },
      },
      relatedTournaments: {
        select: {
          id: true,
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
    status: article.status,
    publishedAt: article.publishedAt,
    tagIds: article.tags.map((tag) => tag.id),
    relatedDriverIds: article.relatedDrivers.map((driver) => driver.id),
    relatedTeamIds: article.relatedTeams.map((team) => team.id),
    relatedTournamentIds: article.relatedTournaments.map((tournament) => tournament.id),
  };
}

export async function listAdminNewsEditorOptions(): Promise<AdminNewsEditorOptions> {
  const [tags, drivers, teams, tournaments] = await Promise.all([
    prisma.tag.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    }),
    prisma.driver.findMany({
      orderBy: {
        nickname: "asc",
      },
      select: {
        id: true,
        nickname: true,
        slug: true,
      },
    }),
    prisma.team.findMany({
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    }),
    prisma.tournament.findMany({
      orderBy: {
        startDate: "desc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    }),
  ]);

  return {
    tags,
    drivers,
    teams,
    tournaments,
  };
}

type UpsertAdminNewsInput = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  status: PublishStatus;
  tagIds: string[];
  relatedDriverIds: string[];
  relatedTeamIds: string[];
  relatedTournamentIds: string[];
};

function uniqueIds(values: string[]): string[] {
  return [...new Set(values)];
}

export async function createAdminNewsArticle(
  input: UpsertAdminNewsInput,
  authorId: string | null
): Promise<{ id: string }> {
  const now = new Date();
  const article = await prisma.newsArticle.create({
    data: {
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      coverImage: input.coverImage,
      status: input.status,
      publishedAt: input.status === PublishStatus.PUBLISHED ? now : null,
      authorId,
      tags: {
        connect: uniqueIds(input.tagIds).map((id) => ({ id })),
      },
      relatedDrivers: {
        connect: uniqueIds(input.relatedDriverIds).map((id) => ({ id })),
      },
      relatedTeams: {
        connect: uniqueIds(input.relatedTeamIds).map((id) => ({ id })),
      },
      relatedTournaments: {
        connect: uniqueIds(input.relatedTournamentIds).map((id) => ({ id })),
      },
    },
    select: {
      id: true,
    },
  });

  return article;
}

export async function updateAdminNewsArticle(
  id: string,
  input: UpsertAdminNewsInput
): Promise<{ id: string } | null> {
  const existing = await prisma.newsArticle.findUnique({
    where: { id },
    select: {
      id: true,
      publishedAt: true,
    },
  });

  if (!existing) {
    return null;
  }

  const shouldSetPublishedAtNow =
    input.status === PublishStatus.PUBLISHED && existing.publishedAt === null;
  const shouldClearPublishedAt = input.status === PublishStatus.DRAFT;

  return prisma.newsArticle.update({
    where: {
      id,
    },
    data: {
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      coverImage: input.coverImage,
      status: input.status,
      publishedAt: shouldClearPublishedAt
        ? null
        : shouldSetPublishedAtNow
          ? new Date()
          : existing.publishedAt,
      tags: {
        set: uniqueIds(input.tagIds).map((tagId) => ({ id: tagId })),
      },
      relatedDrivers: {
        set: uniqueIds(input.relatedDriverIds).map((driverId) => ({ id: driverId })),
      },
      relatedTeams: {
        set: uniqueIds(input.relatedTeamIds).map((teamId) => ({ id: teamId })),
      },
      relatedTournaments: {
        set: uniqueIds(input.relatedTournamentIds).map((tournamentId) => ({
          id: tournamentId,
        })),
      },
    },
    select: {
      id: true,
    },
  });
}
