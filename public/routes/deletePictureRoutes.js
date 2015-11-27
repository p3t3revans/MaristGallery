var express = require('express');

var routes = function (Picture) {
    var deletePictureRouter = express.Router();


	deletePictureRouter.route('/:id').delete(function (req, res, next) {

	// 	console.log(' \\\(^o^\)/ at the remove api');
		Picture.findById(req.params.id, function (err, picture) {
			if (err) return next(err);
			picture.remove(function (err) {
				if (err) return next(err);
				res.send(200);
			});
		});
			

	});

	return deletePictureRouter;
};
module.exports = routes;