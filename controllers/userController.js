const User = require('../models/user');

const async = require('async');
const validator = require('express-validator');
var crypto = require('crypto');
const passport = require('passport');

exports.login_get = (req, res, next) => {
  res.render('user_login', { title: 'Log in' });
}

exports.signup_get = (req, res, next) => {
  res.render('user_signup', { title: 'User Signup' })
};

exports.signup_post = [
  validator.body('first_name', 'first name required').trim().isLength({ min: 1 }),
  validator.body('last_name', 'last name required').trim().isLength({ min: 1 }),
  validator.body('username', 'username required').trim().isLength({ min: 1 }),
  validator.body('password', 'password must be 8-20 characters in length')
    .trim().isLength({ min: 8, max: 20 }),
  validator.body('password_confirmation', 'confirm password').trim().isLength({ min: 1 }),
  validator.body('password_confirmation')
    .trim().custom((value, { req }) => {
      if (value !== req.body.password) {
      	throw new Error('Passwords must match');
      }
      return true;
    }),

  validator.sanitizeBody('first_name').escape(),
  validator.sanitizeBody('last_name').escape(),
  validator.sanitizeBody('username').escape(),

  (req, res, next) => {
  	const errors = validator.validationResult(req);
  	if (!errors.isEmpty()) {
  	  res.render('user_signup', { title: 'User Signup', errors: errors.array() })
  	  return;
  	}
  	const saltHash = genPassword(req.body.password);
  	const salt = saltHash.salt;
  	const hash = saltHash.hash;
  	const newUser = new User({
  	  first_name: req.body.first_name,
  	  last_name: req.body.last_name,
  	  username: req.body.username,
  	  salt: salt,
  	  hash: hash
  	});

  	newUser.save()
  	  .then((user) => {
        console.log(user);
  	  });
  	res.redirect('/');
  }
];

exports.join_get = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('user_join', { title: 'Join the Club' });
  } else {
  	res.redirect('/');
  }
}

exports.join_post = [
  validator.sanitizeBody('secret_code').escape(),
  (req, res, next) => {
  	const errors = [];
    if (req.body.secret_code === "Ibuprofen") {
      User.findOne({ '_id': res.locals.currentUser._id })
        .exec(function(err, found_user) {
          if (err) return next(err);
          if (found_user) {
          	found_user.membership_status = true;
          	found_user.save(function(err) {
          	  if (err) return next(err);
          	  res.redirect('/');
          	})
          } else {
          	errors.push('User not found');
          	res.render('user_join', {title: 'Join the Club', errors: errors });
          }
        });
    } else {
    	errors.push('passcode incorrect');
      res.render('user_join', {title: 'Join the Club', errors: errors });
    }
  }
]


function genPassword(password) {
  var salt = crypto.randomBytes(32).toString('hex');
  var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
  	salt: salt,
  	hash: genHash
  }
}