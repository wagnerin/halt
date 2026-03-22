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
