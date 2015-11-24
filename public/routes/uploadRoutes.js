//might delete this

var express = require('express');

var routes = function (UploadData) {
    var uploadRouter = express.Router();

	uploadRouter.route('/')
		.post(function (req, res, next) {
			//console.log(' \\\(^o^\)/ at the upload api');

			console.log(req.body);
			console.log(req.body.file.$ngfDataUrl);
			var uploadData = new UploadData({
				userName: req.body.file.name,
				fileData: req.body.data,
			});
			//console.log(req.body.picture);
			uploadData.save(function (err) {
				if (err) return next(err);
				res.send(200);
			});

		});

	return uploadRouter;
};
module.exports = routes;