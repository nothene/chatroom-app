const path = require('path');
const fs = require('fs');

var mongoose = require("mongoose");
const dotenv = require("dotenv").config();
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;

var clients = [];

http.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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

const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fwfxg.mongodb.net/chatroom?retryWrites=true&w=majority`;

mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on("error", (error) => {
    console.log(error);
});

mongoose.connection.on("open", () => {
    console.log("Connected to database.");
});
