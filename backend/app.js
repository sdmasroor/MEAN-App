var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var emailRouter = require('./routes/email');
var cors= require('cors');
var app = express();

app.use(cors({
  origin:['http://localhost:4200','http://127.0.0.1:4200'],
  credentials:true
}));

var mongoose =require('mongoose');

//connect mongodb
mongoose.connect('mongodb://localhost:27017/login');


//on connection
mongoose.connection.on('connected',()=>{
  console.log('mongodb connected successfully at port 27017');

});

//passport
var passport = require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
  name:'myname.sid',
  resave:false,
  saveUninitialized:false,
  secret:'secret',
  cookie:{
    maxAge:36000000,
    httpOnly:false,
    secure:false
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());


//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/emails', emailRouter);
const PORT= 5000;
 // app.post('/users/register',(req,res)=>{
 //   res.json({hi:'some changes'});
 // });

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
app.listen(PORT,()=>{
  console.log('server started at port '+PORT);
});

module.exports = app;
