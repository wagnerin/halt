import Link from "next/link";

import { DataTable, type DataTableColumn } from "@/components/tables";

import type { AdminNewsListItem } from "../domain";
import { AdminNewsStatusBadge } from "./admin-news-status-badge";

type AdminNewsListTableProps = {
  rows: AdminNewsListItem[];
};

function formatDate(value: Date | null): string {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

const columns: DataTableColumn<AdminNewsListItem>[] = [
  {
    key: "title",
    header: "Title",
    render: (row) => (
      <div className="space-y-1">
        <p className="font-medium">{row.title}</p>
        <p className="text-xs text-[var(--text-muted)]">/{row.slug}</p>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    className: "w-28",
    render: (row) => <AdminNewsStatusBadge status={row.status} />,
  },
  {
    key: "tags",
    header: "Tags",
    render: (row) => (
      <div className="flex flex-wrap gap-1">
        {row.tags.length === 0 ? (
          <span className="text-xs text-[var(--text-muted)]">None</span>
        ) : (
          row.tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded border border-[var(--border)] px-2 py-0.5 text-xs text-[var(--text-muted)]"
            >
              {tag.name}
            </span>
          ))
        )}
      </div>
    ),
  },
  {
    key: "publishedAt",
    header: "Published",
    className: "w-40",
    render: (row) => <span className="text-xs text-[var(--text-muted)]">{formatDate(row.publishedAt)}</span>,
  },
  {
    key: "updatedAt",
    header: "Updated",
    className: "w-40",
    render: (row) => <span className="text-xs text-[var(--text-muted)]">{formatDate(row.updatedAt)}</span>,
  },
  {
    key: "actions",
    header: "Actions",
    className: "w-20",
    render: (row) => (
      <Link className="text-xs text-[var(--accent)] hover:underline" href={`/admin/news/${row.id}/edit`}>
        Edit
      </Link>
    ),
  },
];

export function AdminNewsListTable({ rows }: AdminNewsListTableProps) {
  return (
    <DataTable
      columns={columns}
      rows={rows}
      getRowKey={(row) => row.id}
      emptyLabel="No articles found."
    />
  );
}
