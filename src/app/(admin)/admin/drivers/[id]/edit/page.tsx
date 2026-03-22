import { PlaceholderPage } from "@/components/feedback/placeholder-page";

type AdminDriverEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminDriverEditPage({
  params,
}: AdminDriverEditPageProps) {
  const { id } = await params;

  return (
    <PlaceholderPage
      title={`Admin / Drivers / ${id}`}
      description="Driver edit workflow is reserved for the admin CRUD phase."
    />
  );
}
