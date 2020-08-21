var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
    username: {type: Schema.Types.ObjectId, ref: true, require: true},
    message: {type: String, require: true}
});

module.exports = mongoose.model('Account', LogSchema);