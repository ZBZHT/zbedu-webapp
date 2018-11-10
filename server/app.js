const express = require('express');
const path = require('path');
const _ = require('lodash');
const router = express.Router();
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');//处理post请求
const history = require('connect-history-api-fallback');
//const jade = require('jade');
//const swig = require('swig');

const teacherCMS = require('./routes/teacherCMS');
//var login = require('./routes/login');
const api = require('./routes/api');
const readJson = require('./routes/readJson');
const readComments = require('./routes/readComments');
const readTestQuestion = require('./routes/readTestQuestion');
const readTestQuestionInfo = require('./routes/readTestQuestionInfo');
const testManagement = require('./routes/testManagement');
const fileUpDown = require('./routes/fileUpDown');
const readResource = require('./routes/readResource');
const trainManager = require('./routes/trainManager');
//const setCourse = require('./routes/setCourse');

const app = express();

//设置swig模板引擎
/*app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('views', '../views');
app.set('view engine', 'html');*/
//app.set('view engine', 'jade'); // 设置模板引擎
//app.set('public', __dirname);  // 设置模板相对路径(相对当前目录)

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(history());
//设置session
app.use(session({
  secret: '12345',          //session ID cookie进行签名
  name: 'user',          //是cookie的name，默认：connect.sid
  cookie: {maxAge: 1000 * 60 * 180}, //设置maxAge是30分钟
  resave: false,  //每次请求都自动更新session
  saveUninitialized: false,      // 是否设置session在存储容器中可以给修改
  store: new MongoStore({
    url: 'mongodb://127.0.0.1/zbt',
    collection: 'sessions'
  })//设置数据库
}));

app.use(express.static(path.join(__dirname, 'public')));
//静态文件托管
// app.use('/public', express.static( __dirname + 'public' ));

//app.use('/api', proxy('localhost:8080'));
//app.use('/api', proxy({ target: 'http://localhost:8080', changeOrigin: true ,}));
app.use('/teacherCMS', teacherCMS);//后台管理
app.use('/api', api);                                    //登录
app.use('/readJson', readJson);                          //读取json文件
app.use('/readComments', readComments);                  //读取评论数据
app.use('/readTestQuestion', readTestQuestion);          //读取考试数据
app.use('/readTestQuestionInfo', readTestQuestionInfo);  //考试成绩
app.use('/testManagement', testManagement);              //考试管理
app.use('/fileUpDown', fileUpDown);                      //上传下载
app.use('/readResource', readResource);                  //读取ppt,视频,pdf等资源
app.use('/trainManager', trainManager);                  //物联网实训相关
//app.use('/setCourse',setCourse);//设置课程

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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
