export type NewsListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: Date | null;
};

export async function listNews(): Promise<NewsListItem[]> {
  return [];
}
