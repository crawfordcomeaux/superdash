
var mongoose = exports.mongoose = require('mongoose')
  , mongooseTypes = require('mongoose-types')
  , Schema = mongoose.Schema
;
exports = module.exports = new Schema({

  status_id: { type: Number },
  in_reply_to_status_id: { type: Number },
  in_reply_to_user_id: { type: Number },
  created_at: { type: Date },
  profile_image_url: { type: String },
  user_id: { type: Number },
  screen_name: { type: String },
  in_reply_to_screen_name: { type: String },
  text: { type: String }
});
