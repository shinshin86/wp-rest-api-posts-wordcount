import fetch from 'node-fetch-3';
import { getWPCount } from './wpcount';
import { WPCountData, Options } from './types';

export default async (
  url: string,
  option: Options
): Promise<Array<WPCountData>> => {
  const postList = await getWPCount(url, option, fetch);
  return postList;
};
