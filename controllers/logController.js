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
        res.render('../views/index', {title: 'Home', uname: 'Anon'});
    }, 
    showLog(req, res){
        async.parallel({
            texts: (callback) => {
                logModel.find({}, callback);
            },
            count: (callback) => {
                logModel.countDocuments(callback);
            }
        }, (err, results) => {
                console.log(req.cookies.username);
                res.render('../views/log', {error: err, data: results, username: req.cookies.username});
            }
        );
    },
    guestLogin(req, res) {
        res.cookie('username', req.body.guest_name);
        res.render('../views/index', {title: 'Home'});
    }
};