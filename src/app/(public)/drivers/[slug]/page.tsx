import { PlaceholderPage } from "@/components/feedback/placeholder-page";

type DriverPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DriverPage({ params }: DriverPageProps) {
  const { slug } = await params;

  return (
    <PlaceholderPage
      title={`Driver: ${slug}`}
      description="Driver profile modules (bio, team, achievements, timeline) are scaffolded."
    />
  );
}
