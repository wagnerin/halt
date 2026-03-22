import type { RaceResultDetailRecord } from "../data";

export type ResultSessionStandingDto = {
  id: string;
  position: number;
  competitorType: string;
  competitorName: string;
  driverSlug: string | null;
  teamName: string | null;
  teamSlug: string | null;
  points: number | null;
  laps: number | null;
  totalTime: string | null;
  bestLap: string | null;
};

export type ResultSessionDetailDto = {
  id: string;
  eventName: string;
  sessionType: string;
  date: Date;
  notes: string | null;
  tournament: {
    slug: string;
    name: string;
    status: string;
    game: string;
    organizer: string;
  };
  standings: ResultSessionStandingDto[];
  summary: {
    entries: number;
    winner: string | null;
    totalPointsAwarded: number;
    averagePoints: number | null;
  };
};

function standingCompetitorName(
  standing: RaceResultDetailRecord["standings"][number]
): string {
  if (standing.driver) {
    return standing.driver.nickname;
  }

  if (standing.team) {
    return standing.team.name;
  }

  return "Unknown competitor";
}

export function mapRaceResultToDto(
  record: RaceResultDetailRecord
): ResultSessionDetailDto {
  const standings: ResultSessionStandingDto[] = record.standings.map((standing) => ({
    id: standing.id,
    position: standing.position,
    competitorType: standing.competitorType.toLowerCase(),
    competitorName: standingCompetitorName(standing),
    driverSlug: standing.driver?.slug ?? null,
    teamName: standing.team?.name ?? null,
    teamSlug: standing.team?.slug ?? null,
    points: standing.points,
    laps: standing.laps,
    totalTime: standing.totalTime,
    bestLap: standing.bestLap,
  }));

  const totalPointsAwarded = standings.reduce(
    (sum, standing) => sum + (standing.points ?? 0),
    0
  );
  const pointEntries = standings.filter((standing) => standing.points !== null).length;

  return {
    id: record.id,
    eventName: record.eventName,
    sessionType: record.sessionType.toLowerCase(),
    date: record.date,
    notes: record.notes,
    tournament: {
      slug: record.tournament.slug,
      name: record.tournament.name,
      status: record.tournament.status.toLowerCase(),
      game: record.tournament.game,
      organizer: record.tournament.organizer,
    },
    standings,
    summary: {
      entries: standings.length,
      winner: standings[0]?.competitorName ?? null,
      totalPointsAwarded,
      averagePoints:
        pointEntries === 0
          ? null
          : Number((totalPointsAwarded / pointEntries).toFixed(2)),
    },
  };
}
