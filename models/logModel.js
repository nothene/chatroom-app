var mongoose = require('mongoose');
var db = require('../config/database');
var Schema = mongoose.Schema;
var LogSchema = new Schema({
    //username: {type: Schema.Types.ObjectId, ref: true, require: true},
    message: {type: String, require: true}
});

var async = require('async');

module.exports = mongoose.model('log', LogSchema);

// createData(inputData) {
//     logData = new logTable(inputData);
//     logData.save((err) => {
//         if(err){
//             console.log(err);
//         } 
//     });
// }