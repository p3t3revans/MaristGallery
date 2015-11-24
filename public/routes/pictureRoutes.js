var express = require('express');

var routes = function (Picture) {
    var pictureRouter = express.Router();

	pictureRouter.route('/')
		.post(function (req, res, next) {
			var picture = new Picture({
				title: req.body.title,
				artist: req.body.artist,
				picture: req.body.picture
			});
			picture.save(function (err) {
				if (err) return next(err);
				res.sendStatus(200);
			});
		});
	pictureRouter.route('/').get(function (req, res, next) {
		var query = Picture.find();
		if (req.query.genre) {
			query.where({ artist: req.query.artist });
		} else if (req.query.medium) {
			query.where({ medium: new RegExp('^' + '[' + req.query.medium + ']', 'i') });
		} else {
			query.limit(12);
		}
		query.exec(function (err, pictures) {
			if (err) return next(err);
			res.send(pictures);
		});
	});

	pictureRouter.route('/:id').get(function (req, res, next) {
		console.log(' \\\(^o^\)/ at the get by id api');
		Picture.findById(req.params.id, function (err, picture) {
			
			if (err) return next(err);
			res.send(picture);
		});
	});
//might be able to use this
//	pictureRouter.route('/:id').delete(function (req, res, next) {
//		    console.log(' \\\(^o^\)/ at the remove api');
//			Picture.remove(req.params.id, function (err, picture) {
///				if (err) return next(err);
//				res.send(picture);
//			});
	//});
	
	return pictureRouter;
};
module.exports = routes;
	