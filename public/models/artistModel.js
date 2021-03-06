var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var artistSchema = new Schema({
  name: String,
  description: String,
  yearEnrolled:Number,
  active : { type :Boolean , default: true}
});

module.exports = mongoose.model('Artists', artistSchema);