export type ResultListItem = {
  id: string;
  eventName: string;
  sessionType: string;
  date: Date;
};

export async function listResults(): Promise<ResultListItem[]> {
  return [];
}
