const fs = require('fs').promises;
const path = require('path');
const {
  getWPCount: getWordcountList,
  sort: getWordcountListSort,
} = require('@/wpcount.ts');

describe('wp-rest-api-posts-wordcount', (): void => {
  describe('Sort', (): void => {
    test('Should a wordcount is sorted in asc order', async (): Promise<void> => {
      const postList = JSON.parse(
        await fs.readFile(path.join(__dirname, 'mock-response.json'), 'utf8')
      );

      const wordcountList: Array<number> = getWordcountListSort(postList, {
        wordcount: 'asc',
      }).map((post: any) => post.wordcount);
      expect(wordcountList).toEqual([10, 300, 2000]);
    });

    test('Should a wordcount is sorted in desc order', async (): Promise<void> => {
      const postList = JSON.parse(
        await fs.readFile(path.join(__dirname, 'mock-response.json'), 'utf8')
      );

      const wordcountList: Array<number> = getWordcountListSort(postList, {
        wordcount: 'desc',
      }).map((post: any) => post.wordcount);
      expect(wordcountList).toEqual([2000, 300, 10]);
    });

    test('Should a wordcount is not sorted in no option.', async (): Promise<void> => {
      const postList = JSON.parse(
        await fs.readFile(path.join(__dirname, 'mock-response.json'), 'utf8')
      );

      const wordcountList: Array<number> = getWordcountListSort(postList).map(
        (post: any) => post.wordcount
      );
      expect(wordcountList).toEqual([10, 2000, 300]);
    });

    test('Should a publishDate is sorted in asc order', async (): Promise<void> => {
      const postList = JSON.parse(
        await fs.readFile(path.join(__dirname, 'mock-response.json'), 'utf8')
      );

      const publishDateList: Array<number> = getWordcountListSort(postList, {
        publishDate: 'asc',
      }).map((post: any) => post.publishDate);
      expect(publishDateList).toEqual([
        '2000-01-1T00:00:00',
        '2000-02-1T00:00:00',
        '2000-03-1T00:00:00',
      ]);
    });

    test('Should a publishDate is sorted in desc order', async (): Promise<void> => {
      const postList = JSON.parse(
        await fs.readFile(path.join(__dirname, 'mock-response.json'), 'utf8')
      );

      const publishDateList: Array<number> = getWordcountListSort(postList, {
        publishDate: 'desc',
      }).map((post: any) => post.publishDate);
      expect(publishDateList).toEqual([
        '2000-03-1T00:00:00',
        '2000-02-1T00:00:00',
        '2000-01-1T00:00:00',
      ]);
    });

    test('Should a publishDate is not sorted in no option.', async (): Promise<void> => {
      const postList = JSON.parse(
        await fs.readFile(path.join(__dirname, 'mock-response.json'), 'utf8')
      );

      const publishDateList: Array<number> = getWordcountListSort(postList).map(
        (post: any) => post.publishDate
      );
      expect(publishDateList).toEqual([
        '2000-02-1T00:00:00',
        '2000-01-1T00:00:00',
        '2000-03-1T00:00:00',
      ]);
    });

    test('Should a sort results are overwritten in this order. [wordcount -> publishDate]', async (): Promise<void> => {
      const postList = JSON.parse(
        await fs.readFile(path.join(__dirname, 'mock-response.json'), 'utf8')
      );

      const wordcountSortedList: Array<number> = getWordcountListSort(
        postList,
        { wordcount: 'asc' }
      );

      expect(wordcountSortedList.map((post: any) => post.wordcount)).toEqual([
        10, 300, 2000,
      ]);

      const publishDataSortedList: Array<number> = getWordcountListSort(
        wordcountSortedList,
        { publishDate: 'asc' }
      );

      expect(
        publishDataSortedList.map((post: any) => post.wordcount)
      ).not.toEqual([10, 300, 2000]);

      expect(
        publishDataSortedList.map((post: any) => post.publishDate)
      ).toEqual([
        '2000-01-1T00:00:00',
        '2000-02-1T00:00:00',
        '2000-03-1T00:00:00',
      ]);

      // Check that wordcountSortedList has the same value change.
      expect(wordcountSortedList.map((post: any) => post.publishDate)).toEqual([
        '2000-01-1T00:00:00',
        '2000-02-1T00:00:00',
        '2000-03-1T00:00:00',
      ]);
    });
  });

  describe('Error handling', (): void => {
    test('Should throw error, Invalid URL entered.', async (): Promise<void> => {
      await expect(getWordcountList('invalid-url')).rejects.toThrow(
        'Invalid URL'
      );
    });
  });
});
