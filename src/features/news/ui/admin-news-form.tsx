"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";

import type { AdminNewsEditArticle, AdminNewsFormOptions } from "../domain";

type AdminNewsFormProps = {
  mode: "create" | "edit";
  options: AdminNewsFormOptions;
  initialArticle?: AdminNewsEditArticle;
};

type StatusValue = "DRAFT" | "PUBLISHED";

type FormState = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  status: StatusValue;
  tagIds: string[];
  relatedDriverIds: string[];
  relatedTeamIds: string[];
  relatedTournamentIds: string[];
};

function buildInitialState(initialArticle?: AdminNewsEditArticle): FormState {
  if (!initialArticle) {
    return {
      slug: "",
      title: "",
      excerpt: "",
      content: "",
      coverImage: "",
      status: "DRAFT",
      tagIds: [],
      relatedDriverIds: [],
      relatedTeamIds: [],
      relatedTournamentIds: [],
    };
  }

  return {
    slug: initialArticle.slug,
    title: initialArticle.title,
    excerpt: initialArticle.excerpt,
    content: initialArticle.content,
    coverImage: initialArticle.coverImage ?? "",
    status: initialArticle.status,
    tagIds: initialArticle.tagIds,
    relatedDriverIds: initialArticle.relatedDriverIds,
    relatedTeamIds: initialArticle.relatedTeamIds,
    relatedTournamentIds: initialArticle.relatedTournamentIds,
  };
}

function toggleSelection(values: string[], id: string): string[] {
  if (values.includes(id)) {
    return values.filter((value) => value !== id);
  }

  return [...values, id];
}

function RelationSelector(props: {
  title: string;
  items: Array<{ id: string; label: string; helper?: string }>;
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <section className="space-y-2 rounded border border-[var(--border)] bg-[var(--surface-2)] p-3">
      <h3 className="text-sm font-medium">{props.title}</h3>
      {props.items.length === 0 ? (
        <p className="text-xs text-[var(--text-muted)]">No options available.</p>
      ) : (
        <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
          {props.items.map((item) => (
            <label key={item.id} className="flex cursor-pointer gap-2 text-sm">
              <input
                type="checkbox"
                checked={props.selectedIds.includes(item.id)}
                onChange={() => props.onToggle(item.id)}
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

export function AdminNewsForm({ mode, options, initialArticle }: AdminNewsFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => buildInitialState(initialArticle));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const endpoint = useMemo(() => {
    if (mode === "create") {
      return "/api/admin/news";
    }

    return `/api/admin/news/${initialArticle?.id ?? ""}`;
  }, [initialArticle?.id, mode]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          slug: form.slug,
          title: form.title,
          excerpt: form.excerpt,
          content: form.content,
          coverImage: form.coverImage,
          status: form.status,
          tagIds: form.tagIds,
          relatedDriverIds: form.relatedDriverIds,
          relatedTeamIds: form.relatedTeamIds,
          relatedTournamentIds: form.relatedTournamentIds,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { message?: string }
          | null;
        setErrorMessage(payload?.message ?? "Request failed.");
        return;
      }

      router.push("/admin/news");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <section className="grid gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
        <label className="space-y-1 text-sm">
          <span className="text-[var(--text-muted)]">Title</span>
          <input
            className="w-full rounded border border-[var(--border)] bg-[var(--background)] px-3 py-2"
            value={form.title}
            onChange={(event) => setForm((state) => ({ ...state, title: event.target.value }))}
            required
          />
        </label>

        <label className="space-y-1 text-sm">
          <span className="text-[var(--text-muted)]">Slug</span>
          <input
            className="w-full rounded border border-[var(--border)] bg-[var(--background)] px-3 py-2"
            value={form.slug}
            onChange={(event) => setForm((state) => ({ ...state, slug: event.target.value }))}
            required
          />
        </label>

        <label className="space-y-1 text-sm">
          <span className="text-[var(--text-muted)]">Excerpt</span>
          <textarea
            className="min-h-24 w-full rounded border border-[var(--border)] bg-[var(--background)] px-3 py-2"
            value={form.excerpt}
            onChange={(event) =>
              setForm((state) => ({ ...state, excerpt: event.target.value }))
            }
            required
          />
        </label>

        <label className="space-y-1 text-sm">
          <span className="text-[var(--text-muted)]">Content</span>
          <textarea
            className="min-h-48 w-full rounded border border-[var(--border)] bg-[var(--background)] px-3 py-2"
            value={form.content}
            onChange={(event) =>
              setForm((state) => ({ ...state, content: event.target.value }))
            }
            required
          />
        </label>

        <label className="space-y-1 text-sm">
          <span className="text-[var(--text-muted)]">Cover image URL</span>
          <input
            className="w-full rounded border border-[var(--border)] bg-[var(--background)] px-3 py-2"
            value={form.coverImage}
            onChange={(event) =>
              setForm((state) => ({ ...state, coverImage: event.target.value }))
            }
            placeholder="https://..."
          />
        </label>

        <label className="space-y-1 text-sm">
          <span className="text-[var(--text-muted)]">Status</span>
          <select
            className="w-full rounded border border-[var(--border)] bg-[var(--background)] px-3 py-2"
            value={form.status}
            onChange={(event) =>
              setForm((state) => ({ ...state, status: event.target.value as StatusValue }))
            }
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </label>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <RelationSelector
          title="Tags"
          items={options.tags.map((tag) => ({
            id: tag.id,
            label: tag.name,
            helper: `/${tag.slug}`,
          }))}
          selectedIds={form.tagIds}
          onToggle={(id) =>
            setForm((state) => ({ ...state, tagIds: toggleSelection(state.tagIds, id) }))
          }
        />
        <RelationSelector
          title="Related drivers"
          items={options.drivers.map((driver) => ({
            id: driver.id,
            label: driver.nickname,
            helper: `/${driver.slug}`,
          }))}
          selectedIds={form.relatedDriverIds}
          onToggle={(id) =>
            setForm((state) => ({
              ...state,
              relatedDriverIds: toggleSelection(state.relatedDriverIds, id),
            }))
          }
        />
        <RelationSelector
          title="Related teams"
          items={options.teams.map((team) => ({
            id: team.id,
            label: team.name,
            helper: `/${team.slug}`,
          }))}
          selectedIds={form.relatedTeamIds}
          onToggle={(id) =>
            setForm((state) => ({
              ...state,
              relatedTeamIds: toggleSelection(state.relatedTeamIds, id),
            }))
          }
        />
        <RelationSelector
          title="Related tournaments"
          items={options.tournaments.map((tournament) => ({
            id: tournament.id,
            label: tournament.name,
            helper: `/${tournament.slug}`,
          }))}
          selectedIds={form.relatedTournamentIds}
          onToggle={(id) =>
            setForm((state) => ({
              ...state,
              relatedTournamentIds: toggleSelection(state.relatedTournamentIds, id),
            }))
          }
        />
      </section>

      {errorMessage ? (
        <p className="rounded border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium hover:border-[var(--accent)] disabled:opacity-50"
      >
        {isSubmitting
          ? mode === "create"
            ? "Creating..."
            : "Saving..."
          : mode === "create"
            ? "Create article"
            : "Save changes"}
      </button>
    </form>
  );
}
