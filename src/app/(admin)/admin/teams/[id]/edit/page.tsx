import { PlaceholderPage } from "@/components/feedback/placeholder-page";

type AdminTeamEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminTeamEditPage({ params }: AdminTeamEditPageProps) {
  const { id } = await params;

  return (
    <PlaceholderPage
      title={`Admin / Teams / ${id}`}
      description="Team edit workflow will be implemented in admin CRUD iteration."
    />
  );
}
