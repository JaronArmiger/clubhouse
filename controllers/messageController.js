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
  validator.body('title').trim().isLength({ min: 1})
    .withMessage('must include title'),
  validator.body('text').trim().isLength({ min: 1})
    .withMessage('must include message body'),
  validator.sanitizeBody('title').escape(),
  validator.sanitizeBody('text').escape(),

  (req, res, next) => {
  	const errors = validator.validationResult(req);

  	if (!errors.isEmpty()) {
  	  res.render('message_create', { title: 'Write Message', errors: errors.array()});
  	} else {
      const message = new Message({
        title: req.body.title,
        text: req.body.text,
        author: req.body.user_id,
        created_at: Date.now(),
      });
      message.save(function(err) {
        if (err) return next(err);
        res.redirect('/');
      });
  	}
  }
]