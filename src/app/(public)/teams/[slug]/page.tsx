import { PlaceholderPage } from "@/components/feedback/placeholder-page";

type TeamPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = await params;

  return (
    <PlaceholderPage
      title={`Team: ${slug}`}
      description="Team profile and roster UI is intentionally deferred."
    />
  );
}
