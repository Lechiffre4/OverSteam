var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
const { Sequelize } = require('sequelize');

// Database
var database = require('./database/database.js');
var db = database.db;
require('./model/user');


// Routers
var apiRouter = require('./routes/apiRouter').router;
var pageRouter = require('./routes/pageRouter');

var app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Database connection test
try {
  db.authenticate();
  console.log('Connection has been established successfully.');

} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Setup routes
app.use('/', pageRouter.get('/'));
app.use('/login', pageRouter.get('/user/signin'));

// API routes
app.use('/api/', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
