"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _favflowers = require("../models/favflowers.models");

var _flower = require("../models/flower.models");

var mongoose = require('mongoose'); // const Loc = mongoose.model('Location');


var _default = {
  makeFav: function () {
    var _makeFav = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res, next) {
      var flowerId, userId, flower, favFlower;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              flowerId = String(req.params.flowerId);
              userId = String(req.params.userId);

              if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", res.status(400).send('please enter a valid  id '));

            case 5:
              if (mongoose.Types.ObjectId.isValid(req.params.flowerId)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.status(400).send('please enter a valid  id '));

            case 7:
              _context.next = 9;
              return _flower.FlowerModel.findById(flowerId);

            case 9:
              flower = _context.sent;
              console.log(flowerId);

              if (flower) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", res.status(404).send('flower not found'));

            case 13:
              if (!(String(req.user._id) !== String(userId))) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", res.status(403).send('you are not allowed to access .'));

            case 15:
              _context.next = 17;
              return _favflowers.FavModel.findOneAndUpdate({
                flower: flowerId,
                user: userId
              }, {}, {
                upsert: true,
                "new": true
              });

            case 17:
              favFlower = _context.sent;
              res.send(favFlower);
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

    function makeFav(_x, _x2, _x3) {
      return _makeFav.apply(this, arguments);
    }

    return makeFav;
  }(),
  getFav: function () {
    var _getFav = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res, next) {
      var userId, favFlowers;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userId = String(req.params.userId);
              _context2.prev = 1;

              if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", res.status(400).send('please enter a valid  id '));

            case 4:
              if (!(String(req.user._id) !== String(userId))) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", res.status(403).send('you are not allowed to access .'));

            case 6:
              _context2.next = 8;
              return _favflowers.FavModel.find({
                user: userId
              }).populate('flower');

            case 8:
              favFlowers = _context2.sent;
              // if (!flowers) return res.status(400).send('there is no flowers');
              res.send(favFlowers);
              _context2.next = 15;
              break;

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](1);
              next(_context2.t0);

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 12]]);
    }));

    function getFav(_x4, _x5, _x6) {
      return _getFav.apply(this, arguments);
    }

    return getFav;
  }(),
  deleteFav: function () {
    var _deleteFav = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res, next) {
      var flowerId, userId, flower, deleteFlower;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              flowerId = String(req.params.flowerId);
              userId = String(req.params.userId);

              if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", res.status(400).send('please enter a valid  id '));

            case 5:
              if (mongoose.Types.ObjectId.isValid(req.params.flowerId)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", res.status(400).send('please enter a valid  id '));

            case 7:
              if (!(String(req.user._id) !== userId)) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", res.status(403).send('you are not allowed to access .'));

            case 9:
              _context3.next = 11;
              return _flower.FlowerModel.findById(flowerId).populate('shop');

            case 11:
              flower = _context3.sent;
              console.log(flowerId);

              if (flower) {
                _context3.next = 15;
                break;
              }

              return _context3.abrupt("return", res.status(404).send('flower not found'));

            case 15:
              console.log('test  0 :', flower.shop.user);
              console.log(userId); // if (flower.shop.user == userId) {
              //     console.log(flower.shop.user );
              //     const deleteFlower = await FavModel.findOneAndRemove(flowerId);
              //     console.log('successed')
              //     if(!deleteFlower) return res.status(404).send('The flower with the given ID was not found.');
              // }

              _context3.next = 19;
              return _favflowers.FavModel.findOneAndRemove({
                user: userId,
                flower: flowerId
              });

            case 19:
              deleteFlower = _context3.sent;

              if (deleteFlower) {
                _context3.next = 22;
                break;
              }

              return _context3.abrupt("return", res.status(404).send('The flower with the given ID was not found.'));

            case 22:
              console.log('deleted successfully');
              res.status(204).send();
              _context3.next = 29;
              break;

            case 26:
              _context3.prev = 26;
              _context3.t0 = _context3["catch"](0);
              next(_context3.t0);

            case 29:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 26]]);
    }));

    function deleteFav(_x7, _x8, _x9) {
      return _deleteFav.apply(this, arguments);
    }

    return deleteFav;
  }()
};
exports["default"] = _default;