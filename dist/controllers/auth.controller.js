"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _default = {
  Login: function () {
    var _Login = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res) {
      var token, respo;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = _jsonwebtoken["default"].sign({
                id: req.user._id
              }, _config["default"].get('jwtPrivateKey'));
              respo = {
                user: req.user,
                accessToken: token
              };
              res.send(respo);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function Login(_x, _x2) {
      return _Login.apply(this, arguments);
    }

    return Login;
  }()
};
exports["default"] = _default;