var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var pictureModel = new Schema({
    title: { type: String },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
    medium: { type: String, default: "Work on Paper" },
    picture: { type: String },
    subject:{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}
});

module.exports = mongoose.model('Picture', pictureModel);