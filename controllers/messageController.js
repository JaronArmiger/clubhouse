const Message = require('../models/message');

const async = require('async');
const validator = require('express-validator');

exports.create_get = (req, res, next) => {
  res.render('message_create', { title: 'Write Message' });
}

exports.create_post = [
  
]