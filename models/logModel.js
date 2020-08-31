var mongoose = require('mongoose');
var db = require('../config/database');
var Schema = mongoose.Schema;
var LogSchema = new Schema({
    //username: {type: Schema.Types.ObjectId, ref: true, require: true},
    message: {type: String, require: true}
});

logTable = mongoose.model('log', LogSchema);

var async = require('async');

// module.exports = mongoose.model('log', LogSchema);

module.exports = {
    createData(inputData){
        logData = new logTable(inputData);
        logData.save((err) => {
            if(err){
                console.log(err);
            } 
        });
    },
    showLog(username){
        return new Promise((resolve) => {
            async.parallel({
                texts: (callback) => {
                    logTable.find({}, callback);
                },
                count: (callback) => {
                    logTable.countDocuments(callback);
                }
            }, (err, results) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve({data: results, username: username});
                    }
                }
            );
        });
    }
}

