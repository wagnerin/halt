import type { DriverAchievement } from "../domain";

type AchievementsPanelProps = {
  achievements: DriverAchievement[];
};

export function AchievementsPanel({ achievements }: AchievementsPanelProps) {
  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      <h2 className="text-base font-semibold">Achievements</h2>

      {achievements.length === 0 ? (
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          No achievements added yet.
        </p>
      ) : (
        <ul className="mt-3 space-y-3">
          {achievements.map((achievement) => (
            <li
              key={achievement.id}
              className="rounded border border-[var(--border)] bg-[var(--surface-2)] p-3"
            >
              <p className="text-sm font-medium">
                {achievement.year ? `${achievement.year} - ` : ""}
                {achievement.title}
              </p>
              {achievement.description ? (
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {achievement.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
