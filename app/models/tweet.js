var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TweetSchema   = new Schema({
    username: String,
    name: String,
    imageUrl: String,
    timestamp: String
});

module.exports = mongoose.model('Tweet', TweetSchema);