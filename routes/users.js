var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/signup', user_controller.signup_get);


module.exports = router;
