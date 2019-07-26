"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _compression = _interopRequireDefault(require("compression"));

var _helmet = _interopRequireDefault(require("helmet"));

module.exports = function (app) {
  app.use((0, _helmet["default"])());
  app.use((0, _compression["default"])());
};