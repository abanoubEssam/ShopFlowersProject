"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _cart = _interopRequireDefault(require("../controllers/cart.controller"));

var _passport = require("../services/passport.service");

var express = require('express');

var router = express.Router({
  mergeParams: true
});
router.post('/:flowerId', _passport.JWTAuth, _cart.default.makeCart);
router.get('/', _passport.JWTAuth, _cart.default.getCart); // router.get('/:userId/cart/:flowerId' , JWTAuth , cartController.getCart );

router.delete('/:flowerId', _passport.JWTAuth, _cart.default.deleteFlower); // router.delete('/:userId/cart/:cartId' , JWTAuth , cartController.deleteCart);

module.exports = router;