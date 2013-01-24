var mongoose = exports.mongoose = require('mongoose')
  , mongooseTypes = require('mongoose-types')
  , Schema = mongoose.Schema
;
var pics = new Schema({

  hidden: {type : Boolean , default: false}
}, {collection: 'pics'});

module.exports = mongoose.model('pics', pics, 'pics');
