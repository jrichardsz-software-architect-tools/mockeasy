var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser')
var fs = require('fs');
var port = process.env.PORT || 2708;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(cors());

var errorEnabled = false;

// just toggle to true or false a flag to determine if an error must be returned
app.get('/toggle-error', function(req, res) {
  errorEnabled = !errorEnabled;
  res.json({
    "returnErrorMockIfExist": errorEnabled
  });
});

app.all('*', function(req, res) {
  var basePathMock = 'mocks' + req.path;
  var mock = getMockFile(basePathMock);
  var headers = getHeaderMock(basePathMock);
  console.log('\nmock to search: ' + mock);
  console.log('received headers: ' + JSON.stringify(req.headers, null, 4));
  console.log('received body: ' + JSON.stringify(req.body, null, 4));
  console.log('response');
  console.log(headers);
  fs.readFile(mock, 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      res.status(500)
      res.json({
        "error": "json mock was not found." + err
      });
    } else {
      obj = JSON.parse(data);
      Object.keys(headers).forEach(key => {
        res.header(key, headers[key])
      })
      res.header('Access-Control-Expose-Headers', '*');
      if (errorEnabled) {
        res.status(500)
      }else{
        res.status(200)
      }
      res.json(obj);
    }
  });
});

function getMockFile(basePath) {
  var successMock = basePath + '/mock.json';
  var errorMock = basePath + '/error.json';

  if (errorEnabled) {
    if (fileExist(basePath)) {
      return errorMock;
    } else {
      return successMock;
    }
  } else {
    return successMock;
  }

}
function getHeaderMock(basePath) {
  var headersMock = basePath + '/headers.json';
  
  if (fileExist(headersMock)) {
    return JSON.parse(fs.readFileSync(headersMock, 'utf8'));
  } else {
    return {};
  }

}

function fileExist(path) {
  try {
    return fs.existsSync(path);
  } catch (err) {
    console.error(err)
    return false;
  }
}

app.listen(port);
console.log(`Runnig mocks on ${port}`);
