var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const { Sequelize } = require('sequelize');
var middleware = require('./middleware/middleware');



// Database
var database = require('./database/database.js');
var db = database.db;
require('./model/user');
require('./model/game');
require('./model/category');


//function Middleware
function logger(req,res,next)
{
    console.log("log");
    next();
}


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
  console.log('Database connection has been established successfully.');

} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use(logger);
// Setup routes
app.use('/', pageRouter.get('/'));
app.use('/login', pageRouter.get('/user/signin'));

// API routes
app.use('/api/', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(res.status(404).render('error/404.html'));
});

// error handler
app.use(function (req, res) {
  console.log(req);
  console.log(res);
  // render the error page
  res.status(500).render('error/500.html');
});

module.exports = app;
