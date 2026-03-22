import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getRaceResultSessionDetail } from "@/features/results/domain";
import { ResultSessionDetail } from "@/features/results/ui";

export const dynamic = "force-dynamic";

type ResultDetailPageProps = {
  params: Promise<{ tournamentSlug: string; resultId: string }>;
};

export async function generateMetadata({
  params,
}: ResultDetailPageProps): Promise<Metadata> {
  const routeParams = await params;
  const session = await getRaceResultSessionDetail(routeParams);

  if (!session) {
    return {
      title: "Result Not Found",
      description: "The requested race session result could not be found.",
    };
  }

  return (
    {
      title: `${session.eventName} - ${session.sessionType}`,
      description: `${session.tournament.name} ${session.sessionType} session standings and stats.`,
      openGraph: {
        title: `${session.eventName} - ${session.sessionType}`,
        description: `${session.tournament.name} ${session.sessionType} session standings and stats.`,
        type: "article",
      },
      alternates: {
        canonical: `/results/${session.tournament.slug}/${session.id}`,
      },
    }
  );
}

export default async function ResultDetailPage({ params }: ResultDetailPageProps) {
  const routeParams = await params;
  const session = await getRaceResultSessionDetail(routeParams);

  if (!session) {
    notFound();
  }

  return <ResultSessionDetail session={session} />;
}
