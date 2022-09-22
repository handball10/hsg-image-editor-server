var express = require('express');
var router = express.Router();

const processRoute = require('../lib/imageRenderer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'HSG SocialMedia API' });
});

router.get('/image', processRoute);

module.exports = router;
