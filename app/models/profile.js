var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProfileSchema   = new Schema({
    username: String,
    following: [{username: String}],
    followers: [{username: String}],
    favourites: [{tweetId: String}]
});
/* 
{
  collection : 'tweets' 
});
*/

module.exports = mongoose.model('Profile', ProfileSchema);

