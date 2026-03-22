export type TournamentListItem = {
  id: string;
  slug: string;
  name: string;
  status: "UPCOMING" | "LIVE" | "COMPLETED";
};

export async function listTournaments(): Promise<TournamentListItem[]> {
  return [];
}
