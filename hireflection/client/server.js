const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
  res.render(`./src/index.js`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

function parser(pageRateArray, dict) {
  var length = pageRateArray.length;
  var hashMapRateArray = [];
  for (var i = 0; i < length; ++i) {
    var hashMapRate = [pageParse(pageRateArray[i][0], dict), pageRateArray[i][1]];
    hashMapRateArray.push(hashMapRate);
  }
  return hashMapRateArray;
}

function pageParse(page, dict) {
  var allWords = page.replace(/^\s+|\s+$/g,'').split(/\s+/);
  var length = allWords.length * 1.2;
  var hashMap = [];
  var numWords = allWords.length;

  for (var i = 0; i < length; ++i) {
    hashMap[i] = [];
  }

  for (var i = 0; i < numWords; ++i) {
    var word = removeSpecialChars(page[i]);
    var value = wordValue(word, length);
    if (! checkExists(hashMap[value], word)) {
      hashMap[value].push(word);
      if (dict.has(word)) {
        var dictVal = dict.get(word);
        dict.delete(word);
        dict.set(word, dictVal + 1);
      } else {
        dict.set(word, 1);
      }
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
  for (var i = 0; i < length; ++i) {
    length += word.charCodeAt(i);
  }
  length = length << 5 + length;
  length = length % max;

  return Math.abs(length);
}

function checkExists(wordArray, word) {
  var length = wordArray.length;
  for (var i = 0; i < length; ++i) {
    if (wordArray[i] === word) {
      return true;
    }
  }
  return false;
}
