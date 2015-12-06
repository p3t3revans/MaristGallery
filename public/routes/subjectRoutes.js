var express = require('express');

var routes = function (Subject, Artist) {
    var subjectRouter = express.Router();

	subjectRouter.route('/')
		.post(function (req, res, next) {
			var subject = new Subject({
				title: req.body.title,
				description: req.body.description,
				year: req.body.year,
				yearLevel: req.body.yearLevel,
				semester: req.body.semester,
				teacher: req.body.teacher
			});
			subject.save(function (err) {
				if (err) return next(err);
				res.sendStatus(200);
			});
		});
	subjectRouter.route('/')
		.get(function (req, res, next) {
			console.log(" hello ");
			var query = Subject.find();
			if (req.query.year) {
				console.log(" year ");
				query.where({ year: Number(req.query.year) });
			} else {
				query.limit(12);
			}
			query.exec(function (err, subjects) {
				if (err) return next(err);
				res.send(subjects);
			});
		});

	subjectRouter.route('/?')
		.get(function (req, res, next) {
			console.log(" hello " + req.params.year);
			var query = Subject.find();
			if (req.params.year) {
				query.where({ year: Number(req.params.year) });
			} else {
				query.limit(12);
			}
			query.exec(function (err, subjects) {
				if (err) return next(err);
				res.send(subjects);
			});
		});
	subjectRouter.route('/:id')
		.get(function (req, res, next) {
			Subject.findById(req.params.id, function (err, subject) {

				if (err) return next(err);
				res.send(subject);
			});
		});

	subjectRouter.route('/:id')
		.delete(function (req, res, next) {
			Subject.findById(req.params.id, function (err, subject) {
				if (err) return next(err);
				subject.remove(function (err) {
					if (err) return next(err);
					res.send(200);
				});
			});


		});

	subjectRouter.route('/:id')
		.put(function (req, res, next) {
			Subject.findById(req.params.id, function (err, subject) {
				if (err) return next(err);
				else {
					subject.title = req.body.title;
					subject.description = req.body.description;
					subject.year = req.body.year;
					subject.yearLevel = req.body.yearLevel;
					subject.semester = req.body.semester;
					subject.teacher = req.body.teacher;
					subject.save(function (err) {
						if (err) return next(err);
						res.send(subject);
					});
				};

			});
		});

	subjectRouter.route('/:id/artist/:idArt')
		.put(function (req, res, next) {
			Subject.findById(req.params.id, function (err, subject) {
				if (err) return next(err);
				else {
					subject.name = req.body.name;
					subject.description = req.body.description;
					subject.year = req.body.year;
					subject.semester = req.body.semester;
					subject.yearLevel = req.body.yearLevel;
					subject.teacher = req.body.teacher;
					subject.artists.push({ _id: req.params.idArt });
					subject.save(function (err) {
						if (err) return next(err);
						res.send(subject);
					});
				};

			});
		});


	return subjectRouter;
};
module.exports = routes;
	