"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _makeDir = _interopRequireDefault(require("make-dir"));

var multer = require('multer');

// const makeDir = require('make-dir');
var destFolder = 'uploads';
var storage = multer.diskStorage({
  destination: function () {
    var _destination = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(req, file, cb) {
      var path;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _makeDir.default)(destFolder);

            case 2:
              path = _context.sent;
              cb(null, "./".concat(destFolder));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function destination(_x, _x2, _x3) {
      return _destination.apply(this, arguments);
    }

    return destination;
  }(),
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('sorry this is not image'));
  }
};

var uploadIt = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});
exports.upload = uploadIt;