import { PlaceholderPage } from "@/components/feedback/placeholder-page";

type AdminNewsEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminNewsEditPage({ params }: AdminNewsEditPageProps) {
  const { id } = await params;

  return (
    <PlaceholderPage
      title={`Admin / News / ${id}`}
      description="Article edit workflow will be implemented in a dedicated admin iteration."
    />
  );
}
