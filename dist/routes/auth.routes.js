"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _auth = _interopRequireDefault(require("../controllers/auth.controller"));

var _passport = require("../services/passport.service");

var express = require('express');

var router = express.Router();
router.post('/', _passport.AuthLocal, _auth.default.Login);
module.exports = router;