"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JWTAuth = exports.AuthLocal = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _config = _interopRequireDefault(require("config"));

var _mongoose = require("mongoose");

var _require = require('../models/user.models'),
    UserModel = _require.UserModel;

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
},
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(username, password, done) {
    var user, validPassword;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return UserModel.findOne({
              email: username
            });

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", done(null, false, {
              message: 'Incorrect username.'
            }));

          case 5:
            _context.next = 7;
            return _bcrypt["default"].compare(password, user.password);

          case 7:
            validPassword = _context.sent;

            if (validPassword) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", done(new Error('invalid email or password!!!!')));

          case 10:
            return _context.abrupt("return", done(null, user));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()));
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = _config["default"].get('jwtPrivateKey');
passport.use(new JwtStrategy(opts,
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(jwt_payload, done) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return UserModel.findById(jwt_payload.id);

          case 2:
            user = _context2.sent;

            if (!user) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", done(null, user));

          case 7:
            return _context2.abrupt("return", done(new Error('invalid token')));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}())); // jwt passport strategy ends here

var AuthLocal = passport.authenticate('local', {
  session: false
});
exports.AuthLocal = AuthLocal;
var JWTAuth = passport.authenticate('jwt', {
  session: false
});
exports.JWTAuth = JWTAuth;