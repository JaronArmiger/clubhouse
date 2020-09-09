var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/signup', user_controller.signup_get);
router.post('/signup', user_controller.signup_post);

router.get('/join', user_controller.join_get);
router.post('/join', user_controller.join_post);

module.exports = router;
