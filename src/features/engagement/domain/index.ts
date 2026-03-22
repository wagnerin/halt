export type FollowTarget = {
  userId: string;
  driverId?: string;
  teamId?: string;
};

export async function followEntity(_input: FollowTarget): Promise<void> {
  // Placeholder for follow use-case.
}
