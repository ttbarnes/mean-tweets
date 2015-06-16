var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TweetSchema   = new Schema({
    name: String,
    username: String,
    timestamp: String
});

module.exports = mongoose.model('Tweet', TweetSchema);