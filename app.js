var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// require('./lib/common');
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

let mode = 'dev';
let prodArg = false;

for (let i in process.argv) {
  if (process.argv[i] === '--prod')
    prodArg = true;

  if (process.argv[i] === '--dev')
    prodArg = false;
}

if (process.env.NODE_ENV === 'dev' && !prodArg) {
  console.log('server run as development mode');
  // global.Connections  = require('./config/connections.dev.js');
  global.Config = config = require('./config/config.dev.js');
}

if (prodArg || process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
  console.log('server run as production mode');
  // global.Connections = require('./config/connections.prod.js');
  global.Config = config = require('./config/config.prod.js');
  mode = 'prod';
}

global.Mode = mode;

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
// multer 库完成文件保存
var multer = require("multer");
// 这里dest对应的值是你要将上传的文件保存的文件夹
var fileSavePath = './public/uploads'
var upload = multer({ dest: fileSavePath });
// 文件上传api配置
app.post("/upload", upload.single('file'), (req, res) => {

  // req.file 是 'file' 文件的信息 （前端传递的文件类型在req.file中获取）
  // 重命名文件名为真实名字
  fs.rename(fileSavePath + '/' + req.file.filename, fileSavePath + '/' + req.file.originalname, function (err, doc) {
    if (err) {
      return;
    }
    res.send(req.file.originalname)
  })
  return;

})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
