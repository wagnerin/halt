import Link from "next/link";

import { DataTable, type DataTableColumn } from "@/components/tables";

import type { ResultSessionStandingDto } from "../api";

type StandingsTableProps = {
  standings: ResultSessionStandingDto[];
};

function competitorCell(standing: ResultSessionStandingDto) {
  if (standing.driverSlug) {
    return (
      <Link className="hover:text-[var(--accent)]" href={`/drivers/${standing.driverSlug}`}>
        {standing.competitorName}
      </Link>
    );
  }

  return standing.competitorName;
}

function teamCell(standing: ResultSessionStandingDto) {
  if (standing.teamSlug && standing.teamName) {
    return (
      <Link className="hover:text-[var(--accent)]" href={`/teams/${standing.teamSlug}`}>
        {standing.teamName}
      </Link>
    );
  }

  return standing.teamName ?? "-";
}

const columns: DataTableColumn<ResultSessionStandingDto>[] = [
  {
    key: "position",
    header: "Pos",
    className: "w-16",
    render: (standing) => `P${standing.position}`,
  },
  {
    key: "competitor",
    header: "Competitor",
    render: competitorCell,
  },
  {
    key: "team",
    header: "Team",
    render: teamCell,
  },
  {
    key: "points",
    header: "Points",
    className: "w-24",
    render: (standing) => (standing.points !== null ? standing.points : "-"),
  },
  {
    key: "laps",
    header: "Laps",
    className: "w-24",
    render: (standing) => (standing.laps !== null ? standing.laps : "-"),
  },
  {
    key: "bestLap",
    header: "Best lap",
    className: "w-28",
    render: (standing) => standing.bestLap ?? "-",
  },
  {
    key: "totalTime",
    header: "Total time",
    className: "w-32",
    render: (standing) => standing.totalTime ?? "-",
  },
];

export function StandingsTable({ standings }: StandingsTableProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold">Standings</h2>
      <DataTable
        columns={columns}
        rows={standings}
        getRowKey={(standing) => standing.id}
        emptyLabel="No standings available for this session."
      />
    </section>
  );
}
