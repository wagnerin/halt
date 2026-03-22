import type { NewsListItem } from "../domain";

export type NewsRepository = {
  listNews: () => Promise<NewsListItem[]>;
};
