import type { TournamentListItem } from "../domain";

export type TournamentsRepository = {
  listTournaments: () => Promise<TournamentListItem[]>;
};
