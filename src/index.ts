const fetch = require('node-fetch');

type WPCountData = {
  title: string;
  url: string;
  content: string;
  wordcount: number;
  publishDate: Date;
};

type Options = {
  sort: SortOptions;
};

type SortValues = 'asc' | 'desc' | null;

type SortOptions = {
  wordcount?: SortValues;
  publishDate?: SortValues;
};

const fetchData = async (
  url: string,
  page: number
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

module.exports = async (
  url: string,
  option: Options
): Promise<Array<WPCountData>> => {
  try {
    const URL = require('url').URL;
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
    const contentData = await fetchData(targetUrl, i);
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

// Export only when the test is run.
if (process.env.NODE_ENV === 'test') {
  module.exports.sort = sort;
}
