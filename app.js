var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const favicon = require('serve-favicon');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
// 加載 .env 環境變數配置文件
require('dotenv').config();

// 載入 Router
var indexRouter = require('./routes/index');
var memberRouter = require('./routes/memberRouter');

var app = express();

//firebase-admin
var admin = require("firebase-admin");
const { privateKey } = JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: privateKey,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
global.admin = admin; //設定全域引用
global.db = admin.firestore(); //設定全域引用

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));


// Router
app.use('/', indexRouter);
app.use('/api/v1/member', memberRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
