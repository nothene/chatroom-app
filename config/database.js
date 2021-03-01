var mongoose = require('mongoose');
const dotenv = require('dotenv').config({path: '../.env'});

const mongoString = `mongodb+srv://nothene:${process.env.DB_PASSWORD}@cluster0.fwfxg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(mongoString);

mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true});

var conn = mongoose.connection;

conn.on("error", (error) => {
    console.log(error);
});

mongoose.connection.on('connected', () => {
    console.log("Connected to database.");
});

mongoose.connection.on('disconnected', () => {
    console.log("Disconnected from database.");
});

module.exports = conn;