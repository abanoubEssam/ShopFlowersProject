"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _multer = require("../services/multer.service");

var _flower = _interopRequireDefault(require("../controllers/flower.controller"));

var _passport = require("../services/passport.service");

var express = require('express');

var router = express.Router({
  mergeParams: true
}); // import shopRoute from './shop.routes'
// router.use('/shops' ,  shopRoute);
// flowers
// router.get('/', flowersController.findAllFowers);
// this route will be shops/flowers?pageNumber=AnyNum&pageSize=AnyNum
// router.get('/', flowersController.findFlowers);
// shops/:shopId/flowers
// shops/:shopId/flowers/:flowerId

router.get('/:flowerId', _flower["default"].findFlowerById);
router.put('/:flowerId', _passport.JWTAuth, _multer.upload.single('flowerImage'), _flower["default"].updateFlower);
router["delete"]('/:flowerId', _passport.JWTAuth, _flower["default"].deleteFlower);
router.post('/', _passport.JWTAuth, _multer.upload.single('flowerImage'), _flower["default"].insertFlower);
router.get('/', _flower["default"].findFlowersByShopId);
module.exports = router;