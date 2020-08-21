var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

module.exports = router;