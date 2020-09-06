var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema(
  {
  	title: { type: String, required: true },
  	created_at: { type: Date, default: Date.now },
  	text: { type: String, required: true, maxLength: 300 },
  	author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  }
);

MessageSchema
  .virtual('url')
  .get(function() {
  	return '/messages/' + this._id;
  });

module.exports = mongoose.model('Message', MessageSchema);