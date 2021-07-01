var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var departmentRouter = require('./routes/departmentRouter');
var usersRouter = require('./routes/userRouter');
var projectRouter = require('./routes/projectRouter');
var projectAssignRouter = require('./routes/projectAssignRouter');
var app = express();

const AuthService = require('./src/sevices/AuthService');
const { Authenticate, getToken } = require('./src/SecurityConfig/jwt-authentication');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', async function (req, res, next) {
  if (req.body.userid && req.body.password) {
    let status = await AuthService.AutherizeUser(req.body);
    if (status) {
      res.json({token:getToken(req.body)});
    } else {
      res.status(403).send({Message:'access denied invalid credentials'})
    }
  } else {
    res.status(400).send({Message:'Invalid Data'});
  }
});

app.use('/departments', Authenticate, departmentRouter);
app.use('/users', Authenticate, usersRouter);
app.use('/projects',Authenticate, projectRouter);
app.use('/projectAssign',Authenticate, projectAssignRouter);

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
