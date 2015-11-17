var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var pictureModel = new Schema({
    title: {
        type: String
    },
    artist: { type: String },
    medium: { type: String },
    picture: { type: String }
});

module.exports = mongoose.model('Picture', pictureModel);