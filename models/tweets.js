var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var tweetsSchema = new Schema({
    userId: String,
    accessToken : String,
   	username : String,
   	password : String,
   	email : String
}, { collection: 'User' });


module.exports = mongoose.model('User', userSchema, 'User');

