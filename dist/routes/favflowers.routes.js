"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _favflowers = _interopRequireDefault(require("../controllers/favflowers.controllers"));

var _passport = require("../services/passport.service");

var express = require('express');

var router = express.Router({
  mergeParams: true
});
router.post('/:flowerId', _passport.JWTAuth, _favflowers["default"].makeFav);
router.get('/', _passport.JWTAuth, _favflowers["default"].getFav);
router["delete"]('/:flowerId', _passport.JWTAuth, _favflowers["default"].deleteFav);
module.exports = router;