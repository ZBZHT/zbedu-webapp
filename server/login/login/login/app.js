var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');//处理post请求
var swig = require('swig');

var bms = require('./routes/bms');
//var login = require('./routes/login');
var api = require('./routes/api');
var home1 = require('./routes/home1');
var login1 = require('./routes/login1');
var logout1 = require('./routes/login1');
var readJson = require('./routes/readJson');
var readComments = require('./routes/readComments');

var app = express();

//设置swig模板
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('views', '../views');
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//设置session
app.use(session({
    secret: '12345',          //session ID cookie进行签名
    name: 'user',          //是cookie的name，默认：connect.sid
    cookie: {maxAge: 1000*60*30 }, //设置maxAge是30分钟
    resave: false,
    saveUninitialized: false,      // 是否自动保存未初始化的会话
    store: new MongoStore({ url: 'mongodb://127.0.0.1/db' })//设置数据库
}));

app.use(express.static(path.join(__dirname, 'public')));
//静态文件托管
app.use('/public', express.static( __dirname + 'public' ));

//app.use('/api', proxy('localhost:8080'));
//app.use('/api', proxy({ target: 'http://localhost:8080', changeOrigin: true ,}));
app.use('/', bms);
app.use('/bms', bms);
app.use('/api', api);
app.use('/home1', home1);
app.use('/login1', login1);
app.use('/logout1', logout1);
app.use('/readJson', readJson);
app.use('/readComments', readComments);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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