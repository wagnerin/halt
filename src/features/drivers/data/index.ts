import type { DriverListItem } from "../domain";

export type DriversRepository = {
  listDrivers: () => Promise<DriverListItem[]>;
};
