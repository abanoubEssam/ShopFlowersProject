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
              _context.next = 13;
              return _flower.FlowerModel.findById(flowerId);

            case 13:
              flower = _context.sent;

              if (flower) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.status(400).send('flower not found'));

            case 16:
              if (!(String(flower.shop) !== String(shopId))) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return", res.status(403).send('you are not allowed to access this flower'));

            case 18:
              userJwt = String(req.user._id);
              shopUserId = String(shop.user);

              if (!(userJwt !== shopUserId)) {
                _context.next = 22;
                break;
              }

              return _context.abrupt("return", res.status(403).send('you have not the permission to do this operation '));

            case 22:
              // chech user of  shop of flower is equal to user in jwt  String(req.user._id)
              if (String(flower.shop) == String(shopId)) {
                flower.sponsored = true;
              }

              _context.next = 25;
              return flower.save();

            case 25:
              res.send(flower);
              _context.next = 31;
              break;

            case 28:
              _context.prev = 28;
              _context.t0 = _context["catch"](1);
              next(_context.t0);

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 28]]);
    }));

    function makeItSponsored(_x, _x2, _x3) {
      return _makeItSponsored.apply(this, arguments);
    }

    return makeItSponsored;
  }()
};
exports.default = _default;