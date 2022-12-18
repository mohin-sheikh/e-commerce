const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const app = express();

app.use(fileUpload({ createParentPath: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Configuration (NoSql)
const { database } = require('./config/db.config');
database();

// Router

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


require("./routes")(app, express);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res['locals'].message = err['message'];
  res['locals'].error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res['status'](err['status'] || 500);
  res['render']('error');
});

const host = "0.0.0.0" || process.env.HOST;
const port = 3000 || process.env.PORT;
app.listen(port, host, function () {
  console.log(`🚀 Server started at http://localhost:${process.env.PORT}`);
})
