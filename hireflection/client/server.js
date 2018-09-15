const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
  res.render(`./src/index.js`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

function pageParse(page) {
  var allWords = page.replace(/^\s+|\s+$/g,'').split(/\s+/);
  var length = allWords.length * 1.2;
  var hashMap = [];
  var numWords = allWords.length;

  for (int i = 0; i < length; ++i) {
    hashMap[i] = [];
  }

  for (int i = 0; i < numWords; ++i) {
    var word = removeSpecialChars(page[i]);
    var value = wordValue(word, length);
    if (! checkExists(hashMap[value], word)) {
      hashMap[value].push(word);
    }
  }
  return hashMap;
}

function removeSpecialChars(word) {
  return word.replace(/\W/g, '');
}

function wordValue(word, max) {
  var total = 0;
  var length = word.length;
  for (int i = 0; i < length; ++i) {
    length += word.charCodeAt(i);
  }
  return length % max;
}

function checkExists(wordArray, word) {
  var length = wordArray.length;
  for (int i = 0; i < length; ++i) {
    if (wordArray[i] === word) {
      return true;
    }
  }
  return false;
}
