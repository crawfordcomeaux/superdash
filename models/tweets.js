var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var tweetsSchema = new Schema({ tweets: {} });


module.exports = mongoose.model('Tweets', tweetsSchema, 'Tweets');

