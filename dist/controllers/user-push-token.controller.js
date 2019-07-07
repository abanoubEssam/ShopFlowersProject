"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _userPushToken = require("../models/user-push-token.models");

var _validator = require("../services/validator.service");

var mongoose = require('mongoose');

var _default = {
  subscribe: function () {
    var _subscribe = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(req, res, next) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              (0, _validator.validate)(req.body, _userPushToken.CreateNotifiSchema);
              _context.next = 4;
              return _userPushToken.PushNotifiModel.findOneAndUpdate({
                user: req.user._id
              }, {
                $push: {
                  tokens: req.body.token
                }
              }, {
                upsert: true
              });

            case 4:
              res.status(204).send();
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              // console.log('ERROR : ', error);
              next(_context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    function subscribe(_x, _x2, _x3) {
      return _subscribe.apply(this, arguments);
    }

    return subscribe;
  }(),
  unSubscribe: function () {
    var _unSubscribe = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(req, res, next) {
      var token;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              token = req.query.token; // 422 for required fields

              if (token) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", res.status(422).send('token is required'));

            case 4:
              _context2.next = 6;
              return _userPushToken.PushNotifiModel.findOneAndUpdate({
                user: req.user._id
              }, {
                $pull: {
                  tokens: req.body.token
                }
              });

            case 6:
              res.status(204).send();
              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              next(_context2.t0);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }));

    function unSubscribe(_x4, _x5, _x6) {
      return _unSubscribe.apply(this, arguments);
    }

    return unSubscribe;
  }()
};
exports.default = _default;