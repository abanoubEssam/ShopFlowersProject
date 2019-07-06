"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _shop = _interopRequireDefault(require("../controllers/shop.controller"));

var _passport = require("../services/passport.service");

var _multer = require("../services/multer.service");

var _flower = _interopRequireDefault(require("./flower.routes"));

var _allFlowers = _interopRequireDefault(require("./allFlowers.routes"));

var _sponsor = _interopRequireDefault(require("./sponsor.routes"));

var express = require('express');

var router = express.Router();
// why use it ?
router.use('/:shopId/flowers', _flower["default"]);
router.use('/flowers', _allFlowers["default"]);
router.use('/:shopId/flowers', _sponsor["default"]); // /shops
// shops/page?pageNumber=2&pageSize=2
// shops/page?pageNumber=2&pageSize=2
// router.get('/page'  , shopingController.findAllUsePagination);
// shops/near?lat=30&lng=45

router.get('/near', _shop["default"].findNear);
router["delete"]('/:shopId', _passport.JWTAuth, _shop["default"]["delete"]);
router.put('/:shopId', _passport.JWTAuth, _multer.upload.single('shopImage'), _shop["default"].updateShop);
router.get('/:shopId', _shop["default"].findeShopById);
router.post('/', _passport.JWTAuth, _multer.upload.single('shopImage'), _shop["default"].createShop);
router.get('/', _shop["default"].findAllUsePagination);
module.exports = router;