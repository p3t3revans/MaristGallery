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

var Picture = require('./public/models/pictureModel');

var Artist = require('./public/models/artistModel');

var Subject = require('./public/models/subjectModel');

var User = require('./public/models/userModel');

var multipart = require('connect-multiparty');


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

//this was needed for the loading of images
//don't lose this
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

//console.log('limit file size = ' +limit);
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

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

pictureRouter = require('./public/routes/pictureRoutes')(Picture);
app.use('/api/picture', pictureRouter); 

artistRouter = require('./public/routes/artistRouter')(Artist);
app.use('/api/artist', artistRouter); 

subjectRouter = require('./public/routes/subjectRoutes')(Subject);
app.use('/api/subject', subjectRouter); 

deletePictureRouter = require('./public/routes/deletePictureRoutes')(Picture);
app.use('/api/picture', deletePictureRouter); 

app.use(function (req, res, next) {
  if (req.user) {
    res.cookie('user', JSON.stringify(req.user));
  }
  next();
});
//the following bit of code gets around the problem of 
//the page showing a could not get display
//it re routes to the page you where on after a restart
app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.send(500, { message: err.message });
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
