var mongoose = require('mongoose');
var db = require('../config/database');
var Schema = mongoose.Schema;
var io = require('../app');

var LogSchema = new Schema({
    //username: {type: Schema.Types.ObjectId, ref: true, require: true},
    message: {type: String, require: true}
});

var logTable = mongoose.model('log', LogSchema);

module.exports = {
    createData(inputData) {
        logData = new logTable(inputData);
        logData.save((err) => {
            if(err){
                console.log(err);
            } 
        });
    }, 
    fetchData() {
      logTable.find({}, (err, res) => {
          var texts = [];
          res.forEach(e => {
            texts.push(e.message);
          });
          return texts;
      });
    }
};