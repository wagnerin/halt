import Link from "next/link";

import type { ResultSessionDetailDto } from "../api";
import { EventSessionMetadata } from "./event-session-metadata";
import { StandingsTable } from "./standings-table";
import { SummaryStatsBlock } from "./summary-stats-block";

type ResultSessionDetailProps = {
  session: ResultSessionDetailDto;
};

export function ResultSessionDetail({ session }: ResultSessionDetailProps) {
  return (
    <div className="space-y-5">
      <EventSessionMetadata session={session} />
      <SummaryStatsBlock summary={session.summary} />
      <StandingsTable standings={session.standings} />
      <Link className="inline-block text-sm text-[var(--accent)]" href="/results">
        ← Back to results
      </Link>
    </div>
  );
}
