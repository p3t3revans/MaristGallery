var express = require('express');

var routes = function (Artist, Picture) {
    var artistRouter = express.Router();

	artistRouter.route('/')
		.post(function (req, res, next) {
			var artist = new Artist({
				name: req.body.name,
				description: req.body.description,
				yearEnrolled: req.body.yearEnrolled
			});
			artist.save(function (err) {
				if (err) return next(err);
				res.sendStatus(200);
			});
		});
	artistRouter.route('/')
		.get(function (req, res, next) {
			var query = Artist.find();
			if (req.query.yearEnrolled) {
				query.where({ yearEnrolled: Number(req.query.yearEnrolled) });
			} else {
				query.limit(12);
			}
			query.exec(function (err, artists) {
				if (err) return next(err);
				res.send(artists);
			});
		});

	artistRouter.route('/?')
		.get(function (req, res, next) {
			var query = Artist.find();
			if (req.query.yearEnrolled) {
				query.where({ yearEnrolled: Number(req.query.yearEnrolled) });
			} else {
				query.limit(12);
			}
			query.exec(function (err, artists) {
				if (err) return next(err);
				res.send(artists);
			});
		});

	artistRouter.route('/:id')
		.get(function (req, res, next) {
			Artist.findById(req.params.id, function (err, artist) {

				if (err) return next(err);
				res.send(artist);
			});
		});

	artistRouter.route('/:id')
		.delete(function (req, res, next) {
			Artist.findById(req.params.id, function (err, artist) {
				if (err) return next(err);
				artist.remove(function (err) {
					if (err) return next(err);
					res.send(200);
				});
			});


		});

	artistRouter.route('/:id')
		.put(function (req, res, next) {
			Artist.findById(req.body._id, function (err, artist) {
				if (err) return next(err);
				else {
					artist.name = req.body.name;
					artist.description = req.body.description;
					artist.yearEnrolled = req.body.yearEnrolled;
					artist.save(function (err) {
						if (err) return next(err);
						res.send(artist);
					});
				};

			});
		});
	/*
		artistRouter.route('/:id/picture/:idPic')
			.put(function (req, res, next) {
				Artist.findById(req.params.id, function (err, artist) {
					if (err) return next(err);
					else {
						artist.name = req.body.name;
						artist.description = req.body.description;
						artist.yearEnrolled = req.body.yearEnrolled;
						artist.pictures.push({ _id: req.params.idPic });
						artist.save(function (err) {
							if (err) return next(err);
							res.send(artist);
						});
					};
	
				});
			});
	
		artistRouter.route('/:id/subject/:idSub')
			.put(function (req, res, next) {
				Artist.findById(req.params.id, function (err, artist) {
					if (err) return next(err);
					else {
						artist.name = req.body.name;
						artist.description = req.body.description;
						artist.yearEnrolled = req.body.yearEnrolled;
						artist.subjects.push({ _id: req.params.idSub });
						artist.save(function (err) {
							if (err) return next(err);
							res.send(artist);
						});
					};
	
				});
			});
	*/

	return artistRouter;
};
module.exports = routes;
	