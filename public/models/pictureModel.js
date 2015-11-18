var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var pictureModel = new Schema({
    title: { type: String },
    artist: { type: String },
    medium: { type: String, default: "Work on Paper" },
    picture: { type: String }
});

module.exports = mongoose.model('Picture', pictureModel);