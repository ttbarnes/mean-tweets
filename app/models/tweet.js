var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TweetSchema   = new Schema({
    username: String,
    copy: String,
    image:{
      url:String
    },
    timestamp: String,
    favourites: [{username: String}],
    retweets: [{username: String}]
});

module.exports = mongoose.model('Tweet', TweetSchema);