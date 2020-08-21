const path = require('path');
const fs = require('fs');
var mongoose = require("mongoose");
const dotenv = require("dotenv").config();
var express = require('express');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var indexRouter = require('./routes/index');
const PORT = process.env.PORT || 5000;

var clients = [];

http.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', indexRouter);

io.on('connection', (socket) => {
    socket.emit('connection');
    console.log(socket.id + ` connected`);
    socket.on('chat message', (msg) => {
        console.log('message: ', msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log(socket.id + ` disconnected`);
    }); 
});

var Account = require('./models/account');

Account.find();