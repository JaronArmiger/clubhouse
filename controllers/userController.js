const User = require('../models/user');

const async = require('async');

exports.signup_get = (req, res, next) => {
  res.render('user_signup')
};