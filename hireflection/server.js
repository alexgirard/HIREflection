const express = require('express');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const app = express();
const port = process.env.PORT || 5000;


app.get('/api/hello', (req, res) => {

  //res.render(./src/index.js);
  sendHttpRequest(`https://vision.googleapis.com/v1/files:asyncBatchAnnotate?key=AIzaSyAMC3nD9pSF1n718XyzpIBfEyprC99Ogx8`, (googleResponse) => {
    console.log(googleResponse);
    res.send({
      express: 'Hello From Express',
      name: googleResponse,
      meme: 'memes'
    }
    );
  });
});

function sendHttpRequest(url, callback) {
  var pdfConvReq = new XMLHttpRequest();
  
  pdfConvReq.onreadystatechange = function () {
    if (pdfConvReq.readyState == 4 && pdfConvReq.status == 200)
      callback(pdfConvReq.responseText);
  }
 
  pdfConvReq.open("POST", "https://vision.googleapis.com/v1/files:asyncBatchAnnotate?key=AIzaSyAMC3nD9pSF1n718XyzpIBfEyprC99Ogx8", true); // true for asynchronous 
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

app.listen(port, () => console.log(`Listening on port ${port}`));

/*const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
  res.render(`./src/index.js`);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
*/