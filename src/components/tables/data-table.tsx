import type { ReactNode } from "react";

export type DataTableColumn<TRow> = {
  key: string;
  header: string;
  className?: string;
  render: (row: TRow) => ReactNode;
};

type DataTableProps<TRow> = {
  columns: DataTableColumn<TRow>[];
  rows: TRow[];
  getRowKey: (row: TRow) => string;
  emptyLabel?: string;
};

export function DataTable<TRow>({
  columns,
  rows,
  getRowKey,
  emptyLabel = "No data available.",
}: DataTableProps<TRow>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="min-w-full border-collapse">
        <thead className="bg-[var(--surface-2)]">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] ${column.className ?? ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr className="bg-[var(--surface)]">
              <td
                colSpan={columns.length}
                className="px-3 py-4 text-sm text-[var(--text-muted)]"
              >
                {emptyLabel}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={getRowKey(row)}
                className="border-t border-[var(--border)] bg-[var(--surface)]"
              >
                {columns.map((column) => (
                  <td
                    key={`${getRowKey(row)}-${column.key}`}
                    className={`px-3 py-2 text-sm text-[var(--text-primary)] ${column.className ?? ""}`}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
