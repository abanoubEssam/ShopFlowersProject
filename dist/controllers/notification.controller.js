"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _notification = require("../models/notification.models");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _default = {
  getNotification: function () {
    var _getNotification = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(req, res, next) {
      var userId, notifi;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              userId = String(req.user._id);
              console.log(userId);
              _context.next = 5;
              return _notification.NotifiModel.find({
                user: userId
              });

            case 5:
              notifi = _context.sent;
              console.log(notifi);

              if (notifi) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", res.status(404).send('there is no notification'));

            case 9:
              res.send(notifi);
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              next(_context.t0);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 12]]);
    }));

    function getNotification(_x, _x2, _x3) {
      return _getNotification.apply(this, arguments);
    }

    return getNotification;
  }()
};
exports.default = _default;