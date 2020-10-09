require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')

const environment = process.env.NODE_ENV
const stage = require('./config')[environment]
const dbConnect = require('./dbConnect')()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/uploadRouter');

var app = express();

//accepting secure traffic only
app.all('*', (req, res, next) => {
	if(req.secure) {
		return next()
	}
	else {
		res.redirect(307, 'https://' + req.hostname + ":" + app.get('securePort') + req.url)
	}
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (environment != 'production') {
	app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(passport.initialize())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/imageUpload', uploadRouter);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;