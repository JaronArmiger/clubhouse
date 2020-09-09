var express = require('express');
var router = express.Router();

const message_controller = require('../controllers/messageController');
const passport = require('passport');

/* GET users listing. */
router.get('/create', message_controller.create_get);
router.post('/create', message_controller.create_post);

router.post('/delete', message_controller.delete);

module.exports = router;
