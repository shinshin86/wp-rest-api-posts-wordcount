# wp-rest-api-posts-wordcount

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

Returns the result in JSON format.

```json
[
  {
    title: 'Post title',
    url: 'Post url',
    content: 'content text',
    wordcount: word count(Number of characters in the content)
  },
  {
    title: 'Post title',
    url: 'Post url',
    content: 'content text',
    wordcount: word count(Number of characters in the content)
  },
  {
    title: 'Post title',
    url: 'Post url',
    content: 'content text',
    wordcount: word count(Number of characters in the content)
  },
  ...
]
```

## Licence

MIT

## Author

[Yuki Shindo](https://shinshin86.com)
