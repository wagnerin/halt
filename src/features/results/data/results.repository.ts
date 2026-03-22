import type { CompetitorType, SessionType, TournamentStatus } from "@prisma/client";

import { prisma } from "@/lib/db";

export type RaceResultStandingRecord = {
  id: string;
  position: number;
  competitorType: CompetitorType;
  points: number | null;
  laps: number | null;
  totalTime: string | null;
  bestLap: string | null;
  driver: {
    slug: string;
    nickname: string;
  } | null;
  team: {
    slug: string;
    name: string;
  } | null;
};

export type RaceResultDetailRecord = {
  id: string;
  eventName: string;
  sessionType: SessionType;
  date: Date;
  notes: string | null;
  tournament: {
    slug: string;
    name: string;
    status: TournamentStatus;
    game: string;
    organizer: string;
  };
  standings: RaceResultStandingRecord[];
};

export async function findRaceResultSession(
  tournamentSlug: string,
  resultId: string
): Promise<RaceResultDetailRecord | null> {
  return prisma.raceResult.findFirst({
    where: {
      id: resultId,
      tournament: {
        slug: tournamentSlug,
      },
    },
    select: {
      id: true,
      eventName: true,
      sessionType: true,
      date: true,
      notes: true,
      tournament: {
        select: {
          slug: true,
          name: true,
          status: true,
          game: true,
          organizer: true,
        },
      },
      standings: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          position: true,
          competitorType: true,
          points: true,
          laps: true,
          totalTime: true,
          bestLap: true,
          driver: {
            select: {
              slug: true,
              nickname: true,
            },
          },
          team: {
            select: {
              slug: true,
              name: true,
            },
          },
        },
      },
    },
  });
}
