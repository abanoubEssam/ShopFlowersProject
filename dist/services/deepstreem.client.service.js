"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var deepstream = require('deepstream.io-client-js');

var dsClient = deepstream('localhost:6020');
dsClient.login();
var _default = dsClient; // ds.event.emit( '/provider/id', userData );

exports.default = _default;