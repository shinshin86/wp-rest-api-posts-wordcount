import { WPCountData, Options, SortOptions, SortFunction } from './types';
import * as url from 'url';

// @ts-ignore
const URL = url?.URL || window.URL;

const fetchData = async (
  url: string,
  page: number,
  fetch: Function
): Promise<Array<WPCountData>> => {
  const perPage = 100;

  const targetUrl = `${url}?per_page=${perPage}&page=${page}`;

  const response = await fetch(targetUrl);
  const data = await response.json();
  return data.map((d: any) => {
    const content = removeHtmlTag(d.content.rendered);
    return {
      title: d.title.rendered,
      url: d.link,
      content,
      wordcount: content.length,
      publishDate: d.date,
    };
  });
};

const removeHtmlTag = (text: string): string => {
  return text.replace(/(<([^>]+)>)/gi, '').replace(/\n/gi, '');
};

const getWPCount = async (
  url: string,
  option: Options,
  fetch: Function
): Promise<Array<WPCountData>> => {
  try {
    new URL(url);
  } catch (e) {
    console.error('ERROR: Invalid URL entered.');
    throw e;
  }

  const targetUrl = `${url}/wp-json/wp/v2/posts`;
  const response = await fetch(targetUrl);
  const wpTotalPageCount: number = response.headers.get('x-wp-total');

  if (!wpTotalPageCount) {
    return [];
  }

  let postList: Array<WPCountData> = [];
  const paginationCount = Math.ceil(wpTotalPageCount / 100);

  for (let i = 1; i <= paginationCount; i++) {
    const contentData = await fetchData(targetUrl, i, fetch);
    postList = postList.concat(contentData);
  }

  if (option?.sort) {
    postList = sort(postList, option.sort);
  }

  return postList;
};

const sort = (
  postList: Array<WPCountData>,
  sortOptions: SortOptions
): Array<WPCountData> => {
  if (sortOptions?.wordcount) {
    if (sortOptions.wordcount === 'asc') {
      postList = postList.sort((a: WPCountData, b: WPCountData): number => {
        return a.wordcount > b.wordcount ? 1 : -1;
      });
    }

    if (sortOptions.wordcount === 'desc') {
      postList = postList.sort((a: WPCountData, b: WPCountData): number => {
        return a.wordcount < b.wordcount ? 1 : -1;
      });
    }
  }

  if (sortOptions?.publishDate) {
    if (sortOptions.publishDate === 'asc') {
      postList = postList.sort((a: WPCountData, b: WPCountData): number => {
        return a.publishDate > b.publishDate ? 1 : -1;
      });
    }

    if (sortOptions.publishDate === 'desc') {
      postList = postList.sort((a: WPCountData, b: WPCountData): number => {
        return a.publishDate < b.publishDate ? 1 : -1;
      });
    }
  }

  return postList;
};

let exportSortFunction: SortFunction | undefined = undefined;

// Export only when the test is run.
// @ts-ignore
if (typeof window == 'undefined' && process.env.NODE_ENV === 'test') {
  exportSortFunction = sort;
}

export { getWPCount, exportSortFunction as sort };
