"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _flower = require("../models/flower.models");

var _shop = require("../models/shop.models");

var mongoose = require('mongoose');

var _default = {
  makeItSponsored: function () {
    var _makeItSponsored = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(req, res, next) {
      var _req$params, shopId, flowerId, shop, flower, userJwt, shopUserId;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$params = req.params, shopId = _req$params.shopId, flowerId = _req$params.flowerId;
              _context.prev = 1;

              if (mongoose.Types.ObjectId.isValid(req.params.shopId)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(400).send('please enter a valid  id '));

            case 4:
              if (mongoose.Types.ObjectId.isValid(req.params.flowerId)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).send('please enter a valid  id '));

            case 6:
              _context.next = 8;
              return _shop.ShopModel.findById(shopId);

            case 8:
              shop = _context.sent;

              if (shop) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(400).send('shop not found'));

            case 11:
              console.log(shopId);
              _context.next = 14;
              return _flower.FlowerModel.findById(flowerId);

            case 14:
              flower = _context.sent;

              if (flower) {
                _context.next = 17;
                break;
              }

              return _context.abrupt("return", res.status(400).send('flower not found'));

            case 17:
              console.log(flowerId);

              if (!(String(flower.shop) !== String(shopId))) {
                _context.next = 20;
                break;
              }

              return _context.abrupt("return", res.status(403).send('you are not allowed to access this flower'));

            case 20:
              userJwt = String(req.user._id);
              shopUserId = String(shop.user);

              if (!(userJwt !== shopUserId)) {
                _context.next = 24;
                break;
              }

              return _context.abrupt("return", res.status(403).send('you have not the permission to do this operation '));

            case 24:
              // chech user of  shop of flower is equal to user in jwt  String(req.user._id)
              if (String(flower.shop) == String(shopId)) {
                flower.sponsored = true;
              }

              _context.next = 27;
              return flower.save();

            case 27:
              res.send(flower);
              _context.next = 33;
              break;

            case 30:
              _context.prev = 30;
              _context.t0 = _context["catch"](1);
              next(_context.t0);

            case 33:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 30]]);
    }));

    function makeItSponsored(_x, _x2, _x3) {
      return _makeItSponsored.apply(this, arguments);
    }

    return makeItSponsored;
  }()
};
exports.default = _default;