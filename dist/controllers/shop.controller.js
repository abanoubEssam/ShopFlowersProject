"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _validator = require("../services/validator.service");

var _require = require('../models/shop.models'),
    ShopModel = _require.ShopModel,
    validateOnUpdateSchema = _require.validateOnUpdateSchema,
    CreateShopSchema = _require.CreateShopSchema,
    GeoSchema = _require.GeoSchema;

var mongoose = require('mongoose'); // const Loc = mongoose.model('Location');


var _default = {
  // async findAll(req, res , next){
  //     try {
  //         const shops = await ShopModel.find().select('name shopImage');
  //         res.send(shops);
  //     } catch (error) {
  //         next(error);
  //     }
  // },
  findAllUsePagination: function () {
    var _findAllUsePagination = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(req, res, next) {
      var pageNumber, pageSize, shops, countShop, remainingShops, pageCount;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // console.log(shops.length);
              pageNumber = Number(req.query.pageNumber) || 1;
              pageSize = Number(req.query.pageSize) || 5;
              _context.prev = 2;
              _context.next = 5;
              return ShopModel.find().skip((pageNumber - 1) * pageSize).limit(pageSize);

            case 5:
              shops = _context.sent;
              _context.next = 8;
              return ShopModel.count();

            case 8:
              countShop = _context.sent;
              // console.log('all shops : ', countShop);
              remainingShops = Math.ceil(countShop - pageSize); // console.log('remaining pages : ', Math.ceil(remainingShops / pageSize))

              pageCount = Math.ceil(countShop / pageSize);
              res.send({
                data: shops,
                pageNumber: pageNumber,
                pageSize: pageSize,
                totalCount: countShop,
                pageCount: pageCount
              });
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](2);
              next(_context.t0);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 14]]);
    }));

    function findAllUsePagination(_x, _x2, _x3) {
      return _findAllUsePagination.apply(this, arguments);
    }

    return findAllUsePagination;
  }(),
  // to find nearest shop
  findNear: function () {
    var _findNear = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(req, res, next) {
      var radius, lng, lat, shops;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              radius = req.query.radius || 10;
              lng = req.query.lng;
              lat = req.query.lat;

              if (!(!lng || !lat)) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", res.status(400).send('please lng lat is req'));

            case 6:
              _context2.next = 8;
              return ShopModel.find({
                "geometry": {
                  "$nearSphere": {
                    "$geometry": {
                      "type": "Point",
                      "coordinates": [lng, lat]
                    },
                    $maxDistance: radius * 1000
                  }
                }
              });

            case 8:
              shops = _context2.sent;
              res.send(shops);
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              next(_context2.t0);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 12]]);
    }));

    function findNear(_x4, _x5, _x6) {
      return _findNear.apply(this, arguments);
    }

    return findNear;
  }(),
  createShop: function () {
    var _createShop = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3(req, res) {
      var shop;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;

              if (!req.file) {
                res.status(400).send('file is required !');
              }

              (0, _validator.validate)(req.body, CreateShopSchema); // console.log('shop model : ' , ShopModel , ' : this is a shop model console');

              _context3.next = 5;
              return ShopModel.create({
                name: req.body.name,
                shopImage: 'http://localhost:3000/uploads/' + req.file.originalname,
                user: req.user._id,
                geometry: {
                  type: "Point",
                  coordinates: [req.body.geometryLng, req.body.geometryLat]
                }
              });

            case 5:
              shop = _context3.sent;
              res.status(201).send(shop);
              _context3.next = 11;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9]]);
    }));

    function createShop(_x7, _x8) {
      return _createShop.apply(this, arguments);
    }

    return createShop;
  }(),
  // delete shop using id
  delete: function () {
    var _delete2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4(req, res, next) {
      var shop;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;

              if (mongoose.Types.ObjectId.isValid(req.params.shopId)) {
                _context4.next = 3;
                break;
              }

              return _context4.abrupt("return", res.status(400).send('please enter a valid  id '));

            case 3:
              _context4.next = 5;
              return ShopModel.findByIdAndRemove(req.params.shopId);

            case 5:
              shop = _context4.sent;

              if (shop) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", res.status(404).send('The shop with the given ID was not found.'));

            case 8:
              if (!(String(req.user._id) !== String(shop.user))) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", res.status(403).send('you are not allowed to access .'));

            case 10:
              res.status(204).send('deleted successfuly ! ');
              _context4.next = 16;
              break;

            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](0);
              next(_context4.t0);

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 13]]);
    }));

    function _delete(_x9, _x10, _x11) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }(),
  // update shop name
  updateShop: function () {
    var _updateShop = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee5(req, res, next) {
      var shop;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;

              if (mongoose.Types.ObjectId.isValid(req.params.shopId)) {
                _context5.next = 3;
                break;
              }

              return _context5.abrupt("return", res.status(400).send('please enter a valid  id '));

            case 3:
              (0, _validator.validate)(req.body, validateOnUpdateSchema); // const { error } = validateOnUpdate(req.body);
              // if (error) return res.status(400).send(error.details[0].message);

              _context5.next = 6;
              return ShopModel.findById(req.params.shopId);

            case 6:
              shop = _context5.sent;

              if (shop) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt("return", res.status(404).send('The genre with the given ID was not found.'));

            case 9:
              if (!(String(req.user._id) !== String(shop.user))) {
                _context5.next = 11;
                break;
              }

              return _context5.abrupt("return", res.status(403).send('you are not allowed to access .'));

            case 11:
              if (req.body.name) {
                shop.name = req.body.name;
              }

              if (Number(req.body.geometryLng) && Number(req.body.geometryLat)) {
                shop.geometry.coordinates = [Number(req.body.geometryLng), Number(req.body.geometryLat)];
              }

              if (req.file) {
                shop.shopImage = 'http://localhost:3000/uploads/' + req.file.originalname;
              }

              _context5.next = 16;
              return shop.save();

            case 16:
              res.send(shop);
              _context5.next = 22;
              break;

            case 19:
              _context5.prev = 19;
              _context5.t0 = _context5["catch"](0);
              next(_context5.t0);

            case 22:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 19]]);
    }));

    function updateShop(_x12, _x13, _x14) {
      return _updateShop.apply(this, arguments);
    }

    return updateShop;
  }(),
  // find shop by id
  findeShopById: function () {
    var _findeShopById = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee6(req, res, next) {
      var shop;
      return _regenerator.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return ShopModel.findById(req.params.shopId);

            case 3:
              shop = _context6.sent;

              if (shop) {
                _context6.next = 6;
                break;
              }

              return _context6.abrupt("return", res.status(404).send('The shop with the given ID was not found.'));

            case 6:
              // the shop deleted successfuly and there is no content to shown(204)
              res.status(200).send(shop);
              _context6.next = 12;
              break;

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](0);
              next(_context6.t0);

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 9]]);
    }));

    function findeShopById(_x15, _x16, _x17) {
      return _findeShopById.apply(this, arguments);
    }

    return findeShopById;
  }()
};
exports.default = _default;