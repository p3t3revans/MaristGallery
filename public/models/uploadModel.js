var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UploadSchema = new Schema(
  {
    userName: { type: String },
    fileData: { type: String }
  }
  );

module.exports = mongoose.model('UploadData', UploadSchema);