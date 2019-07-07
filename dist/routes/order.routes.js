"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _order = _interopRequireDefault(require("../controllers/order.controller"));

var _passport = require("../services/passport.service");

var express = require('express');

var router = express.Router({
  mergeParams: true
});
router.post('/', _passport.JWTAuth, _order.default.makeOrder);
router.get('/', _passport.JWTAuth, _order.default.getOrder);
router.delete('/:orderId', _passport.JWTAuth, _order.default.deleteOrder);
module.exports = router;