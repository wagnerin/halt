import type { NewsArticleRecord } from "./news.public.types";

export const MOCK_NEWS_ARTICLES: NewsArticleRecord[] = [
  {
    id: "mock-news-1",
    slug: "voss-controls-chaotic-silverstone-finish",
    title: "Voss controls chaotic Silverstone finish to secure opener",
    excerpt:
      "A late weather swing reshaped final strategy calls, but Apex Simworks kept execution clean.",
    content: `Lukas "Voss" Voss converted front-running pace into a race win at Silverstone after mixed-weather pressure in the final phase.

Teams split on tire timing with less than 25 minutes to go. Apex Simworks held track position by extending one stint and avoided pit-lane congestion.

The result moves Voss to the top of the early endurance discussion and sets up a direct rematch next round.`,
    coverImage: "/images/news/sim-grid-r1.jpg",
    publishedAt: new Date("2026-03-15T12:30:00.000Z"),
    authorName: "Editor User",
    tags: [
      { slug: "iracing", name: "iRacing" },
      { slug: "analysis", name: "Analysis" },
      { slug: "esports", name: "Esports" },
    ],
    relatedDrivers: [
      { slug: "lukas-voss", nickname: "Voss" },
      { slug: "diego-romero", nickname: "Romero" },
    ],
    relatedTeams: [
      { slug: "apex-simworks", name: "Apex Simworks" },
      { slug: "velocity-esports", name: "Velocity Esports" },
    ],
    relatedTournaments: [
      {
        slug: "sim-grid-endurance-series-2026-r1",
        name: "Sim Grid Endurance Series 2026 - Round 1",
      },
    ],
  },
  {
    id: "mock-news-2",
    slug: "odyssey-adjusts-lineup-before-gt-masters-stage-1",
    title: "Odyssey adjusts lineup before GT Masters Stage 1",
    excerpt:
      "Mercier shifts into lead-car race duties while Fabre focuses on qualifying and strategy prep.",
    content: `Odyssey Performance confirmed a lineup adjustment ahead of GT Masters Stage 1 to improve race-one conversion.

The team expects stronger launch phases and cleaner opening-lap positioning after recent review sessions.`,
    coverImage: "/images/news/odyssey-roster.jpg",
    publishedAt: new Date("2026-03-21T09:00:00.000Z"),
    authorName: "Editor User",
    tags: [
      { slug: "acc", name: "ACC" },
      { slug: "transfer", name: "Transfer" },
    ],
    relatedDrivers: [
      { slug: "raoul-mercier", nickname: "Mercier" },
      { slug: "enzo-fabre", nickname: "Fabre" },
    ],
    relatedTeams: [{ slug: "odyssey-performance", name: "Odyssey Performance" }],
    relatedTournaments: [
      {
        slug: "virtual-gt-masters-2026-stage-1",
        name: "Virtual GT Masters 2026 - Stage 1",
      },
    ],
  },
  {
    id: "mock-news-3",
    slug: "continental-sim-cup-format-explained",
    title: "Continental Sim Cup 2026 format explained",
    excerpt:
      "A quick breakdown of phase structure, seeding logic, and point multipliers in the final stage.",
    content: `The Continental Sim Cup introduces a three-phase structure designed to reward consistency before finals week volatility.

Organizers say the revised points model keeps title paths open while preserving value for early-stage performance.`,
    coverImage: "/images/news/continental-cup-format.jpg",
    publishedAt: new Date("2026-03-20T15:00:00.000Z"),
    authorName: "Admin User",
    tags: [
      { slug: "featured", name: "Featured" },
      { slug: "analysis", name: "Analysis" },
    ],
    relatedDrivers: [
      { slug: "emma-hawkins", nickname: "Hawk" },
      { slug: "tommaso-rinaldi", nickname: "Rinaldi" },
    ],
    relatedTeams: [
      { slug: "velocity-esports", name: "Velocity Esports" },
      { slug: "apex-simworks", name: "Apex Simworks" },
    ],
    relatedTournaments: [
      { slug: "continental-sim-cup-2026", name: "Continental Sim Cup 2026" },
    ],
  },
  {
    id: "mock-news-4",
    slug: "northline-stint-variance-data-dive",
    title: "Northline stint-variance data dive: where consistency wins",
    excerpt:
      "Northline’s medium-fuel variance remains among the best in split, especially in late-race windows.",
    content: `Northline Racing continues to gain time in final-hour segments through reduced lap-time spikes and cleaner traffic management.

Internal telemetry comparisons show fewer outlier laps than direct points rivals in similar fuel windows.`,
    coverImage: "/images/news/northline-analysis.jpg",
    publishedAt: new Date("2026-03-19T18:40:00.000Z"),
    authorName: "Editor User",
    tags: [
      { slug: "analysis", name: "Analysis" },
      { slug: "esports", name: "Esports" },
    ],
    relatedDrivers: [
      { slug: "noah-berg", nickname: "Berg" },
      { slug: "mia-keller", nickname: "Keller" },
    ],
    relatedTeams: [{ slug: "northline-racing", name: "Northline Racing" }],
    relatedTournaments: [
      {
        slug: "sim-grid-endurance-series-2026-r1",
        name: "Sim Grid Endurance Series 2026 - Round 1",
      },
    ],
  },
];
