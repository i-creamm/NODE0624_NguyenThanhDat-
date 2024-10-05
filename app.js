var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const flash = require('express-flash');
const session = require('express-session')

var expressLayouts = require('express-ejs-layouts');
var MainDB = require('./src/apps/database/init_main_db');

MainDB.connection();
var app = express();

app.use(express.urlencoded({ extended: true }));

// Configure session and flash middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());


// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');


app.set('layout', 'admin')

app.use(expressLayouts);
__pathImage = __dirname + '/public/uploads'
app.use('/uploads', express.static(path.join(__dirname, '/public/uploads')));

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./src/routes'));


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
  // res.render('error' , {layout: "frontend"});
});

module.exports = app;
