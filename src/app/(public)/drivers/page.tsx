import type { Metadata } from "next";

import { getDriversList } from "@/features/drivers/domain";
import { DriverCard } from "@/features/drivers/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Drivers",
  description: "Browse top sim racing drivers, teams, and career highlights.",
};

export default async function DriversListPage() {
  const drivers = await getDriversList();

  return (
    <section className="space-y-5">
      <header className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
        <h1 className="text-xl font-semibold">Drivers</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Track profiles, achievements, and active team affiliations.
        </p>
      </header>

      {drivers.length === 0 ? (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--text-muted)]">
          No drivers found. Run the Prisma seed script in development.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {drivers.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
        </div>
      )}
    </section>
  );
}
