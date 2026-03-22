import type { AdminDashboardStats } from "../domain";

export type AdminRepository = {
  getDashboardStats: () => Promise<AdminDashboardStats>;
};
