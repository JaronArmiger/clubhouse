var express = require('express');
var router = express.Router();
var nconf = require('nconf');

const Message = require('../models/message');

/* GET home page. */
router.get('/', function(req, res, next) {
  Message.find()
    .populate('author')
    .exec(function(err, list_messages) {
      if (err) return next(err);
      res.render('index', { title: 'Home', list_messages});
    });
});

module.exports = router;
