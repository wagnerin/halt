export type DriverListItem = {
  id: string;
  slug: string;
  nickname: string;
  country: string;
};

export async function listDrivers(): Promise<DriverListItem[]> {
  return [];
}
