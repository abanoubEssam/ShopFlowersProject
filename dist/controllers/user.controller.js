"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = require("../services/validator.service");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("config"));

var _urlUpload = require("./../utils/urlUpload");

var _require = require('../models/user.models'),
    UserModel = _require.UserModel,
    validateUserOnUpdateSchema = _require.validateUserOnUpdateSchema,
    SignUpSchema = _require.SignUpSchema;

var bcrypt = require('bcrypt');

// function APIErrors(req , res , next){
//     const BadRequest = res.send(message).status(400)
//     const UnAuthorized = res.status(401)
//     const Forbidden = res.status(403)
// }
function checkCurrentUser(currentUser, paramUserId) {
  if (String(currentUser._id) !== String(paramUserId)) throw new Error('sorry you are not allowed');
}

function chechPasswordLength(currentPassword) {
  var cPass = currentPassword;

  if (cPass.length < 6) {
    throw new Error('your password is less than 6 char');
  }
}

var _default = {
  findAll: function () {
    var _findAll = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(req, res, next) {
      var user;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return UserModel.find().select('name imageURL email');

            case 2:
              user = _context.sent;
              res.send(user);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function findAll(_x, _x2, _x3) {
      return _findAll.apply(this, arguments);
    }

    return findAll;
  }(),
  createUser: function () {
    var _createUser = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(req, res, next) {
      var foundUserEmail, salt, testDate, user, token;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              // console.log(req.file, '  : here is req.file');
              // console.log(req.body, ' : here is req.body');
              if (!req.file) {
                res.status(400).send('image is required !');
              }

              chechPasswordLength(req.body.password);
              (0, _validator.validate)(req.body, SignUpSchema);
              _context2.next = 6;
              return UserModel.findOne({
                email: req.body.email
              });

            case 6:
              foundUserEmail = _context2.sent;

              if (!foundUserEmail) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", next(new Error('email is duplicated')));

            case 9:
              _context2.next = 11;
              return bcrypt.genSalt(10);

            case 11:
              salt = _context2.sent;
              testDate = Date.now();
              console.log(testDate);
              _context2.t0 = UserModel;
              _context2.t1 = req.body.name;
              _context2.t2 = req.body.email;
              _context2.next = 19;
              return bcrypt.hash(req.body.password, salt);

            case 19:
              _context2.t3 = _context2.sent;
              _context2.t4 = testDate;
              _context2.t5 = "".concat(_urlUpload.urlConf, "/uploads/") + req.file.originalname;
              _context2.t6 = {
                name: _context2.t1,
                email: _context2.t2,
                password: _context2.t3,
                creationDate: _context2.t4,
                userImage: _context2.t5
              };
              _context2.next = 25;
              return _context2.t0.create.call(_context2.t0, _context2.t6);

            case 25:
              user = _context2.sent;
              // console.log('user ******  ' , user);
              token = _jsonwebtoken.default.sign({
                id: user._id
              }, _config.default.get('jwtPrivateKey'));
              console.log('token == ** == : ', token);
              res.send({
                user: user,
                accessToken: token
              });
              _context2.next = 34;
              break;

            case 31:
              _context2.prev = 31;
              _context2.t7 = _context2["catch"](0);
              res.status(400).send(_context2.t7.message);

            case 34:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 31]]);
    }));

    function createUser(_x4, _x5, _x6) {
      return _createUser.apply(this, arguments);
    }

    return createUser;
  }(),
  // delete user using id
  delete: function () {
    var _delete2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3(req, res, next) {
      var user;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              checkCurrentUser(req.user, req.params.userId);
              _context3.next = 4;
              return UserModel.findByIdAndRemove(req.params.userId);

            case 4:
              user = _context3.sent;

              if (user) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", res.status(404).send('The user with the given ID was not found.'));

            case 7:
              // the user deleted successfuly and there is no content to shown(204)
              res.status(204).send('user deleted successfuly');
              _context3.next = 13;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](0);
              next(_context3.t0);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 10]]);
    }));

    function _delete(_x7, _x8, _x9) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }(),
  // update user name
  updateUser: function () {
    var _updateUser = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4(req, res, next) {
      var updateData, salt, user;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              // check if user id in token = to user id in params
              checkCurrentUser(req.user, req.params.userId);
              chechPasswordLength(req.body.password);
              console.log(req.body);
              (0, _validator.validate)(req.body, validateUserOnUpdateSchema);
              updateData = {};

              if (req.body.name) {
                updateData.name = req.body.name;
              }

              if (req.body.email) {
                updateData.email = req.body.email;
              }

              if (!req.body.password) {
                _context4.next = 15;
                break;
              }

              _context4.next = 11;
              return bcrypt.genSalt(10);

            case 11:
              salt = _context4.sent;
              _context4.next = 14;
              return bcrypt.hash(req.body.password, salt);

            case 14:
              updateData.password = _context4.sent;

            case 15:
              if (req.file) {
                updateData.userImage = "".concat(_urlUpload.urlConf, "/uploads/") + req.file.originalname;
              }

              _context4.next = 18;
              return UserModel.findOneAndUpdate({
                _id: req.params.userId
              }, updateData, {
                new: true
              });

            case 18:
              user = _context4.sent;

              if (user) {
                _context4.next = 21;
                break;
              }

              return _context4.abrupt("return", res.status(404).send('The user with the given ID was not found.'));

            case 21:
              res.send(user);
              _context4.next = 27;
              break;

            case 24:
              _context4.prev = 24;
              _context4.t0 = _context4["catch"](0);
              next(_context4.t0);

            case 27:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 24]]);
    }));

    function updateUser(_x10, _x11, _x12) {
      return _updateUser.apply(this, arguments);
    }

    return updateUser;
  }(),
  // find user by id
  findUserById: function () {
    var _findUserById = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee5(req, res, next) {
      var user;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;

              if (_mongoose.default.Types.ObjectId.isValid(req.params.userId)) {
                _context5.next = 3;
                break;
              }

              return _context5.abrupt("return", res.status(400).send('please enter a valid  id '));

            case 3:
              _context5.next = 5;
              return UserModel.findById(req.params.userId);

            case 5:
              user = _context5.sent;

              if (user) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", res.status(404).send('The user with the given ID was not found.'));

            case 8:
              // the user deleted successfuly and there is no content to shown(204)
              res.status(200).send(user);
              _context5.next = 14;
              break;

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](0);
              next(_context5.t0);

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 11]]);
    }));

    function findUserById(_x13, _x14, _x15) {
      return _findUserById.apply(this, arguments);
    }

    return findUserById;
  }()
};
exports.default = _default;