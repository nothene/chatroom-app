var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    username: {type: String, require: true, maxlength: 100},
    password: {type: String, require: true, maxlength: 100}
});

module.exports = mongoose.model('Account', AccountSchema);