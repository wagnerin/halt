import {
  findDriverBySlug,
  listDrivers,
  type DriverAchievementRecord,
  type DriverListRecord,
  type DriverProfileRecord,
  type DriverRelatedArticleRecord,
  type DriverTimelineEntryRecord,
} from "../data";

export type DriverListItem = DriverListRecord;
export type DriverProfile = DriverProfileRecord;
export type DriverAchievement = DriverAchievementRecord;
export type DriverTimelineEntry = DriverTimelineEntryRecord;
export type DriverRelatedArticle = DriverRelatedArticleRecord;

export async function getDriversList(limit?: number): Promise<DriverListItem[]> {
  return listDrivers(limit);
}

export async function getDriverProfileBySlug(
  slug: string
): Promise<DriverProfile | null> {
  return findDriverBySlug(slug);
}
