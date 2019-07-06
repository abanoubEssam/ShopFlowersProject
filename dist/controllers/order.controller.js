"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cart = require("../models/cart.models");

var _order = require("../models/order.models");

var _notification = require("../services/notification.service");

var _flower = require("../models/flower.models");

var _shop = require("../models/shop.models");

var _user = require("../models/user.models");

var mongoose = require('mongoose');

// import dsClient from '../services/deepstreem.client.service'
var _default = {
  makeOrder: function () {
    var _makeOrder = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res, next) {
      var userId, getCartData, shopOrders, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, flowerIdInCart, flower;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              console.log('params : ', req.params);
              userId = String(req.params.userId);
              console.log('params : ', userId);

              if (mongoose.Types.ObjectId.isValid(userId)) {
                _context2.next = 7;
                break;
              }

              console.log('please enter a valid  id for user');
              return _context2.abrupt("return", res.status(400).send('please enter a valid  id for user '));

            case 7:
              if (!(String(req.user._id) !== String(userId))) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", res.status(403).send('you are not allowed to access .'));

            case 9:
              _context2.next = 11;
              return _cart.CartModel.findOne({
                user: userId
              });

            case 11:
              getCartData = _context2.sent;
              console.log('getcart data', getCartData);

              if (getCartData) {
                _context2.next = 15;
                break;
              }

              return _context2.abrupt("return", res.status(404).send('that cart not found'));

            case 15:
              shopOrders = {};
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 19;
              _iterator = getCartData.flowers[Symbol.iterator]();

            case 21:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 32;
                break;
              }

              flowerIdInCart = _step.value;
              _context2.next = 25;
              return _flower.FlowerModel.findById(flowerIdInCart);

            case 25:
              flower = _context2.sent;
              // console.log(shopOrders[flower.shop])
              if (!shopOrders[flower.shop]) shopOrders[flower.shop] = {
                flowers: [],
                price: 0
              };
              shopOrders[flower.shop].flowers.push(flower._id);
              shopOrders[flower.shop].price += flower.price;

            case 29:
              _iteratorNormalCompletion = true;
              _context2.next = 21;
              break;

            case 32:
              _context2.next = 38;
              break;

            case 34:
              _context2.prev = 34;
              _context2.t0 = _context2["catch"](19);
              _didIteratorError = true;
              _iteratorError = _context2.t0;

            case 38:
              _context2.prev = 38;
              _context2.prev = 39;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 41:
              _context2.prev = 41;

              if (!_didIteratorError) {
                _context2.next = 44;
                break;
              }

              throw _iteratorError;

            case 44:
              return _context2.finish(41);

            case 45:
              return _context2.finish(38);

            case 46:
              Object.keys(shopOrders).forEach(
              /*#__PURE__*/
              function () {
                var _ref = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee(shopId) {
                  var shop, userName, shopOwner;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _order.orderModel.create({
                            user: userId,
                            flowers: shopOrders[shopId].flowers,
                            totalPrice: shopOrders[shopId].price,
                            shop: shopId
                          });

                        case 2:
                          _context.next = 4;
                          return _shop.ShopModel.findById(shopId);

                        case 4:
                          shop = _context.sent;
                          _context.next = 7;
                          return _user.UserModel.findById(userId);

                        case 7:
                          userName = _context.sent;
                          shopOwner = shop.user; // console.log('shop user', shop.user);
                          // console.log(' user name ', userName.name);
                          // user :  find shop by id and get its user id
                          //text : name of user ordered take an order

                          _context.next = 11;
                          return (0, _notification.sendNotifi)(shopOwner, userName.name + " make order from your shop");

                        case 11:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x4) {
                  return _ref.apply(this, arguments);
                };
              }());
              _context2.next = 49;
              return getCartData.remove();

            case 49:
              res.send();
              _context2.next = 55;
              break;

            case 52:
              _context2.prev = 52;
              _context2.t1 = _context2["catch"](0);
              next(_context2.t1);

            case 55:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 52], [19, 34, 38, 46], [39,, 41, 45]]);
    }));

    function makeOrder(_x, _x2, _x3) {
      return _makeOrder.apply(this, arguments);
    }

    return makeOrder;
  }(),
  getOrder: function () {
    var _getOrder = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res, next) {
      var userId, flowers;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              userId = String(req.params.userId);

              if (mongoose.Types.ObjectId.isValid(userId)) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", res.status(400).send('please enter a valid  id for user '));

            case 3:
              if (!(String(req.user._id) !== String(userId))) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", res.status(403).send('you are not allowed to access .'));

            case 5:
              _context3.next = 7;
              return _order.orderModel.find({
                user: userId
              }).populate('flowers');

            case 7:
              flowers = _context3.sent;
              // const getOrderData = await orderModel.findOne({user : userId} , {} , {});
              res.send(flowers);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function getOrder(_x5, _x6, _x7) {
      return _getOrder.apply(this, arguments);
    }

    return getOrder;
  }(),
  deleteOrder: function () {
    var _deleteOrder = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(req, res, next) {
      var userId, orderId, getOrderId, getOrderIdAndDelete;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              userId = String(req.params.userId);
              orderId = String(req.params.orderId);

              if (mongoose.Types.ObjectId.isValid(userId)) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", res.status(400).send('please enter a valid  id for user '));

            case 5:
              if (mongoose.Types.ObjectId.isValid(orderId)) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", res.status(400).send('please enter a valid  id for order '));

            case 7:
              if (!(String(req.user._id) !== String(userId))) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", res.status(403).send('you are not allowed to access .'));

            case 9:
              _context4.next = 11;
              return _order.orderModel.findById(orderId);

            case 11:
              getOrderId = _context4.sent;

              if (!(String(orderId) !== String(getOrderId._id))) {
                _context4.next = 14;
                break;
              }

              return _context4.abrupt("return", res.status(403).send('you are not allowed to access .'));

            case 14:
              _context4.next = 16;
              return _order.orderModel.findByIdAndDelete(orderId);

            case 16:
              getOrderIdAndDelete = _context4.sent;
              res.status(204).send(getOrderIdAndDelete);
              _context4.next = 23;
              break;

            case 20:
              _context4.prev = 20;
              _context4.t0 = _context4["catch"](0);
              next(_context4.t0);

            case 23:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 20]]);
    }));

    function deleteOrder(_x8, _x9, _x10) {
      return _deleteOrder.apply(this, arguments);
    }

    return deleteOrder;
  }()
};
exports["default"] = _default;