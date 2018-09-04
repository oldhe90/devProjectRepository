var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var equipmentRouter = require('./routes/equipment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));										//处理日志
app.use(express.json());									//处理json数据
app.use(express.urlencoded({ extended: false }));			//处理url编码
app.use(cookieParser());									//处理cookie
app.use(express.static(path.join(__dirname, 'public')));	//静态服务目录

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/equipment', equipmentRouter);

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