export type NewsTagRecord = {
  slug: string;
  name: string;
};

export type NewsListRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  publishedAt: Date | null;
  authorName: string | null;
  tags: NewsTagRecord[];
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
