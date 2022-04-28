# wp-rest-api-posts-wordcount

[![Test](https://github.com/shinshin86/wp-rest-api-posts-wordcount/actions/workflows/test.yml/badge.svg)](https://github.com/shinshin86/wp-rest-api-posts-wordcount/actions/workflows/test.yml)

Using the WP REST API, get the title, URL, content text, and number of characters in the content of all published articles of the target WordPress in JSON format.

## Install

```sh
npm install wp-rest-api-posts-wordcount
# or
yarn add wp-rest-api-posts-wordcount
```

## Usage

```javascript
const getWordcountList = require('wp-rest-api-posts-wordcount');

(async () => {
  try {
    const response = await getWordcountList('your wordpress url');
    console.log(response);
  } catch (e) {
    console.error(e);
  }
})();
```

Returns the result.

```javascript
[
  {
    title: 'Post title',
    url: 'Post url',
    content: 'content text',
    wordcount: word count(Number of characters in the content),
    publishDate: '2020-01-01T00:00:00'
  },
  {
    title: 'Post title',
    url: 'Post url',
    content: 'content text',
    wordcount: word count(Number of characters in the content),
    publishDate: '2020-02-01T00:00:00'
  },
  {
    title: 'Post title',
    url: 'Post url',
    content: 'content text',
    wordcount: word count(Number of characters in the content),
    publishDate: '2020-03-01T00:00:00'
  },
  ...
]
```

### Sort options

It is possible to sort by either wordcount or publishDate.

wordcount: asc

```javascript
const response = await getWordcountList('your wordpress url', {
  sort: { wordcount: 'asc' },
});
```

wordcount: desc

```javascript
const response = await getWordcountList('your wordpress url', {
  sort: { wordcount: 'desc' },
});
```

publishDate: asc

```javascript
const response = await getWordcountList('your wordpress url', {
  sort: { publishDate: 'asc' },
});
```

publishDate: desc

```javascript
const response = await getWordcountList('your wordpress url', {
  sort: { publishDate: 'desc' },
});
```

## Licence

[MIT](https://github.com/shinshin86/wp-rest-api-posts-wordcount/blob/main/LICENSE)

## Author

[Yuki Shindo](https://shinshin86.com)
