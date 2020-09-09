var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');
const passport = require('passport');

/* GET users listing. */
router.get('/login', user_controller.login_get);
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/'
}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/signup', user_controller.signup_get);
router.post('/signup', user_controller.signup_post);

router.get('/join', user_controller.join_get);
router.post('/join', user_controller.join_post);

module.exports = router;
