var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
  	first_name: { type: String, required: true, maxLength: 100 },
  	last_name: { type: String, required: true, maxLength: 100 },
  	username: { type: String, required: true, maxLength: 100 },
  	hash: String,
  	salt: String,
  	membership_status: { type: Boolean, default: false }
  }
);

UserSchema
  .virtual('url')
  .get(function() {
  	return '/users/' + this._id;
  });

module.exports = mongoose.model('User', UserSchema);