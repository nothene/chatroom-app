var logModel = require('../models/logModel');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var app = express();
var io = require('socket.io')();

// app.use(express.static(path.join(process.cwd(), 'public')));

// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.json());

module.exports = {
    logForm(req, res){
        res.render('../views/index');
    },
}
