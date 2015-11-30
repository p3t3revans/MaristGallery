var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var artistSchema = new Schema({
  _id: Number,
  name: String,
  firstEnrolled: Date,
  classes: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Class'
  }],
  artWorks: [{
   type: mongoose.Schema.Types.ObjectId, ref: 'Picture'
  }]
});

module.exports = mongoose.model('Artist', artistSchema);