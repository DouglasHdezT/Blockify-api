var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index.router');
const database = require("./config/database");
const { limiter } = require("./config/rateLimiter");

var app = express();
database.connect();

app.use(cors());
app.set('trust proxy', 1);

app.use(limiter)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
