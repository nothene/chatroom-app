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

var clients = [];

http.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

app.set('view engine', 'ejs');

app.use(express.static(path.join(process.cwd(), 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var indexRouter = require('./routes/indexRoute');

app.use('/', indexRouter);

io.on('connection', (socket) => {
    io.emit('new user');
    console.log(socket.id + ` connected`);
    socket.on('chat message', (msg) => {
        console.log('message: ', msg);
        io.emit('chat message', msg);
        logModel.createData(msg);
    });
    socket.on('disconnect', () => {
        io.emit('disconnect');
        console.log(socket.id + ` disconnected`);
    });
});

module.exports = io;