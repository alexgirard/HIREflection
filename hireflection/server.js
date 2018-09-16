const express = require('express');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const app = express();
const port = process.env.PORT || 5000;


app.get('/api/hello', (req, res) => {

  //res.render(./src/index.js);
  sendHttpPostRequest(`https://vision.googleapis.com/v1/files:asyncBatchAnnotate?key=AIzaSyAMC3nD9pSF1n718XyzpIBfEyprC99Ogx8`, (googleResponse) => {
    var JsonGoogleResponse = JSON.parse(googleResponse);
    var name = JsonGoogleResponse.name;
    name = name.slice(11,);
    res.send({
      express: 'Hello From Express',
      name: name
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


function 

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