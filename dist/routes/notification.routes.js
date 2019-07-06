"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _notification = _interopRequireDefault(require("../controllers/notification.controller"));

var _passport = require("../services/passport.service");

// here call controller
var express = require('express');

var router = express.Router();
router.get('/', _passport.JWTAuth, _notification["default"].getNotification);
module.exports = router;