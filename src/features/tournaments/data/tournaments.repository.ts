import { PublishStatus, TournamentStatus, type SessionType } from "@prisma/client";

import { prisma } from "@/lib/db";

export type TournamentListRecord = {
  id: string;
  slug: string;
  name: string;
  game: string;
  organizer: string;
  startDate: Date;
  endDate: Date;
  prizePool: number | null;
  status: TournamentStatus;
  teamsCount: number;
  driversCount: number;
};

export type TournamentParticipantTeamRecord = {
  slug: string;
  name: string;
  country: string;
};

export type TournamentParticipantDriverRecord = {
  slug: string;
  nickname: string;
  country: string;
};

export type TournamentResultStandingRecord = {
  position: number;
  points: number | null;
  totalTime: string | null;
  driver: {
    slug: string;
    nickname: string;
  } | null;
  team: {
    slug: string;
    name: string;
  } | null;
};

export type TournamentResultRecord = {
  id: string;
  eventName: string;
  sessionType: SessionType;
  date: Date;
  notes: string | null;
  standings: TournamentResultStandingRecord[];
};

export type TournamentDetailRecord = {
  id: string;
  slug: string;
  name: string;
  game: string;
  organizer: string;
  prizePool: number | null;
  startDate: Date;
  endDate: Date;
  status: TournamentStatus;
  participantsTeams: TournamentParticipantTeamRecord[];
  participantsDrivers: TournamentParticipantDriverRecord[];
  raceResults: TournamentResultRecord[];
  relatedPublishedArticlesCount: number;
};

export async function listTournaments(limit = 30): Promise<TournamentListRecord[]> {
  const tournaments = await prisma.tournament.findMany({
    orderBy: [
      {
        startDate: "desc",
      },
      {
        name: "asc",
      },
    ],
    take: limit,
    select: {
      id: true,
      slug: true,
      name: true,
      game: true,
      organizer: true,
      prizePool: true,
      startDate: true,
      endDate: true,
      status: true,
      _count: {
        select: {
          participantsTeams: true,
          participantsDrivers: true,
        },
      },
    },
  });

  return tournaments.map((tournament) => ({
    id: tournament.id,
    slug: tournament.slug,
    name: tournament.name,
    game: tournament.game,
    organizer: tournament.organizer,
    prizePool: tournament.prizePool,
    startDate: tournament.startDate,
    endDate: tournament.endDate,
    status: tournament.status,
    teamsCount: tournament._count.participantsTeams,
    driversCount: tournament._count.participantsDrivers,
  }));
}

export async function findTournamentBySlug(
  slug: string
): Promise<TournamentDetailRecord | null> {
  const tournament = await prisma.tournament.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      slug: true,
      name: true,
      game: true,
      organizer: true,
      prizePool: true,
      startDate: true,
      endDate: true,
      status: true,
      participantsTeams: {
        orderBy: {
          name: "asc",
        },
        select: {
          slug: true,
          name: true,
          country: true,
        },
      },
      participantsDrivers: {
        orderBy: {
          nickname: "asc",
        },
        select: {
          slug: true,
          nickname: true,
          country: true,
        },
      },
      raceResults: {
        orderBy: {
          date: "desc",
        },
        select: {
          id: true,
          eventName: true,
          sessionType: true,
          date: true,
          notes: true,
          standings: {
            orderBy: {
              position: "asc",
            },
            take: 5,
            select: {
              position: true,
              points: true,
              totalTime: true,
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
      },
      relatedArticles: {
        where: {
          status: PublishStatus.PUBLISHED,
          publishedAt: {
            not: null,
          },
        },
        select: {
          id: true,
        },
      },
    },
  });

  if (!tournament) {
    return null;
  }

  return {
    id: tournament.id,
    slug: tournament.slug,
    name: tournament.name,
    game: tournament.game,
    organizer: tournament.organizer,
    prizePool: tournament.prizePool,
    startDate: tournament.startDate,
    endDate: tournament.endDate,
    status: tournament.status,
    participantsTeams: tournament.participantsTeams,
    participantsDrivers: tournament.participantsDrivers,
    raceResults: tournament.raceResults,
    relatedPublishedArticlesCount: tournament.relatedArticles.length,
  };
}
