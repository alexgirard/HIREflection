const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
  res.render(`./src/index.js`);

  var operations;
  sendHttpPostRequest(`https://vision.googleapis.com/v1/files:asyncBatchAnnotate?key=AIzaSyAMC3nD9pSF1n718XyzpIBfEyprC99Ogx8`, (googleResponse) => {
    var JsonGoogleResponse = JSON.parse(googleResponse);
    operations = JsonGoogleResponse["name"];
    operations = operations.slice(11,);

    var downloadLink;
    sendHttpGetDownloadRequest('https://www.googleapis.com/storage/v1/b/hireflection/o/Resumes%2Foutput-1-to-1.json',(downloadInfo)=>{
      var downloadInfoJson =JSON.parse(downloadInfo);
      downloadLink = downloadInfoJson.mediaLink;
      
      /*IBM Watsoon API*/

        var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

        var discovery = new DiscoveryV1({
          version: '2017-11-07',
            username: '0dd90daf-6615-4de7-a52f-d1c35ddc5883',
            password: 'UuP8rTsKFh2y'
        });
        discovery.query({ environment_id: 'f817de97-85dd-4e5a-ab10-f4ab701ebc14', collection_id: '50f83463-32fe-41db-b229-4201c672f5d2', query: 'enriched_text.entities.text:watson' }, (error, data)=> {
          /*console.log(JSON.stringify(data, null, 2));*/
          res.send({
            link: downloadLink,
            express: 'Hello From Express',
            operations: operations,
            watsonData: data
          });
        });


      
      
    });
  }
  );

  sendHttpGetRequest('https://vision.googleapis.com/v1/operations/dc9c023628e0f8b7?key=', operations);

  







});

function sendHttpPostRequest(url, callback) {
  var pdfConvReq = new XMLHttpRequest();
  
  pdfConvReq.onreadystatechange = function () {
    if (pdfConvReq.readyState == 4 && pdfConvReq.status == 200)
      callback(pdfConvReq.responseText);
  }
 
  pdfConvReq.open("POST", url, true); // true for asynchronous 
  //pdfConvReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  pdfConvReq.send(JSON.stringify(
    {
      "requests": [
        {
          "inputConfig": {
            "gcsSource": {
              "uri": "gs://hireflection/test.pdf"
            },
            "mimeType": "application/pdf"
          },
          "features": [
            {
              "type": "DOCUMENT_TEXT_DETECTION"
            }
          ],
          "outputConfig": {
            "gcsDestination": {
              "uri": "gs://hireflection/Resumes/"
            },
            "batchSize": 2
          }
        }
      ]
    }
  ));
}


function sendHttpGetRequest(url, key){
  url=url+key;
  var pdfConvReq = new XMLHttpRequest();
  /*pdfConvReq.onreadystatechange = function () {
    if (pdfConvReq.readyState == 4 && pdfConvReq.status == 200)
      callback(pdfConvReq.responseText);
  }*/
  
  pdfConvReq.open("GET", url, true); 
  pdfConvReq.send();
}

function sendHttpGetDownloadRequest(url, callback){
  var pdfConvReq = new XMLHttpRequest();
  pdfConvReq.onreadystatechange = function () {
    if (pdfConvReq.readyState == 4 && pdfConvReq.status == 200)
      callback(pdfConvReq.responseText);
  }
  
  pdfConvReq.open("GET", url, true); 
  pdfConvReq.send();
}

app.listen(port, () => console.log(`Listening on port ${port}`));

// ====================

//Key,Value: Word, Score
var dict = new Map();



/**
 * 
 * @param pageRateArray a 2d array [Page,Rating]
 * @param dict The dictionary 
 */
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
