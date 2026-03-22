import { PlaceholderPage } from "@/components/feedback/placeholder-page";

type TournamentPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TournamentPage({ params }: TournamentPageProps) {
  const { slug } = await params;

  return (
    <PlaceholderPage
      title={`Tournament: ${slug}`}
      description="Tournament details (participants, status, results) are scaffold-only for now."
    />
  );
}
