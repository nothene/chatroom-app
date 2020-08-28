const path = require('path');
const fs = require('fs');
var mongoose = require("mongoose");
const dotenv = require("dotenv").config();
var express = require('express');
var bodyParser = require('body-parser');
var createError = require('http-errors');
var logger = require('morgan');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;
var logModel = require('./models/logModel');
// var session = require('express-session');
var cookieParser = require('cookie-parser');

app.use(cookieParser());

// app.use(session({
//     secret: 'no',
//     resave: false
// }));

http.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

app.use(express.static(path.join(process.cwd(), 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var indexRouter = require('./routes/indexRoute');

app.use('/', indexRouter);

io.on('connection', (socket) => {
    // logUser = new logModel({message: socket.id + ' connected'});
    // logUser.save((err) => {
    //     if(err){
    //         console.log();
    //     }
    // });
    io.emit('new user');
    console.log(socket.id + ` connected`);   
    socket.on('chat message', (msg) => {
        logData = new logModel(msg);
        console.log('message: ', msg);
        io.emit('chat message', msg);
        logData.save((err) => {
            if(err){
                console.log(err);
            } 
        });
    });
    socket.on('disconnect', () => {
        io.emit('disconnect');
        console.log(socket.id + ` disconnected`);    
    });
});