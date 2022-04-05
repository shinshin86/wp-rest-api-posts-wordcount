const getWordcountList = require('@/index.ts');

describe('wp-rest-api-posts-wordcount', (): void => {
  test('Should throw error, Invalid URL entered.', async (): Promise<void> => {
    await expect(getWordcountList('invalid-url')).rejects.toThrow(
      'Invalid URL'
    );
  });
});
