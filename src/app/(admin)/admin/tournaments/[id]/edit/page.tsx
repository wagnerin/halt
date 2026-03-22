import { PlaceholderPage } from "@/components/feedback/placeholder-page";

type AdminTournamentEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminTournamentEditPage({
  params,
}: AdminTournamentEditPageProps) {
  const { id } = await params;

  return (
    <PlaceholderPage
      title={`Admin / Tournaments / ${id}`}
      description="Tournament edit workflow will be implemented later."
    />
  );
}
