const express = require('express');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const app = express();
const port = process.env.PORT || 5000;


app.get('/api/hello', (req, res) => {

  var operations;
  sendHttpPostRequest(`https://vision.googleapis.com/v1/files:asyncBatchAnnotate?key=AIzaSyAMC3nD9pSF1n718XyzpIBfEyprC99Ogx8`, (googleResponse) => {
    operations = JsonGoogleResponse.name;
    var JsonGoogleResponse = JSON.parse(googleResponse);
    operations = operations.slice(11,);
    res.send({
      express: 'Hello From Express',
      operations: operations
    }
    );
  }
  );

  sendHttpGetRequest('https://vision.googleapis.com/v1/operations/dc9c023628e0f8b7?key=', operations);

  var downloadLink;
  sendHttpGetDownloadRequest('https://www.googleapis.com/storage/v1/b/hireflection/o/Resumes%2Foutput-1-to-1.json',(downloadInfo)=>{
    var downloadInfoJson =JSON.parse(downloadInfo);
    downloadLink = downloadInfoJson.mediaLink;
    res.send({
      link: downloadLink
    }
    );
  });

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

/*const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
  res.render(./src/index.js);
});

app.listen(port, () => console.log(Listening on port ${port}));
*/