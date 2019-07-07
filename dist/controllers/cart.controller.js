"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cart = require("../models/cart.models");

var _flower = require("../models/flower.models");

var mongoose = require('mongoose'); // const Loc = mongoose.model('Location');


var _default = {
  makeCart: function () {
    var _makeCart = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(req, res, next) {
      var flowerId, userId, flower, updateData, Cart;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              flowerId = String(req.params.flowerId);
              userId = String(req.params.userId); // console.log('flowerId' ,flowerId);
              // console.log('userId' , userId);

              if (mongoose.Types.ObjectId.isValid(userId)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", res.status(400).send('please enter a valid  id for user '));

            case 5:
              if (mongoose.Types.ObjectId.isValid(req.params.flowerId)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.status(400).send('please enter a valid  id for flower '));

            case 7:
              _context.next = 9;
              return _flower.FlowerModel.findById(flowerId);

            case 9:
              flower = _context.sent;

              if (flower) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.status(404).send('flower not found'));

            case 12:
              if (!(String(req.user._id) !== String(userId))) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", res.status(403).send('you are not allowed to access .'));

            case 14:
              updateData = {
                $push: {
                  flowers: flowerId
                },
                $inc: {
                  totalPrice: +flower.price
                } // console.log(flower);

              };
              _context.next = 17;
              return _cart.CartModel.findOneAndUpdate({
                user: userId
              }, updateData, {
                upsert: true,
                new: true
              });

            case 17:
              Cart = _context.sent;
              res.send(Cart);
              _context.next = 24;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](0);
              next(_context.t0);

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 21]]);
    }));

    function makeCart(_x, _x2, _x3) {
      return _makeCart.apply(this, arguments);
    }

    return makeCart;
  }(),
  getCart: function () {
    var _getCart = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(req, res, next) {
      var userId, flower;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              userId = String(req.params.userId);

              if (mongoose.Types.ObjectId.isValid(userId)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", res.status(400).send('please enter a valid  id for user '));

            case 4:
              _context2.next = 6;
              return _cart.CartModel.find({
                user: userId
              }).populate('flowers');

            case 6:
              flower = _context2.sent;

              if (!(String(req.user._id) !== String(userId))) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", res.status(403).send('you are not allowed to access .'));

            case 9:
              // const favFlowers = await FavModel.find({ user: userId }).populate('flower');
              res.send(flower);
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

    function getCart(_x4, _x5, _x6) {
      return _getCart.apply(this, arguments);
    }

    return getCart;
  }(),
  deleteFlower: function () {
    var _deleteFlower = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3(req, res, next) {
      var flowerId, userId, flower, cartUser, cartUserFlowersLength, i;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              flowerId = String(req.params.flowerId);
              userId = String(req.params.userId);

              if (mongoose.Types.ObjectId.isValid(userId)) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", res.status(400).send('please enter a valid  id for user '));

            case 5:
              if (mongoose.Types.ObjectId.isValid(req.params.flowerId)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", res.status(400).send('please enter a valid  id for flower '));

            case 7:
              _context3.next = 9;
              return _flower.FlowerModel.findById(flowerId);

            case 9:
              flower = _context3.sent;

              if (flower) {
                _context3.next = 12;
                break;
              }

              return _context3.abrupt("return", res.status(404).send('flower not found'));

            case 12:
              if (!(String(req.user._id) !== String(userId))) {
                _context3.next = 14;
                break;
              }

              return _context3.abrupt("return", res.status(403).send('you are not allowed to access .'));

            case 14:
              _context3.next = 16;
              return _cart.CartModel.findOne({
                user: userId
              });

            case 16:
              cartUser = _context3.sent;
              //check if cartUser is exist
              cartUserFlowersLength = cartUser.flowers.length;
              i = 0;

            case 19:
              if (!(i < cartUserFlowersLength)) {
                _context3.next = 28;
                break;
              }

              console.log(cartUser.flowers[i], flowerId);

              if (!(String(cartUser.flowers[i]) === flowerId)) {
                _context3.next = 25;
                break;
              }

              console.log("IM INVOKED..");
              cartUser.flowers.splice(i, 1);
              return _context3.abrupt("break", 28);

            case 25:
              i++;
              _context3.next = 19;
              break;

            case 28:
              if (!(cartUserFlowersLength === cartUser.flowers.length)) {
                _context3.next = 30;
                break;
              }

              return _context3.abrupt("return", res.send('flower not exist in your cart'));

            case 30:
              cartUser.totalPrice -= flower.price; // const rflower = await CartModel.findByIdAndRemove(flowerId);
              // console.log(rflower);
              // console.log(Cart);

              _context3.next = 33;
              return cartUser.save();

            case 33:
              res.status(201).send(cartUser);
              console.log('deleted successfully');
              _context3.next = 40;
              break;

            case 37:
              _context3.prev = 37;
              _context3.t0 = _context3["catch"](0);
              next(_context3.t0);

            case 40:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 37]]);
    }));

    function deleteFlower(_x7, _x8, _x9) {
      return _deleteFlower.apply(this, arguments);
    }

    return deleteFlower;
  }()
};
exports.default = _default;