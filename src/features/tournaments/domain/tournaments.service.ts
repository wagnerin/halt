import {
  findTournamentBySlug,
  listTournaments,
  type TournamentDetailRecord,
  type TournamentListRecord,
  type TournamentParticipantDriverRecord,
  type TournamentParticipantTeamRecord,
  type TournamentResultRecord,
  type TournamentResultStandingRecord,
} from "../data";

export type TournamentListItem = TournamentListRecord;
export type TournamentDetail = TournamentDetailRecord;
export type TournamentParticipantTeam = TournamentParticipantTeamRecord;
export type TournamentParticipantDriver = TournamentParticipantDriverRecord;
export type TournamentResult = TournamentResultRecord;
export type TournamentResultStanding = TournamentResultStandingRecord;

export async function getTournamentsList(limit?: number): Promise<TournamentListItem[]> {
  return listTournaments(limit);
}

export async function getTournamentBySlug(
  slug: string
): Promise<TournamentDetail | null> {
  return findTournamentBySlug(slug);
}
