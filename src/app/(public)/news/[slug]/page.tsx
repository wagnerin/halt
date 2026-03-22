import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getNewsArticleBySlug,
  getRelatedNewsForArticle,
} from "@/features/news/domain";
import { ArticleDetail } from "@/features/news/ui";

export const dynamic = "force-dynamic";

type NewsArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      images: article.coverImage ? [article.coverImage] : [],
    },
    alternates: {
      canonical: `/news/${article.slug}`,
    },
  };
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedNews = await getRelatedNewsForArticle(
    article.id,
    article.tags.map((tag) => tag.slug)
  );

  return <ArticleDetail article={article} relatedNews={relatedNews} />;
}
