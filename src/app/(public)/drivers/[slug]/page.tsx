import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDriverProfileBySlug } from "@/features/drivers/domain";
import { DriverProfileView } from "@/features/drivers/ui";

export const dynamic = "force-dynamic";

type DriverPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: DriverPageProps): Promise<Metadata> {
  const { slug } = await params;
  const driver = await getDriverProfileBySlug(slug);

  if (!driver) {
    return {
      title: "Driver Not Found",
      description: "The requested driver profile could not be found.",
    };
  }

  return {
    title: driver.nickname,
    description: driver.bio,
    openGraph: {
      title: driver.nickname,
      description: driver.bio,
      type: "profile",
      images: driver.avatar ? [driver.avatar] : [],
    },
    alternates: {
      canonical: `/drivers/${driver.slug}`,
    },
  };
}

export default async function DriverPage({ params }: DriverPageProps) {
  const { slug } = await params;
  const driver = await getDriverProfileBySlug(slug);

  if (!driver) {
    notFound();
  }

  return <DriverProfileView driver={driver} />;
}
