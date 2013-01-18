var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var tweetsSchema = new Schema({ tweets: {} }, { collection: 'tweets' });


module.exports = mongoose.model('tweets', tweetsSchema, 'tweets');

