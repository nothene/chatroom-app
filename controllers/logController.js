var logModel = require('../models/logModel');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var async = require('async');
var session = require('express-session');

// app.use(express.static(path.join(process.cwd(), 'public')));

// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.json());

module.exports = {
    logForm(req, res){
        res.cookie('username', '')
        res.render('../views/index', {title: 'Home'});
    }, 
    async showLog(req, res){
        res.render('../views/log', await logModel.showLog(req.cookies.username));
    },
    guestLogin(req, res) {
        res.cookie('username', req.body.guest_name, {expires: new Date(Date.now() + 86400000)});
        res.render('../views/index', {title: 'Home'});
    }
};