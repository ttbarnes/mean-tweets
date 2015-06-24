var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProfileSchema   = new Schema({
    username: String
});
/* 
{
  collection : 'tweets' 
});
*/

module.exports = mongoose.model('Profile', ProfileSchema);

 