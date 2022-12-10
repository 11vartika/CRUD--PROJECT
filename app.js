var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');


var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var createRouter = require('./routes/create');
var contactRouter = require('./routes/contact');
var editorRouter = require('./routes/editor');
var loginRouter = require('./routes/login');
var modalRouter = require('./routes/modal');
var registerRouter = require('./routes/register');
var imagesRouter = require('./routes/images');
var qrRouter = require('./routes/qrcode');
var scanRouter = require('./routes/scan');
var verificationRouter = require('./routes/verification');
var tempRouter = require('./routes/template');
var pictureRouter = require('./routes/picture');
var emailRouter = require('./routes/email');
var passwordRouter = require('./routes/password');
var resetpassRouter = require('./routes/resetpass');
var resendRouter = require('./routes/resend');
var otpRouter = require('./routes/otp');

// var flash = require('connect-flash');
var flash = require('express-flash');
var app = express();

// view engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

 app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static("views"));


app.use(session({
  secret: 'flashblog',
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: 60000 }
}));

app.use(flash());
app.use(function (req, res, next) {
  res.locals.message = req.flash();
 
  next();
});


app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/create', createRouter);
app.use('/home', homeRouter);
app.use('/contact', contactRouter);
app.use('/editor', editorRouter);
app.use('/login', loginRouter);
app.use('/modal', modalRouter);
app.use('/register', registerRouter);
app.use('/images', imagesRouter);
app.use('/qrcode', qrRouter);
app.use('/scan', scanRouter);
app.use('/template', tempRouter);
app.use('/otp', otpRouter);
app.use('/picture', pictureRouter);
app.use('/password', passwordRouter);
app.use('/email', emailRouter);
app.use('/resetpass', resetpassRouter);
app.use('/resend', resendRouter);
app.use('/verification', verificationRouter);
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
