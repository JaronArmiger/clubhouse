var express = require('express');
var router = express.Router();
var nconf = require('nconf');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.title = nconf.get('fuck');
  res.render('index');
});

module.exports = router;
