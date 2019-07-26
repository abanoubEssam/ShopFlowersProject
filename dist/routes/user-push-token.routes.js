"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _userPushToken = _interopRequireDefault(require("../controllers/user-push-token.controller"));

var _passport = require("../services/passport.service");

var express = require('express');

var router = express.Router();
router.post('/subscribe', _passport.JWTAuth, _userPushToken["default"].subscribe);
router["delete"]('/unsubscribe', _passport.JWTAuth, _userPushToken["default"].unSubscribe);
module.exports = router;