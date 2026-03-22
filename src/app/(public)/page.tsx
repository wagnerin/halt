import Link from "next/link";
import type { Metadata } from "next";

import {
  HeadlineStoryCard,
  HomepagePlaceholderBlock,
  NewsFeedItemCard,
} from "@/components/cards";
import { HomepageSection } from "@/components/layout";
import { getHomepageNewsData } from "@/features/news/domain";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home",
  description: "Daily destination for sim racing editorial coverage and competitive updates.",
};

function formatPublishedDate(value: Date | null): string {
  if (!value) {
    return "Unscheduled";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(value);
}

export default async function HomePage() {
  const { headline, latestFeed } = await getHomepageNewsData();

  return (
    <div className="space-y-3">
      <HomepageSection
        title="Headline Story"
        subtitle="Primary editorial slot"
        action={
          <Link className="font-medium text-[var(--accent)] hover:underline" href="/news">
            View all news →
          </Link>
        }
      >
        {headline ? (
          <HeadlineStoryCard
            slug={headline.slug}
            title={headline.title}
            excerpt={headline.excerpt}
            coverImage={headline.coverImage}
            publishedLabel={formatPublishedDate(headline.publishedAt)}
            authorName={headline.authorName}
            tags={headline.tags}
          />
        ) : (
          <p className="text-xs text-[var(--text-muted)]">No headline article available.</p>
        )}
      </HomepageSection>

      <div className="grid gap-3 xl:grid-cols-[2.15fr_1fr]">
        <HomepageSection
          title="Latest News Feed"
          subtitle="Fast scan editorial timeline"
          action={
            <Link className="font-medium text-[var(--accent)] hover:underline" href="/news">
              Open feed →
            </Link>
          }
        >
          {latestFeed.length === 0 ? (
            <p className="text-xs text-[var(--text-muted)]">No additional stories available.</p>
          ) : (
            <div className="grid gap-1.5 md:grid-cols-2">
              {latestFeed.map((article) => (
                <NewsFeedItemCard
                  key={article.id}
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  publishedLabel={formatPublishedDate(article.publishedAt)}
                />
              ))}
            </div>
          )}
        </HomepageSection>

        <div className="space-y-3">
          <HomepageSection title="Featured Tournament" subtitle="Pinned event slot">
            <HomepagePlaceholderBlock
              title="Tournament module integration pending"
              description="Featured tournament cards will appear here after homepage cross-feature orchestration is implemented."
              items={["Status chip", "Participants summary", "Latest session link"]}
            />
          </HomepageSection>

          <HomepageSection title="Top Drivers" subtitle="Weekly ranking slot">
            <HomepagePlaceholderBlock
              title="Engagement ranking pending"
              description="Top 10 drivers block will be connected after ranking publish flow is implemented."
              items={["#1 Voss", "#2 Silva", "#3 Hawk"]}
            />
          </HomepageSection>

          <HomepageSection title="Driver of the Week" subtitle="Editorial spotlight">
            <HomepagePlaceholderBlock
              title="Driver spotlight pending"
              description="Driver of the Week card will render from curated engagement records."
              items={["Current placeholder: Lukas 'Voss' Voss"]}
            />
          </HomepageSection>
        </div>
      </div>
    </div>
  );
}
