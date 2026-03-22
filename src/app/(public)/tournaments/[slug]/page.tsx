import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTournamentBySlug } from "@/features/tournaments/domain";
import { TournamentDetailView } from "@/features/tournaments/ui";

export const dynamic = "force-dynamic";

type TournamentPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: TournamentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tournament = await getTournamentBySlug(slug);

  if (!tournament) {
    return {
      title: "Tournament Not Found",
      description: "The requested tournament could not be found.",
    };
  }

  return {
    title: tournament.name,
    description: `${tournament.game} tournament organized by ${tournament.organizer}.`,
    openGraph: {
      title: tournament.name,
      description: `${tournament.game} tournament organized by ${tournament.organizer}.`,
      type: "website",
    },
    alternates: {
      canonical: `/tournaments/${tournament.slug}`,
    },
  };
}

export default async function TournamentPage({ params }: TournamentPageProps) {
  const { slug } = await params;
  const tournament = await getTournamentBySlug(slug);

  if (!tournament) {
    notFound();
  }

  return <TournamentDetailView tournament={tournament} />;
}
