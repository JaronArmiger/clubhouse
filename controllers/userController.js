const User = require('../models/user');

const async = require('async');
const validator = require('express-validator');

exports.signup_get = (req, res, next) => {
  res.render('user_signup', { title: 'User Signup' })
};

exports.signup_post = [
  
];