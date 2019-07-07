"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _ajv = _interopRequireDefault(require("ajv"));

var ajv = new _ajv.default({
  allErrors: true
});

var ApiError =
/*#__PURE__*/
function (_Error) {
  (0, _inherits2.default)(ApiError, _Error);

  function ApiError(status, errorMessage) {
    var _this;

    (0, _classCallCheck2.default)(this, ApiError);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ApiError).call(this));
    _this.status = status;
    _this.message = errorMessage;
    return _this;
  }

  return ApiError;
}((0, _wrapNativeSuper2.default)(Error));

function validate(data, schema) {
  var validate = ajv.compile(schema);
  var valid = validate(data);
  if (!valid) throw new ApiError(422, validate.errors);
}