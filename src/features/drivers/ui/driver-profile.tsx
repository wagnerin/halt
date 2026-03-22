import Link from "next/link";

import type { DriverProfile } from "../domain";
import { AchievementsPanel } from "./achievements-panel";
import { CareerTimelineBlock } from "./career-timeline-block";
import { RelatedArticlesSection } from "./related-articles-section";

type DriverProfileProps = {
  driver: DriverProfile;
};

function formatPlatformLabel(platform: string): string {
  return platform
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function DriverProfileView({ driver }: DriverProfileProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs text-[var(--text-muted)]">{driver.country}</p>
            <h1 className="mt-1 text-2xl font-semibold">{driver.nickname}</h1>
            {driver.realName ? (
              <p className="mt-1 text-sm text-[var(--text-muted)]">{driver.realName}</p>
            ) : null}
          </div>
          <div className="text-sm">
            <span className="text-[var(--text-muted)]">Team: </span>
            {driver.team ? (
              <Link
                href={`/teams/${driver.team.slug}`}
                className="font-medium text-[var(--text-primary)] hover:text-[var(--accent)]"
              >
                {driver.team.name}
              </Link>
            ) : (
              <span className="text-[var(--text-muted)]">Free Agent</span>
            )}
          </div>
        </div>

        <p className="mt-4 text-sm text-[var(--text-muted)]">{driver.bio}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {driver.platforms.map((platform) => (
            <span
              key={platform}
              className="rounded border border-[var(--border)] px-2 py-1 text-xs text-[var(--text-muted)]"
            >
              {formatPlatformLabel(platform)}
            </span>
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <AchievementsPanel achievements={driver.achievements} />
        <CareerTimelineBlock entries={driver.timelineEntries} />
      </div>

      <RelatedArticlesSection articles={driver.relatedArticles} />

      <Link className="inline-block text-sm text-[var(--accent)]" href="/drivers">
        ← Back to all drivers
      </Link>
    </div>
  );
}
