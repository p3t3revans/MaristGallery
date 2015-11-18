var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var fs = require('fs');
var Grid = require('gridfs-stream');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
mongoose.connect('mongodb://127.0.0.1/picture');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
  console.log('picture db opened');
});

var UploadSchema = require('./public/models/uploadModel');

var Picture = require('./public/models/pictureModel');

var Show = require('./public/models/showModel');

var User = require('./public/models/userModel');
/*
var PictueSchema = new mongoose.Schema(
  {
    name: String,
    fileName: String,
    picture: String
  }
  );
  */
/*
var showSchema = new mongoose.Schema({
_id: Number,
name: String,
airsDayOfWeek: String,
airsTime: String,
firstAired: Date,
genre: [String],
network: String,
overview: String,
rating: Number,
ratingCount: Number,
status: String,
poster: String,
subscribers: [{
  type: mongoose.Schema.Types.ObjectId, ref: 'User'
}],
episodes: [{
  season: Number,
  episodeNumber: Number,
  episodeName: String,
  firstAired: Date,
  overview: String
}]
});

var userSchema = new mongoose.Schema({
email: { type: String, unique: true },
password: String
});

userSchema.pre('save', function (next) {
var user = this;
if (!user.isModified('password')) return next();
bcrypt.genSalt(10, function (err, salt) {
  if (err) return next(err);
  bcrypt.hash(user.password, salt, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
  if (err) return cb(err);
  cb(null, isMatch);
});
};
*/
var multipart = require('connect-multiparty');

//app.use(multipart({
//   uploadDir: 'localhost\upload'
//}));

//var User = mongoose.model('User', userSchema);
//var Show = mongoose.model('Show', showSchema);
//var Picture = mongoose.model('Picture', PictueSchema);
//var UploadData = mongoose.model('UploadData', UploadSchema);
//mongoose.connect('localhost/picture');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');



var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var _ = require('lodash');

var app = express();
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
  User.findOne({ email: email }, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    user.comparePassword(password, function (err, isMatch) {
      if (err) return done(err);
      if (isMatch) return done(null, user);
      return done(null, false);
    });
  });
}));



app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
//console.log('limit file size = ' +limit);
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//showRouter = require('./public/routes/showRoutes')(Show);
//app.use('/api/shows', showRouter); 

app.get('/api/shows', function (req, res, next) {
  var query = Show.find();
  if (req.query.genre) {
    query.where({ genre: req.query.genre });
  } else if (req.query.alphabet) {
    query.where({ name: new RegExp('^' + '[' + req.query.alphabet + ']', 'i') });
  } else {
    query.limit(12);
  }
  query.exec(function (err, shows) {
    if (err) return next(err);
    res.send(shows);
  });
});

app.get('/api/shows/:id', function (req, res, next) {
  Show.findById(req.params.id, function (err, show) {
    if (err) return next(err);
    res.send(show);
  });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.send(500, { message: err.message });
});

app.post('/api/login', passport.authenticate('local'), function (req, res) {
  res.cookie('user', JSON.stringify(req.user));
  res.send(req.user);
});

app.post('/api/signup', function (req, res, next) {
  var user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save(function (err) {
    if (err) return next(err);
    res.send(200);
  });
});

app.get('/api/logout', function (req, res, next) {
  req.logout();
  res.send(200);
});
/*
app.post('/api/upload', function (req, res, next) {
  console.log('  \\\(^o^\)/ at the upload api');
 //  var data = _.pick(req.body, 'type')
        //, uploadPath = path.normalize(cfg.data + '/uploads')
 //       , file = req.files.file;
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
*/
uploadRouter = require('./public/routes/uploadRoutes')(Picture);
app.use('/api/upload', uploadRouter);

pictureRouter = require('./public/routes/pictureRoutes')(Picture);
app.use('/api/picture', pictureRouter); 
/*
app.post('/api/picture', function (req, res, next) {
  console.log(' \\\(^o^\)/ at the picture api');
  console.log(req.body.name);
  console.log(req.body.fileName);
  // console.log(req.body.picture);
  var picture = new Picture({
    name: req.body.name,
    fileName: req.body.fileName,
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
*/
app.use(function (req, res, next) {
  if (req.user) {
    res.cookie('user', JSON.stringify(req.user));
  }
  next();
});

app.post('/api/shows', function (req, res, next) {
  var apiKey = '9EF1D1E7D28FDA0B';
  var parser = xml2js.Parser({
    explicitArray: false,
    normalizeTags: true
  });
  var seriesName = req.body.showName
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/[^\w-]+/g, '');

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) next();
    else res.send(401);
  }

  async.waterfall([
    function (callback) {
      request.get('http://thetvdb.com/api/GetSeries.php?seriesname=' + seriesName, function (error, response, body) {
        if (error) return next(error);
        parser.parseString(body, function (err, result) {
          if (!result.data.series) {
            return res.send(404, { message: req.body.showName + ' was not found.' });
          }
          var seriesId = result.data.series.seriesid || result.data.series[0].seriesid;
          callback(err, seriesId);
        });
      });
    },
    function (seriesId, callback) {
      request.get('http://thetvdb.com/api/' + apiKey + '/series/' + seriesId + '/all/en.xml', function (error, response, body) {
        if (error) return next(error);
        parser.parseString(body, function (err, result) {
          var series = result.data.series;
          var episodes = result.data.episode;
          var show = new Show({
            _id: series.id,
            name: series.seriesname,
            airsDayOfWeek: series.airs_dayofweek,
            airsTime: series.airs_time,
            firstAired: series.firstaired,
            genre: series.genre.split('|').filter(Boolean),
            network: series.network,
            overview: series.overview,
            rating: series.rating,
            ratingCount: series.ratingcount,
            runtime: series.runtime,
            status: series.status,
            poster: series.poster,
            episodes: []
          });
          _.each(episodes, function (episode) {
            show.episodes.push({
              season: episode.seasonnumber,
              episodeNumber: episode.episodenumber,
              episodeName: episode.episodename,
              firstAired: episode.firstaired,
              overview: episode.overview
            });
          });
          callback(err, show);
        });
      });
    },
    function (show, callback) {
      var url = 'http://thetvdb.com/banners/' + show.poster;
      request({ url: url, encoding: null }, function (error, response, body) {
        show.poster = 'data:' + response.headers['content-type'] + ';base64,' + body.toString('base64');
        callback(error, show);
      });
    }
  ], function (err, show) {
    if (err) return next(err);
    show.save(function (err) {
      if (err) {
        if (err.code == 11000) {
          return res.send(409, { message: show.name + ' already exists.' });
        }
        return next(err);
      }
      res.send(200);
    });
  });
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
