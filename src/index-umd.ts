import { WPCountData, Options } from './types';
import { getWPCount } from './wpcount';

export default async (
  url: string,
  option: Options
): Promise<Array<WPCountData>> => {
  const postList = await getWPCount(url, option, fetch);
  return postList;
};
