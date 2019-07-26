"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _passport = _interopRequireDefault(require("passport"));

var _config = _interopRequireDefault(require("config"));

var swaggerDocs = require('./services/swaggerDocs.service');

var mongoose = require('mongoose');

var shops = require('./routes/shop.routes');

var User = require('./routes/user.routes');

var auth = require('./routes/auth.routes');

var globalFlowers = require('./routes/allFlowers.routes');

var pushNotification = require('./routes/user-push-token.routes');

var Notification = require('./routes/notification.routes');

var express = require('express');

var app = express();
swaggerDocs(app);

var db = _config["default"].get('db');

mongoose.connect(db, {
  useNewUrlParser: true
}).then(function () {
  return console.log("Connected to ".concat(db, "..."));
})["catch"](function (err) {
  return console.error("Could not connect to ".concat(db, "..."));
});

require('./services/prod')(app);

app.use(express.json());
app.use(_passport["default"].initialize());
app.use('/uploads', express["static"](_path["default"].join(__dirname, '..', 'uploads')));
app.use('/api/shops', shops);
app.use('/api/flowers', globalFlowers);
app.use('/api/users', User);
app.use('/api/notification', Notification);
app.use('/api/push-notifications', pushNotification);
app.use('/api/auth', auth);
app.use(function (req, res, next) {
  console.log('Method', req.method);
  console.log('ROUTE: ', req.route);
  next();
});
app.use(function (err, req, res, next) {
  console.log('/////////////////////======*****', err, '*****=========\\\\\\\\\\\\ ');
  res.status(err.status || 400).send(err.message);
});
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  return console.log("listen to ".concat(port));
});
module.exports = server;