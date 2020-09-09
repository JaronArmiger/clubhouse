const User = require('../models/user');

const async = require('async');
const validator = require('express-validator');

exports.signup_get = (req, res, next) => {
  res.render('user_signup', { title: 'User Signup' })
};

exports.signup_post = [
  validator.body('first_name', 'first name required').trim().isLength({ min: 1 }),
  validator.body('last_name', 'last name required').trim().isLength({ min: 1 }),
  validator.body('username', 'username required').trim().isLength({ min: 1 }),
  validator.sanitizeBody('first_name').escape(),
  validator.sanitizeBody('last_name').escape(),
  validator.sanitizeBody('username').escape(),

  (req, res, next) => {
  	const errors = validator.validationResult(req);
  	if (!errors.isEmpty()) {
  	  res.render('user_signup', { title: 'User Signup', errors: errors.array() })
  	}
  }
];