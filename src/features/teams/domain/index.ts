export type TeamListItem = {
  id: string;
  slug: string;
  name: string;
  country: string;
};

export async function listTeams(): Promise<TeamListItem[]> {
  return [];
}
