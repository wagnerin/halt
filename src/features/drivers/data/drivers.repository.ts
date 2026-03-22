import { PublishStatus, type Platform } from "@prisma/client";

import { prisma } from "@/lib/db";

type DriverTeamReference = {
  slug: string;
  name: string;
};

export type DriverListRecord = {
  id: string;
  slug: string;
  nickname: string;
  realName: string | null;
  country: string;
  avatar: string | null;
  bio: string;
  team: DriverTeamReference | null;
  platforms: Platform[];
};

export type DriverAchievementRecord = {
  id: string;
  title: string;
  description: string | null;
  year: number | null;
};

export type DriverTimelineEntryRecord = {
  id: string;
  periodStart: Date;
  periodEnd: Date | null;
  label: string;
  description: string | null;
};

export type DriverRelatedArticleRecord = {
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

export type DriverProfileRecord = DriverListRecord & {
  achievements: DriverAchievementRecord[];
  timelineEntries: DriverTimelineEntryRecord[];
  relatedArticles: DriverRelatedArticleRecord[];
};

export async function listDrivers(limit = 50): Promise<DriverListRecord[]> {
  return prisma.driver.findMany({
    orderBy: {
      nickname: "asc",
    },
    take: limit,
    select: {
      id: true,
      slug: true,
      nickname: true,
      realName: true,
      country: true,
      avatar: true,
      bio: true,
      platforms: true,
      team: {
        select: {
          slug: true,
          name: true,
        },
      },
    },
  });
}

export async function findDriverBySlug(
  slug: string
): Promise<DriverProfileRecord | null> {
  const driver = await prisma.driver.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      slug: true,
      nickname: true,
      realName: true,
      country: true,
      avatar: true,
      bio: true,
      platforms: true,
      team: {
        select: {
          slug: true,
          name: true,
        },
      },
      achievements: {
        orderBy: {
          year: "desc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          year: true,
        },
      },
      timelineEntries: {
        orderBy: {
          periodStart: "desc",
        },
        select: {
          id: true,
          periodStart: true,
          periodEnd: true,
          label: true,
          description: true,
        },
      },
      relatedArticles: {
        where: {
          status: PublishStatus.PUBLISHED,
          publishedAt: {
            not: null,
          },
        },
        orderBy: {
          publishedAt: "desc",
        },
        take: 4,
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
      },
    },
  });

  if (!driver) {
    return null;
  }

  return {
    id: driver.id,
    slug: driver.slug,
    nickname: driver.nickname,
    realName: driver.realName,
    country: driver.country,
    avatar: driver.avatar,
    bio: driver.bio,
    platforms: driver.platforms,
    team: driver.team,
    achievements: driver.achievements,
    timelineEntries: driver.timelineEntries,
    relatedArticles: driver.relatedArticles.map((article) => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      coverImage: article.coverImage,
      publishedAt: article.publishedAt,
      authorName: article.author?.name ?? null,
      tags: article.tags,
    })),
  };
}
