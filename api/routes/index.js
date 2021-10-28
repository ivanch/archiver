var express = require('express');
var router = express.Router();
var fs = require('fs');

var db = require('./database/db')
var archiver = require('./archiver/archiver');

/* GET returns ok. */
router.get('/', function(req, res, next) {
  res.json({'system': 'ok'});
});

// POST take a screenshot of a website and store it in screenshots folder
router.post('/screenshot/:replace?', async function(req, res, next) {
  const url = req.body.url;
  const replace = req.params.replace || 'false';

  // check if url is in database
  const exists = db.checkUrl(url);
  if (exists && replace === 'false') {
    res.status().json({'error': 'URL already exists'});
    return;
  }

  await archiver.archiveUrl(url);

  // return ok
  res.json({'screenshot': 'success'});
});

// GET returns all urls in database
router.get('/urls', function(req, res, next) {
  const urls = db.getUrls();
  res.json(urls);
});

// GET returns a screenshot of a website
router.get('/screenshot/:id', async function(req, res, next) {
  const urlId = req.params.id;

  // check if url is in database
  const urlInfo = db.getUrlInfo(urlId);
  console.log(urlInfo);
  if (!urlInfo) {
    res.status(404).json({'error': 'URL does not exist'});
    return;
  }

  // return screenshot
  const filename = urlInfo['filename'];
  const screenshot = fs.readFileSync('./data/screenshots/' + filename + '.png');
  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(screenshot, 'binary');

});

module.exports = router;
