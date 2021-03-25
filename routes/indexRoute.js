var express = require('express');
var path = require('path');
var router = express.Router();
var logController = require('../controllers/logController');

router.get('/', logController.logForm);

router.get('/showlog', logController.showLog);

router.post('/auth', logController.guestLogin);
router.post('/login', logController.login);
router.post('/register', logController.register);
module.exports = router;