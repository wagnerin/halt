import type { AppRole, AuthUser } from "./types";

const DEFAULT_PLACEHOLDER_ROLE: AppRole = "VIEWER";

function getPlaceholderRoleFromEnv(): AppRole {
  const value = process.env.AUTH_PLACEHOLDER_ROLE;
  if (value === "ADMIN" || value === "EDITOR" || value === "VIEWER") {
    return value;
  }
  return DEFAULT_PLACEHOLDER_ROLE;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  // Placeholder only. Replace with real auth provider/session lookup.
  return {
    id: "local-placeholder-user",
    name: "Local Placeholder",
    role: getPlaceholderRoleFromEnv(),
  };
}
