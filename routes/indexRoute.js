var express = require('express');
var path = require('path');
var router = express.Router();
var logController = require('../controllers/logController');

router.get('/', logController.logForm);

module.exports = router;