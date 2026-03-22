import { PlaceholderPage } from "@/components/feedback/placeholder-page";

type NewsArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;

  return (
    <PlaceholderPage
      title={`Article: ${slug}`}
      description="Article rendering and related-entities blocks are scaffolded but not implemented."
    />
  );
}
