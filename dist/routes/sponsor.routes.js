"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sponsor = _interopRequireDefault(require("../controllers/sponsor.controller"));

var _passport = require("../services/passport.service");

var express = require('express');

var router = express.Router({
  mergeParams: true
});
router.put('/:flowerId/sponsored', _passport.JWTAuth, _sponsor["default"].makeItSponsored);
module.exports = router;