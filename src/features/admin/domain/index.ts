export type AdminDashboardStats = {
  articles: number;
  drafts: number;
  tournaments: number;
};

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  return {
    articles: 0,
    drafts: 0,
    tournaments: 0,
  };
}
