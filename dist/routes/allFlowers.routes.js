"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _multer = require("../services/multer.service");

var _flower = _interopRequireDefault(require("../controllers/flower.controller"));

var _passport = require("../services/passport.service");

var express = require('express');

var router = express.Router(); // flowers

router.get('/', _flower.default.findAllFowers); // this route will be shops/flowers?pageNumber=AnyNum&pageSize=AnyNum

router.get('/flowers', _flower.default.findFlowers);
module.exports = router;