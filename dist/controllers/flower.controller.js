"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _flower2 = require("../models/flower.models");

var _shop = require("../models/shop.models");

var _validator = require("../services/validator.service");

var _urlUpload = require("./../utils/urlUpload");

var mongoose = require('mongoose');

var _default = {
  findAllFowers: function () {
    var _findAllFowers = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(req, res, next) {
      var flowers;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _flower2.FlowerModel.find().sort({
                sponsored: -1
              });

            case 2:
              flowers = _context.sent;
              res.send(flowers);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function findAllFowers(_x, _x2, _x3) {
      return _findAllFowers.apply(this, arguments);
    }

    return findAllFowers;
  }(),
  findFlowers: function () {
    var _findFlowers = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(req, res, next) {
      var pageNumber, pageSize, flowers;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              console.log(' el findFlowers func work ====== ');
              pageNumber = req.query.pageNumber;
              pageSize = req.query.pageSize;
              _context2.next = 6;
              return _flower2.FlowerModel.find().sort({
                sponsored: -1
              }).skip((pageNumber - 1) * pageSize).limit(Number(pageSize));

            case 6:
              flowers = _context2.sent;
              res.send(flowers);
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              next(_context2.t0);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 10]]);
    }));

    function findFlowers(_x4, _x5, _x6) {
      return _findFlowers.apply(this, arguments);
    }

    return findFlowers;
  }(),
  insertFlower: function () {
    var _insertFlower = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3(req, res, next) {
      var shopId, shop, userJwt, shopUserId, flower;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              //    console.log('insert invoked /............ ')
              shopId = req.params.shopId;
              _context3.prev = 1;

              if (mongoose.Types.ObjectId.isValid(req.params.shopId)) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt("return", res.status(400).send('to  insert flower please enter a valid  id '));

            case 4:
              _context3.next = 6;
              return _shop.ShopModel.findById(shopId);

            case 6:
              shop = _context3.sent;

              if (shop) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", res.status(400).send('shop not found'));

            case 9:
              userJwt = String(req.user._id);
              shopUserId = String(shop.user);

              if (!(userJwt !== shopUserId)) {
                _context3.next = 13;
                break;
              }

              return _context3.abrupt("return", res.status(403).send('you have not the permission to do this operation '));

            case 13:
              if (!req.file) {
                res.status(400).send('file is required !');
              }

              (0, _validator.validate)(req.body, _flower2.insertFlowerSchema);
              _context3.next = 17;
              return _flower2.FlowerModel.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                flowerImage: "".concat(_urlUpload.urlConf, "/uploads/") + req.file.originalname,
                shop: shopId
              });

            case 17:
              flower = _context3.sent;
              res.status(201).send(flower);

              if (shop) {
                shop.totalFlowersCount += 1;
              }

              _context3.next = 22;
              return shop.save();

            case 22:
              _context3.next = 27;
              break;

            case 24:
              _context3.prev = 24;
              _context3.t0 = _context3["catch"](1);
              next(_context3.t0);

            case 27:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 24]]);
    }));

    function insertFlower(_x7, _x8, _x9) {
      return _insertFlower.apply(this, arguments);
    }

    return insertFlower;
  }(),
  findFlowersByShopId: function () {
    var _findFlowersByShopId = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4(req, res, next) {
      var shopId, shop, flowers;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              //   console.log('findFlowersByShopId invoked .............../ ')
              shopId = req.params.shopId;
              _context4.prev = 1;

              if (mongoose.Types.ObjectId.isValid(req.params.shopId)) {
                _context4.next = 4;
                break;
              }

              return _context4.abrupt("return", res.status(400).send('to get flowers by shop id please enter a valid  id '));

            case 4:
              _context4.next = 6;
              return _shop.ShopModel.findById(shopId);

            case 6:
              shop = _context4.sent;

              if (shop) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", res.status(400).send('shop not found'));

            case 9:
              _context4.next = 11;
              return _flower2.FlowerModel.find({
                shop: shopId
              });

            case 11:
              flowers = _context4.sent;
              res.status(200).send(flowers);
              _context4.next = 18;
              break;

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](1);
              next(_context4.t0);

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 15]]);
    }));

    function findFlowersByShopId(_x10, _x11, _x12) {
      return _findFlowersByShopId.apply(this, arguments);
    }

    return findFlowersByShopId;
  }(),
  findFlowerById: function () {
    var _findFlowerById = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee5(req, res, next) {
      var _req$params, shopId, flowerId, shop, flower;

      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _req$params = req.params, shopId = _req$params.shopId, flowerId = _req$params.flowerId;
              _context5.prev = 1;

              if (mongoose.Types.ObjectId.isValid(req.params.shopId)) {
                _context5.next = 4;
                break;
              }

              return _context5.abrupt("return", res.status(400).send('please enter a valid  id '));

            case 4:
              if (mongoose.Types.ObjectId.isValid(req.params.flowerId)) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("return", res.status(400).send('please enter a valid  id '));

            case 6:
              _context5.next = 8;
              return _shop.ShopModel.findById(shopId);

            case 8:
              shop = _context5.sent;

              if (shop) {
                _context5.next = 11;
                break;
              }

              return _context5.abrupt("return", res.status(400).send('shop not found'));

            case 11:
              _context5.next = 13;
              return _flower2.FlowerModel.findById(flowerId);

            case 13:
              flower = _context5.sent;

              if (flower) {
                _context5.next = 16;
                break;
              }

              return _context5.abrupt("return", res.status(400).send('flower not found'));

            case 16:
              if (!(String(flower.shop) !== String(shopId))) {
                _context5.next = 18;
                break;
              }

              return _context5.abrupt("return", res.status(403).send('you are not allowed to access this flower'));

            case 18:
              res.send(flower);
              _context5.next = 24;
              break;

            case 21:
              _context5.prev = 21;
              _context5.t0 = _context5["catch"](1);
              next(_context5.t0);

            case 24:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[1, 21]]);
    }));

    function findFlowerById(_x13, _x14, _x15) {
      return _findFlowerById.apply(this, arguments);
    }

    return findFlowerById;
  }(),
  updateFlower: function () {
    var _updateFlower = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee6(req, res, next) {
      var _req$params2, shopId, flowerId, shop, flower, userJwt, shopUserId;

      return _regenerator.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _req$params2 = req.params, shopId = _req$params2.shopId, flowerId = _req$params2.flowerId;
              _context6.prev = 1;

              if (mongoose.Types.ObjectId.isValid(req.params.shopId)) {
                _context6.next = 4;
                break;
              }

              return _context6.abrupt("return", res.status(400).send('please enter a valid  id '));

            case 4:
              if (mongoose.Types.ObjectId.isValid(req.params.flowerId)) {
                _context6.next = 6;
                break;
              }

              return _context6.abrupt("return", res.status(400).send('please enter a valid  id '));

            case 6:
              (0, _validator.validate)(req.body, _flower2.validateOnUpdateFlowerSchema);
              _context6.next = 9;
              return _shop.ShopModel.findById(shopId);

            case 9:
              shop = _context6.sent;

              if (shop) {
                _context6.next = 12;
                break;
              }

              return _context6.abrupt("return", res.status(400).send('shop not found'));

            case 12:
              _context6.next = 14;
              return _flower2.FlowerModel.findById(flowerId);

            case 14:
              flower = _context6.sent;

              if (flower) {
                _context6.next = 17;
                break;
              }

              return _context6.abrupt("return", res.status(400).send('flower not found'));

            case 17:
              userJwt = String(req.user._id);
              shopUserId = String(shop.user);

              if (!(userJwt !== shopUserId)) {
                _context6.next = 21;
                break;
              }

              return _context6.abrupt("return", res.status(403).send('you have not the permission to do this operation '));

            case 21:
              if (!(String(flower.shop) !== String(shopId))) {
                _context6.next = 23;
                break;
              }

              return _context6.abrupt("return", res.status(403).send('you are not allowed to access this flower'));

            case 23:
              if (req.body.name) {
                flower.name = req.body.name;
              }

              if (req.file) {
                flower.flowerImage = "".concat(_urlUpload.urlConf, "/uploads/") + req.file.originalname;
              }

              _context6.next = 27;
              return flower.save();

            case 27:
              res.send(flower);
              _context6.next = 33;
              break;

            case 30:
              _context6.prev = 30;
              _context6.t0 = _context6["catch"](1);
              next(_context6.t0);

            case 33:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[1, 30]]);
    }));

    function updateFlower(_x16, _x17, _x18) {
      return _updateFlower.apply(this, arguments);
    }

    return updateFlower;
  }(),
  deleteFlower: function () {
    var _deleteFlower = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee7(req, res, next) {
      var _req$params3, shopId, flowerId, shop, flower, userJwt, shopUserId, _flower;

      return _regenerator.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _req$params3 = req.params, shopId = _req$params3.shopId, flowerId = _req$params3.flowerId;
              _context7.prev = 1;

              if (mongoose.Types.ObjectId.isValid(shopId)) {
                _context7.next = 4;
                break;
              }

              return _context7.abrupt("return", res.status(400).send('please enter a valid  id '));

            case 4:
              if (mongoose.Types.ObjectId.isValid(flowerId)) {
                _context7.next = 6;
                break;
              }

              return _context7.abrupt("return", res.status(400).send('please enter a valid  id '));

            case 6:
              _context7.next = 8;
              return _shop.ShopModel.findById(shopId);

            case 8:
              shop = _context7.sent;

              if (shop) {
                _context7.next = 11;
                break;
              }

              return _context7.abrupt("return", res.status(400).send('shop not found'));

            case 11:
              _context7.next = 13;
              return _flower2.FlowerModel.findById(flowerId);

            case 13:
              flower = _context7.sent;

              if (flower) {
                _context7.next = 16;
                break;
              }

              return _context7.abrupt("return", res.status(400).send('flower not found'));

            case 16:
              userJwt = String(req.user._id);
              shopUserId = String(shop.user);

              if (!(userJwt !== shopUserId)) {
                _context7.next = 20;
                break;
              }

              return _context7.abrupt("return", res.status(403).send('you have not the permission to do this operation '));

            case 20:
              if (!(String(flower.shop) !== String(shopId))) {
                _context7.next = 22;
                break;
              }

              return _context7.abrupt("return", res.status(403).send('you are not allowed to access this flower'));

            case 22:
              if (!(String(flower.shop) == String(shopId))) {
                _context7.next = 28;
                break;
              }

              _context7.next = 25;
              return _flower2.FlowerModel.findByIdAndRemove(flowerId);

            case 25:
              _flower = _context7.sent;

              if (_flower) {
                _context7.next = 28;
                break;
              }

              return _context7.abrupt("return", res.status(404).send('The shop with the given ID was not found.'));

            case 28:
              res.status(204).send('flower deleted successfuly ! ');

              if (shop) {
                shop.totalFlowersCount -= 1;
              }

              _context7.next = 32;
              return shop.save();

            case 32:
              _context7.next = 37;
              break;

            case 34:
              _context7.prev = 34;
              _context7.t0 = _context7["catch"](1);
              next(_context7.t0);

            case 37:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[1, 34]]);
    }));

    function deleteFlower(_x19, _x20, _x21) {
      return _deleteFlower.apply(this, arguments);
    }

    return deleteFlower;
  }()
};
exports.default = _default;