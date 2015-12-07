var express = require('express');

var routes = function (Picture) {
    var pictureRouter = express.Router();

	pictureRouter.route('/')
		.post(function (req, res, next) {
		//	console.log(' \\\(^o^\)/ at the post picture api');
			var picture = new Picture({
				title: req.body.title,
				subject : req.body.subject,
				year: req.body.year,
				artist: req.body.artist,
				artistName: req.body.artistName,
				picture: req.body.picture,
				medium: req.body.medium
			});
			picture.save(function (err) {
				if (err) return next(err);
				res.sendStatus(200);
			});
		});
	pictureRouter.route('/').get(function (req, res, next) {
		//		console.log(' \\\(^o^\)/ at the get picture api' + ' query id ' + req.query.id  + ' params id ' + req.params.id + ' query _id ' + req.query._id);

		var query = Picture.find();
		if (req.query.medium) {
			query.where({ medium: req.query.medium });
		} else if (req.query.medium) {
			query.where({ medium: new RegExp('^' + '[' + req.query.medium + ']', 'i') });
		}
		else if (req.query.id) {
			console.log('_id');
			query.where({ _id: req.query.id});
		} else {
			query.limit(12);
		}
		query.exec(function (err, pictures) {
			if (err) return next(err);
			res.send(pictures);
		});
	});

	pictureRouter.route('/:id').get(function (req, res, next) {
		//console.log(' \\\(^o^\)/ at the get :id picture api' + req.params.id);
		Picture.findById(req.params.id, function (err, picture) {

			if (err) return next(err);
			res.send(picture);
		});
	});
	
	pictureRouter.route('/?').get(function (req, res, next) {
		//console.log(' \\\(^o^\)/ at the get ? picture api' + req.params.id);

		Picture.findById(req.params.id, function (err, picture) {

			if (err) return next(err);
			res.send(picture);
		});
	});
	pictureRouter.route('/:id').delete(function (req, res, next) {

		//	console.log(' \\\(^o^\)/ at the remove api');
		Picture.findById(req.params.id, function (err, picture) {
			if (err) return next(err);
			picture.remove(function (err) {
				if (err) return next(err);
				res.send(200);
			});
		});


	});

	pictureRouter.route('/:id').put(function (req, res, next) {
		Picture.findById(req.body._id, function (err, picture) {
			if (err) return next(err);
			else {
				picture.picture = req.body.picture;
				picture.year = req.body.year;
				picture.artist = req.body.artist;
				picture.artistName = req.body.artistName,
				picture.title = req.body.title;
				picture.medium = req.body.medium;
				picture.subject = req.body.subject;
				picture.save(function (err) {
					if (err) return next(err);
					res.send(picture);
				});
			};

		});
	});

	return pictureRouter;
};
module.exports = routes;
	