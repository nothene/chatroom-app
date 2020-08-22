var logModel = require('../models/logModel');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var async = require('async');

// app.use(express.static(path.join(process.cwd(), 'public')));

// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.json());

module.exports = {
    logForm(req, res){
        res.render('../views/index', {title: 'Home'});
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
                var arr = results.texts;
                res.render('../views/log', {error: err, data: results});
            }
        );
    }
};