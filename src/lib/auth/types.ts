export const APP_ROLES = ["ADMIN", "EDITOR", "VIEWER"] as const;

export type AppRole = (typeof APP_ROLES)[number];

export type AuthUser = {
  id: string;
  name: string;
  email?: string;
  role: AppRole;
};
