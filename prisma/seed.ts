import {
  CompetitorType,
  Platform,
  PrismaClient,
  PublishStatus,
  Role,
  SessionType,
  TournamentStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

function utcDate(dateString: string): Date {
  return new Date(`${dateString}T00:00:00.000Z`);
}

async function resetDatabase() {
  await prisma.follow.deleteMany();
  await prisma.raceStanding.deleteMany();
  await prisma.raceResult.deleteMany();
  await prisma.weeklyTopDriverEntry.deleteMany();
  await prisma.weeklyTopDriverList.deleteMany();
  await prisma.driverOfWeek.deleteMany();
  await prisma.featuredTournamentSlot.deleteMany();
  await prisma.newsArticle.deleteMany();
  await prisma.driverAchievement.deleteMany();
  await prisma.driverCareerTimelineEntry.deleteMany();
  await prisma.tournament.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.team.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  await resetDatabase();

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@simmedia.gg",
      name: "Admin User",
      role: Role.ADMIN,
    },
  });

  const editorUser = await prisma.user.create({
    data: {
      email: "editor@simmedia.gg",
      name: "Editor User",
      role: Role.EDITOR,
    },
  });

  const viewerUser = await prisma.user.create({
    data: {
      email: "viewer@simmedia.gg",
      name: "Viewer User",
      role: Role.VIEWER,
    },
  });

  const tags = await Promise.all(
    [
      { slug: "iracing", name: "iRacing" },
      { slug: "acc", name: "ACC" },
      { slug: "esports", name: "Esports" },
      { slug: "analysis", name: "Analysis" },
      { slug: "transfer", name: "Transfer" },
      { slug: "featured", name: "Featured" },
    ].map((tag) =>
      prisma.tag.create({
        data: tag,
      })
    )
  );

  const tagBySlug = Object.fromEntries(tags.map((tag) => [tag.slug, tag]));

  const teams = await Promise.all(
    [
      {
        slug: "velocity-esports",
        name: "Velocity Esports",
        country: "United Kingdom",
        logo: "/images/teams/velocity.png",
        description:
          "A data-driven GT and prototype organization known for endurance consistency.",
      },
      {
        slug: "apex-simworks",
        name: "Apex Simworks",
        country: "Germany",
        logo: "/images/teams/apex.png",
        description:
          "Technical powerhouse focused on setup innovation and qualifying pace.",
      },
      {
        slug: "northline-racing",
        name: "Northline Racing",
        country: "Sweden",
        logo: "/images/teams/northline.png",
        description:
          "Disciplined roster with strong wet-weather and multiclass race execution.",
      },
      {
        slug: "odyssey-performance",
        name: "Odyssey Performance",
        country: "France",
        logo: "/images/teams/odyssey.png",
        description:
          "Young lineup with aggressive strategy calls and rapid driver development.",
      },
    ].map((team) =>
      prisma.team.create({
        data: team,
      })
    )
  );

  const teamBySlug = Object.fromEntries(teams.map((team) => [team.slug, team]));

  const drivers = await Promise.all(
    [
      {
        slug: "lukas-voss",
        nickname: "Voss",
        realName: "Lukas Voss",
        country: "Germany",
        avatar: "/images/drivers/lukas-voss.png",
        bio: "Precision-focused endurance specialist with elite tire management.",
        teamSlug: "apex-simworks",
        platforms: [Platform.IRACING, Platform.ACC],
        achievements: [
          { title: "GT Sprint Masters Champion", year: 2025 },
          { title: "Nordic Endurance 6H Winner", year: 2024 },
        ],
        timeline: [
          {
            periodStart: utcDate("2023-01-01"),
            periodEnd: utcDate("2024-12-31"),
            label: "Northline Racing",
            description: "Became team lead and secured first major endurance title.",
          },
          {
            periodStart: utcDate("2025-01-01"),
            periodEnd: null,
            label: "Apex Simworks",
            description: "Signed as flagship GT driver for international circuits.",
          },
        ],
      },
      {
        slug: "marco-silva",
        nickname: "Silva",
        realName: "Marco Silva",
        country: "Portugal",
        avatar: "/images/drivers/marco-silva.png",
        bio: "Consistent all-rounder with strong racecraft in traffic-heavy sessions.",
        teamSlug: "velocity-esports",
        platforms: [Platform.IRACING, Platform.RFACTOR2],
        achievements: [{ title: "Sim Endurance Cup Winner", year: 2025 }],
        timeline: [
          {
            periodStart: utcDate("2024-01-01"),
            periodEnd: null,
            label: "Velocity Esports",
            description: "Anchored the team in weekly endurance league finals.",
          },
        ],
      },
      {
        slug: "noah-berg",
        nickname: "Berg",
        realName: "Noah Berg",
        country: "Sweden",
        avatar: "/images/drivers/noah-berg.png",
        bio: "Calm under pressure and known for late-race overtakes.",
        teamSlug: "northline-racing",
        platforms: [Platform.ACC, Platform.LE_MANS_ULTIMATE],
        achievements: [{ title: "Scandinavian GT Cup Champion", year: 2024 }],
        timeline: [
          {
            periodStart: utcDate("2022-01-01"),
            periodEnd: null,
            label: "Northline Racing",
            description: "Rose from academy to core endurance roster.",
          },
        ],
      },
      {
        slug: "enzo-fabre",
        nickname: "Fabre",
        realName: "Enzo Fabre",
        country: "France",
        avatar: "/images/drivers/enzo-fabre.png",
        bio: "Qualifying specialist with high one-lap pace.",
        teamSlug: "odyssey-performance",
        platforms: [Platform.ACC, Platform.F1_24],
        achievements: [{ title: "Continental Sprint Pole Award", year: 2025 }],
        timeline: [
          {
            periodStart: utcDate("2025-01-01"),
            periodEnd: null,
            label: "Odyssey Performance",
            description: "Joined as lead qualifier and strategy advisor.",
          },
        ],
      },
      {
        slug: "emma-hawkins",
        nickname: "Hawk",
        realName: "Emma Hawkins",
        country: "United Kingdom",
        avatar: "/images/drivers/emma-hawkins.png",
        bio: "Wet-weather expert and durable endurance closer.",
        teamSlug: "velocity-esports",
        platforms: [Platform.IRACING, Platform.AUTOMOBILISTA2],
        achievements: [{ title: "Rain Masters Invitational Winner", year: 2025 }],
        timeline: [
          {
            periodStart: utcDate("2023-06-01"),
            periodEnd: null,
            label: "Velocity Esports",
            description: "Expanded from sprint leagues into endurance headliner.",
          },
        ],
      },
      {
        slug: "diego-romero",
        nickname: "Romero",
        realName: "Diego Romero",
        country: "Spain",
        avatar: "/images/drivers/diego-romero.png",
        bio: "Efficient setup communicator with stable long-run pace.",
        teamSlug: "apex-simworks",
        platforms: [Platform.IRACING, Platform.LE_MANS_ULTIMATE],
        achievements: [{ title: "Prototype Series Runner-Up", year: 2025 }],
        timeline: [
          {
            periodStart: utcDate("2024-03-01"),
            periodEnd: null,
            label: "Apex Simworks",
            description: "Joined to strengthen multiclass lineup depth.",
          },
        ],
      },
      {
        slug: "mia-keller",
        nickname: "Keller",
        realName: "Mia Keller",
        country: "Germany",
        avatar: "/images/drivers/mia-keller.png",
        bio: "Rapid learner with impressive rookie-season consistency.",
        teamSlug: "northline-racing",
        platforms: [Platform.ACC, Platform.AUTOMOBILISTA2],
        achievements: [{ title: "Rookie of the Season", year: 2025 }],
        timeline: [
          {
            periodStart: utcDate("2025-01-01"),
            periodEnd: null,
            label: "Northline Racing",
            description: "Promoted from junior squad after strong trials.",
          },
        ],
      },
      {
        slug: "raoul-mercier",
        nickname: "Mercier",
        realName: "Raoul Mercier",
        country: "France",
        avatar: "/images/drivers/raoul-mercier.png",
        bio: "Aggressive attacker with strong sprint race starts.",
        teamSlug: "odyssey-performance",
        platforms: [Platform.ACC, Platform.RFACTOR2],
        achievements: [{ title: "European Sprint Race Winner", year: 2024 }],
        timeline: [
          {
            periodStart: utcDate("2023-02-01"),
            periodEnd: null,
            label: "Odyssey Performance",
            description: "Core sprint points scorer and overtaking specialist.",
          },
        ],
      },
      {
        slug: "jake-foster",
        nickname: "Foster",
        realName: "Jake Foster",
        country: "United States",
        avatar: "/images/drivers/jake-foster.png",
        bio: "Methodical strategist with excellent pit-cycle execution.",
        teamSlug: "velocity-esports",
        platforms: [Platform.IRACING, Platform.RFACTOR2],
        achievements: [{ title: "NA Endurance Finals Winner", year: 2024 }],
        timeline: [
          {
            periodStart: utcDate("2022-05-01"),
            periodEnd: null,
            label: "Velocity Esports",
            description: "Transitioned from team engineer to active race lineup.",
          },
        ],
      },
      {
        slug: "tommaso-rinaldi",
        nickname: "Rinaldi",
        realName: "Tommaso Rinaldi",
        country: "Italy",
        avatar: "/images/drivers/tommaso-rinaldi.png",
        bio: "Balanced GT/prototype driver with high stint consistency.",
        teamSlug: "apex-simworks",
        platforms: [Platform.IRACING, Platform.LE_MANS_ULTIMATE],
        achievements: [{ title: "Hybrid Endurance Classic Winner", year: 2025 }],
        timeline: [
          {
            periodStart: utcDate("2024-07-01"),
            periodEnd: null,
            label: "Apex Simworks",
            description: "Signed after breakout performance in invitational races.",
          },
        ],
      },
    ].map((driver) =>
      prisma.driver.create({
        data: {
          slug: driver.slug,
          nickname: driver.nickname,
          realName: driver.realName,
          country: driver.country,
          avatar: driver.avatar,
          bio: driver.bio,
          team: {
            connect: {
              id: teamBySlug[driver.teamSlug].id,
            },
          },
          platforms: driver.platforms,
          achievements: {
            create: driver.achievements,
          },
          timelineEntries: {
            create: driver.timeline,
          },
        },
      })
    )
  );

  const driverBySlug = Object.fromEntries(
    drivers.map((driver) => [driver.slug, driver])
  );

  const tournaments = await Promise.all(
    [
      {
        slug: "sim-grid-endurance-series-2026-r1",
        name: "Sim Grid Endurance Series 2026 - Round 1",
        game: "iRacing",
        organizer: "Sim Grid",
        prizePool: 25000,
        startDate: utcDate("2026-03-14"),
        endDate: utcDate("2026-03-15"),
        status: TournamentStatus.COMPLETED,
        teamParticipants: [
          "velocity-esports",
          "apex-simworks",
          "northline-racing",
          "odyssey-performance",
        ],
        driverParticipants: [
          "lukas-voss",
          "marco-silva",
          "noah-berg",
          "enzo-fabre",
          "emma-hawkins",
          "diego-romero",
          "mia-keller",
          "raoul-mercier",
          "jake-foster",
          "tommaso-rinaldi",
        ],
      },
      {
        slug: "virtual-gt-masters-2026-stage-1",
        name: "Virtual GT Masters 2026 - Stage 1",
        game: "ACC",
        organizer: "VGT Org",
        prizePool: 12000,
        startDate: utcDate("2026-03-22"),
        endDate: utcDate("2026-03-23"),
        status: TournamentStatus.LIVE,
        teamParticipants: ["apex-simworks", "northline-racing", "odyssey-performance"],
        driverParticipants: [
          "lukas-voss",
          "noah-berg",
          "enzo-fabre",
          "mia-keller",
          "raoul-mercier",
          "tommaso-rinaldi",
        ],
      },
      {
        slug: "continental-sim-cup-2026",
        name: "Continental Sim Cup 2026",
        game: "Le Mans Ultimate",
        organizer: "Continental Esports Federation",
        prizePool: 40000,
        startDate: utcDate("2026-04-05"),
        endDate: utcDate("2026-04-20"),
        status: TournamentStatus.UPCOMING,
        teamParticipants: ["velocity-esports", "apex-simworks", "northline-racing"],
        driverParticipants: [
          "lukas-voss",
          "marco-silva",
          "emma-hawkins",
          "diego-romero",
          "jake-foster",
          "tommaso-rinaldi",
        ],
      },
    ].map((tournament) =>
      prisma.tournament.create({
        data: {
          slug: tournament.slug,
          name: tournament.name,
          game: tournament.game,
          organizer: tournament.organizer,
          prizePool: tournament.prizePool,
          startDate: tournament.startDate,
          endDate: tournament.endDate,
          status: tournament.status,
          participantsTeams: {
            connect: tournament.teamParticipants.map((teamSlug) => ({
              id: teamBySlug[teamSlug].id,
            })),
          },
          participantsDrivers: {
            connect: tournament.driverParticipants.map((driverSlug) => ({
              id: driverBySlug[driverSlug].id,
            })),
          },
        },
      })
    )
  );

  const tournamentBySlug = Object.fromEntries(
    tournaments.map((tournament) => [tournament.slug, tournament])
  );

  await Promise.all(
    [
      {
        slug: "voss-wins-rain-chaos-at-sim-grid-r1",
        title: "Voss wins rain chaos at Sim Grid Endurance Series opener",
        excerpt:
          "A late weather swing reshuffled strategy, but Apex Simworks converted cleanly under pressure.",
        content: `Lukas "Voss" Voss delivered a composed final stint to secure victory at Round 1 of the Sim Grid Endurance Series.

Heavy rain arrived 20 minutes from the end, forcing the field into mixed tire calls. Apex Simworks stayed out one lap longer than its direct rivals, gaining track position and preserving pit lane margin.

The result places Voss at the top of the early endurance power rankings and sets up a high-stakes rematch next week.`,
        coverImage: "/images/news/sim-grid-r1.jpg",
        status: PublishStatus.PUBLISHED,
        publishedAt: new Date("2026-03-15T12:30:00.000Z"),
        authorId: editorUser.id,
        tagSlugs: ["iracing", "esports", "analysis"],
        relatedDriverSlugs: ["lukas-voss", "diego-romero"],
        relatedTeamSlugs: ["apex-simworks", "velocity-esports"],
        relatedTournamentSlugs: ["sim-grid-endurance-series-2026-r1"],
        featuredOnHomepage: true,
      },
      {
        slug: "odyssey-roster-shift-ahead-of-stage-1",
        title: "Odyssey Performance confirms roster shift before GT Masters Stage 1",
        excerpt:
          "Mercier moves into the lead car while Fabre focuses on qualifying duties and strategy prep.",
        content: `Odyssey Performance has adjusted its active lineup before the opening races of Virtual GT Masters Stage 1.

The team says the move is designed to maximize sprint starts and improve race-one conversion, where it struggled in the last split.`,
        coverImage: "/images/news/odyssey-roster.jpg",
        status: PublishStatus.PUBLISHED,
        publishedAt: new Date("2026-03-21T09:00:00.000Z"),
        authorId: editorUser.id,
        tagSlugs: ["acc", "transfer"],
        relatedDriverSlugs: ["raoul-mercier", "enzo-fabre"],
        relatedTeamSlugs: ["odyssey-performance"],
        relatedTournamentSlugs: ["virtual-gt-masters-2026-stage-1"],
        featuredOnHomepage: false,
      },
      {
        slug: "continental-sim-cup-format-explained",
        title: "Continental Sim Cup 2026 format explained",
        excerpt:
          "Everything to know about group stages, finals seeding, and points multipliers.",
        content: `The Continental Sim Cup 2026 introduces a three-phase format with escalating points multipliers in the final week.

Organizers expect the new format to reward consistency while still allowing comeback paths for aggressive teams.`,
        coverImage: "/images/news/continental-cup-format.jpg",
        status: PublishStatus.PUBLISHED,
        publishedAt: new Date("2026-03-20T15:00:00.000Z"),
        authorId: adminUser.id,
        tagSlugs: ["featured", "analysis"],
        relatedDriverSlugs: ["emma-hawkins", "tommaso-rinaldi"],
        relatedTeamSlugs: ["velocity-esports", "apex-simworks"],
        relatedTournamentSlugs: ["continental-sim-cup-2026"],
        featuredOnHomepage: true,
      },
      {
        slug: "northline-data-dive-on-stint-consistency",
        title: "Northline Racing data dive: where stint consistency wins races",
        excerpt:
          "A look at lap-time variance and why Northline keeps gaining in final-hour windows.",
        content: `Northline Racing has become one of the most reliable late-race teams in this split.

Telemetry snapshots show fewer outlier laps in medium-fuel stints compared to direct title rivals.`,
        coverImage: "/images/news/northline-analysis.jpg",
        status: PublishStatus.PUBLISHED,
        publishedAt: new Date("2026-03-19T18:40:00.000Z"),
        authorId: editorUser.id,
        tagSlugs: ["analysis", "esports"],
        relatedDriverSlugs: ["noah-berg", "mia-keller"],
        relatedTeamSlugs: ["northline-racing"],
        relatedTournamentSlugs: ["sim-grid-endurance-series-2026-r1"],
        featuredOnHomepage: false,
      },
      {
        slug: "week-ahead-gt-masters-stage-1-preview",
        title: "Week ahead: GT Masters Stage 1 preview",
        excerpt:
          "Early pace indicators, weather projections, and who should challenge for podiums.",
        content: `Virtual GT Masters goes live this weekend with a compact schedule and high setup sensitivity.

This preview is currently in editorial review and will be published after final practice sessions.`,
        coverImage: "/images/news/gt-masters-preview.jpg",
        status: PublishStatus.DRAFT,
        publishedAt: null,
        authorId: editorUser.id,
        tagSlugs: ["acc"],
        relatedDriverSlugs: ["lukas-voss", "raoul-mercier"],
        relatedTeamSlugs: ["apex-simworks", "odyssey-performance"],
        relatedTournamentSlugs: ["virtual-gt-masters-2026-stage-1"],
        featuredOnHomepage: false,
      },
    ].map((article) =>
      prisma.newsArticle.create({
        data: {
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          coverImage: article.coverImage,
          status: article.status,
          publishedAt: article.publishedAt,
          authorId: article.authorId,
          featuredOnHomepage: article.featuredOnHomepage,
          tags: {
            connect: article.tagSlugs.map((tagSlug) => ({
              id: tagBySlug[tagSlug].id,
            })),
          },
          relatedDrivers: {
            connect: article.relatedDriverSlugs.map((driverSlug) => ({
              id: driverBySlug[driverSlug].id,
            })),
          },
          relatedTeams: {
            connect: article.relatedTeamSlugs.map((teamSlug) => ({
              id: teamBySlug[teamSlug].id,
            })),
          },
          relatedTournaments: {
            connect: article.relatedTournamentSlugs.map((tournamentSlug) => ({
              id: tournamentBySlug[tournamentSlug].id,
            })),
          },
        },
      })
    )
  );

  const completedTournament = tournamentBySlug["sim-grid-endurance-series-2026-r1"];

  const qualifyingResult = await prisma.raceResult.create({
    data: {
      tournamentId: completedTournament.id,
      eventName: "Round 1 - Silverstone",
      sessionType: SessionType.QUALIFYING,
      date: new Date("2026-03-14T17:00:00.000Z"),
      notes: "Close front-row battle with changing track temperatures.",
      standings: {
        create: [
          {
            position: 1,
            competitorType: CompetitorType.DRIVER,
            driverId: driverBySlug["enzo-fabre"].id,
            points: 3,
            bestLap: "1:56.203",
          },
          {
            position: 2,
            competitorType: CompetitorType.DRIVER,
            driverId: driverBySlug["lukas-voss"].id,
            points: 2,
            bestLap: "1:56.244",
          },
          {
            position: 3,
            competitorType: CompetitorType.DRIVER,
            driverId: driverBySlug["noah-berg"].id,
            points: 1,
            bestLap: "1:56.317",
          },
        ],
      },
    },
  });

  await prisma.raceResult.create({
    data: {
      tournamentId: completedTournament.id,
      eventName: "Round 1 - Silverstone",
      sessionType: SessionType.RACE,
      date: new Date("2026-03-15T19:00:00.000Z"),
      notes: "Rain in final sector for the final 20 minutes.",
      standings: {
        create: [
          {
            position: 1,
            competitorType: CompetitorType.DRIVER,
            driverId: driverBySlug["lukas-voss"].id,
            points: 25,
            laps: 82,
            totalTime: "3:00:21.120",
            bestLap: "1:57.604",
          },
          {
            position: 2,
            competitorType: CompetitorType.DRIVER,
            driverId: driverBySlug["marco-silva"].id,
            points: 18,
            laps: 82,
            totalTime: "+8.421",
            bestLap: "1:57.811",
          },
          {
            position: 3,
            competitorType: CompetitorType.DRIVER,
            driverId: driverBySlug["emma-hawkins"].id,
            points: 15,
            laps: 82,
            totalTime: "+14.002",
            bestLap: "1:57.933",
          },
          {
            position: 4,
            competitorType: CompetitorType.DRIVER,
            driverId: driverBySlug["noah-berg"].id,
            points: 12,
            laps: 81,
            totalTime: "+1 Lap",
            bestLap: "1:58.102",
          },
          {
            position: 5,
            competitorType: CompetitorType.DRIVER,
            driverId: driverBySlug["diego-romero"].id,
            points: 10,
            laps: 81,
            totalTime: "+1 Lap",
            bestLap: "1:58.201",
          },
        ],
      },
    },
  });

  const weeklyList = await prisma.weeklyTopDriverList.create({
    data: {
      weekStart: utcDate("2026-03-16"),
    },
  });

  const weeklyRankingOrder = [
    "lukas-voss",
    "marco-silva",
    "emma-hawkins",
    "noah-berg",
    "diego-romero",
    "enzo-fabre",
    "tommaso-rinaldi",
    "mia-keller",
    "raoul-mercier",
    "jake-foster",
  ];

  await prisma.weeklyTopDriverEntry.createMany({
    data: weeklyRankingOrder.map((driverSlug, index) => ({
      listId: weeklyList.id,
      driverId: driverBySlug[driverSlug].id,
      rank: index + 1,
      reason:
        index === 0
          ? "Strong qualifying and race conversion under variable conditions."
          : "Consistent weekly form across official sessions.",
    })),
  });

  await prisma.driverOfWeek.create({
    data: {
      weekStart: utcDate("2026-03-16"),
      driverId: driverBySlug["lukas-voss"].id,
      reason: "Race-winning drive in mixed conditions and top qualifying pace.",
      curatedById: adminUser.id,
    },
  });

  await prisma.follow.createMany({
    data: [
      {
        userId: viewerUser.id,
        driverId: driverBySlug["lukas-voss"].id,
      },
      {
        userId: viewerUser.id,
        driverId: driverBySlug["emma-hawkins"].id,
      },
      {
        userId: viewerUser.id,
        teamId: teamBySlug["velocity-esports"].id,
      },
    ],
  });

  await prisma.featuredTournamentSlot.createMany({
    data: [
      {
        slotDate: utcDate("2026-03-16"),
        tournamentId: tournamentBySlug["virtual-gt-masters-2026-stage-1"].id,
        order: 1,
      },
      {
        slotDate: utcDate("2026-03-16"),
        tournamentId: tournamentBySlug["continental-sim-cup-2026"].id,
        order: 2,
      },
    ],
  });

  console.log("Seed complete.");
  console.log(
    `Created ${tags.length} tags, ${teams.length} teams, ${drivers.length} drivers, ${tournaments.length} tournaments.`
  );
  console.log(`Created qualifying session ID: ${qualifyingResult.id}`);
}

main()
  .catch((error) => {
    console.error("Seed failed.", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
