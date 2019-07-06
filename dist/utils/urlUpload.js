"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlConf = void 0;

var _config = _interopRequireDefault(require("config"));

var urlConf = "".concat(_config.default.get('protocol'), "://").concat(_config.default.get('host'));
exports.urlConf = urlConf;