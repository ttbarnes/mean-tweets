var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProfileSchema   = new Schema({
    username: String,
    details: [{
      websiteUrl: String,
      location: String,
      about: String
    }],
    following: [{username: String}],
    followers: [{username: String}],
    favourites: [{tweetId: String}],
    retweets: [{tweetId: String}]
});

module.exports = mongoose.model('Profile', ProfileSchema);
