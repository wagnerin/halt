import { PlaceholderPage } from "@/components/feedback/placeholder-page";

type AdminResultEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminResultEditPage({
  params,
}: AdminResultEditPageProps) {
  const { id } = await params;

  return (
    <PlaceholderPage
      title={`Admin / Results / ${id}`}
      description="Result edit workflow will be added in a dedicated admin iteration."
    />
  );
}
