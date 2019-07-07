"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var _multer = require("../services/multer.service");

var _passport = require("../services/passport.service");

var _favflowers = _interopRequireDefault(require("./favflowers.routes"));

var _cart = _interopRequireDefault(require("./cart.routes"));

var _order = _interopRequireDefault(require("./order.routes"));

var express = require('express');

var router = express.Router();
router.use('/:userId/favourites', _favflowers.default);
router.use('/:userId/orders', _order.default);
router.use('/:userId/cart', _cart.default);
router.get('/', _user.default.findAll);
router.post('/', _multer.upload.single('userImage'), _user.default.createUser);
router.delete('/:userId', _passport.JWTAuth, _user.default.delete);
router.put('/:userId', _passport.JWTAuth, _multer.upload.single('userImage'), _user.default.updateUser);
router.get('/:userId', _passport.JWTAuth, _user.default.findUserById);
module.exports = router;