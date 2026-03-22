import { getCurrentUser } from "./session";
import type { AppRole, AuthUser } from "./types";

const ROLE_PRIORITY: Record<AppRole, number> = {
  VIEWER: 1,
  EDITOR: 2,
  ADMIN: 3,
};

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export function canAccessRole(userRole: AppRole, minimumRole: AppRole): boolean {
  return ROLE_PRIORITY[userRole] >= ROLE_PRIORITY[minimumRole];
}

export async function requireMinimumRole(minimumRole: AppRole): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new UnauthorizedError("Authentication required.");
  }

  if (!canAccessRole(user.role, minimumRole)) {
    throw new UnauthorizedError("Insufficient role.");
  }

  return user;
}
