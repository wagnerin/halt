import type { FollowTarget } from "../domain";

export type EngagementRepository = {
  followEntity: (input: FollowTarget) => Promise<void>;
};
