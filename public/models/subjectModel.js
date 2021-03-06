var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var subjectSchema = new Schema({
  title: String,
  yearLevel: Number,
  description: String,
  year: Number,
  semester: Number,
  teacher: String,
  artists: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Artist'
  }]
});

module.exports = mongoose.model('Subject', subjectSchema);