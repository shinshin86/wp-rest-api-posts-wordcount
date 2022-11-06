export type WPCountData = {
  title: string;
  url: string;
  content: string;
  wordcount: number;
  publishDate: Date;
};

export type Options = {
  sort: SortOptions;
};

export type SortValues = 'asc' | 'desc' | null;

export type SortOptions = {
  wordcount?: SortValues;
  publishDate?: SortValues;
};

export type SortFunction = (
  postList: Array<WPCountData>,
  sortOptions: SortOptions
) => Array<WPCountData>;
