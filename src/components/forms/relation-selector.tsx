"use client";

type RelationSelectorItem = {
  id: string;
  label: string;
  helper?: string;
};

type RelationSelectorProps = {
  title: string;
  items: RelationSelectorItem[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  emptyLabel?: string;
};

export function RelationSelector({
  title,
  items,
  selectedIds,
  onToggle,
  emptyLabel = "No options available.",
}: RelationSelectorProps) {
  return (
    <section className="space-y-2 rounded border border-[var(--border)] bg-[var(--surface-2)] p-3">
      <h3 className="text-sm font-medium">{title}</h3>
      {items.length === 0 ? (
        <p className="text-xs text-[var(--text-muted)]">{emptyLabel}</p>
      ) : (
        <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
          {items.map((item) => (
            <label key={item.id} className="flex cursor-pointer gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => onToggle(item.id)}
              />
              <span>
                {item.label}
                {item.helper ? (
                  <span className="ml-1 text-xs text-[var(--text-muted)]">{item.helper}</span>
                ) : null}
              </span>
            </label>
          ))}
        </div>
      )}
    </section>
  );
}
