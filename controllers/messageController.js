const Message = require('../models/message');

const async = require('async');
const validator = require('express-validator');

exports.create_get = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('message_create', { title: 'Write Message' });  
  } else {
  	res.redirect('/');
  }
}

exports.create_post = [
  
]