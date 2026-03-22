import { PlaceholderPage } from "@/components/feedback/placeholder-page";

type ResultDetailPageProps = {
  params: Promise<{ tournamentSlug: string; resultId: string }>;
};

export default async function ResultDetailPage({ params }: ResultDetailPageProps) {
  const { tournamentSlug, resultId } = await params;

  return (
    <PlaceholderPage
      title={`Result: ${tournamentSlug} / ${resultId}`}
      description="Session standings and stats rendering will be added in the feature phase."
    />
  );
}
