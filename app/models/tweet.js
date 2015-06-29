var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TweetSchema   = new Schema({
    username: String,
    copy: String,
    image:{
      url:String
    },
    timestamp: String
});

module.exports = mongoose.model('Tweet', TweetSchema);