var express = require('express');

var routes = function (Picture) {
    var pictureRouter = express.Router();

	pictureRouter.route('/')
		.post(function (req, res, next) {
			console.log(' \\\(^o^\)/ at the picture api');
			console.log(req.body.title);
			console.log(req.body.artist);
			// console.log(req.body.picture);
			var picture = new Picture({
				title: req.body.title,
				artist: req.body.artist,
				picture: req.body.picture
			});
			//console.log(req.body.picture);
			picture.save(function (err) {
				if (err) return next(err);
				res.sendStatus(200);
			});
			//var fs = require('fs');
			// $scope.imageString = fs.readFileSync(element.files[0]).toString('base64');
			//var pictureFileString = fs.readFileSync(req.body.file).toString('base64');
			//var pictureFileString = fs.readFileSync(req.body).toString('base64');
			//console.log(pictureFileString);
			//var picture = new Picture({
			//   picture: pictureFileString
			//});
			// picture.save(function (err) {
			// if (err) {
			//  console.log(err);
			//  return next(err);
			//  }
			// res.send(200);
			// });
		});

	return pictureRouter;
};
module.exports = routes;
	