const fetch = require('node-fetch-2');
const { getWPCount } = require('./wpcount');

/**
 * TODO:
 * 
 * reference: src/types.ts
 */
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


module.exports = async(url: string,option: Options): Promise<Array<WPCountData>> => {
  const postList = await getWPCount(url, option, fetch);
  return postList;
};
