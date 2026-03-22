import type { ResultListItem } from "../domain";

export type ResultsRepository = {
  listResults: () => Promise<ResultListItem[]>;
};
