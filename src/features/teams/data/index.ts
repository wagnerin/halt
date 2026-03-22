import type { TeamListItem } from "../domain";

export type TeamsRepository = {
  listTeams: () => Promise<TeamListItem[]>;
};
