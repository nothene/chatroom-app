var logModel = require('../models/logModel');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var async = require('async');
var session = require('express-session');

//global.username = [];
//global.password = [];
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
    },
    register(req, res) {
        res.cookie('username', req.body.username, {expires: new Date(Date.now() + 86400000)});
        res.cookie('password', req.body.password, {expires: new Date(Date.now() + 86400000)});
        username.push(req.body.username);
        password.push(req.body.password);
        console.log(username);
        console.log(password);
        res.render('../views/index', {title: 'Home'});
    },
    login(req, res) {
        res.cookie('username', req.body.username, {expires: new Date(Date.now() + 86400000)});
        res.cookie('password', req.body.password, {expires: new Date(Date.now() + 86400000)});
        //console.log(username);
        //console.log(password);
        var i;
        for (i = 0; i < username.length; i++) 
        {
            console.log("diluar for");
            //text += cars[i] + "<br>";
            if(username[i] == req.body.username && password[i] == req.body.password)
            {
                console.log("di if");
                res.render('../views/index', {title: 'Home'});
            }
            console.log("habis if");
        }

        //res.render('../views/index', {title: 'Home'});
    }
};