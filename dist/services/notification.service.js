"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendNotifi = sendNotifi;
exports.sendPushNotifi = sendPushNotifi;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var admin = _interopRequireWildcard(require("firebase-admin"));

var _userPushToken = require("../models/user-push-token.models");

var _notification = require("../models/notification.models");

var serviceAccount = require("../../demoapp-36a8a-firebase-adminsdk-lif7y-5061a110a8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://demoapp-36a8a.firebaseio.com"
});

function sendNotifi(_x, _x2) {
  return _sendNotifi.apply(this, arguments);
}

function _sendNotifi() {
  _sendNotifi = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(user, text) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _notification.NotifiModel.create({
              user: user,
              text: text
            });

          case 2:
            sendPushNotifi(user, text);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sendNotifi.apply(this, arguments);
}

function sendPushNotifi(_x3, _x4) {
  return _sendPushNotifi.apply(this, arguments);
}

function _sendPushNotifi() {
  _sendPushNotifi = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(user, text) {
    var documentToken, message;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _userPushToken.PushNotifiModel.findOne({
              user: user
            });

          case 2:
            documentToken = _context2.sent;

            if (documentToken) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return");

          case 5:
            message = {
              notification: {
                title: 'اشعار جديد',
                body: text
              },
              data: {
                text: text
              },
              tokens: documentToken.tokens
            };
            admin.messaging().sendMulticast(message).then(function (response) {
              console.log(response.successCount + ' messages were sent successfully');
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _sendPushNotifi.apply(this, arguments);
}