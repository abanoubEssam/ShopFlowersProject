"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignUpSchema = exports.validateUserOnUpdateSchema = void 0;

var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');

var config = require('config');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  creationDate: {
    type: Date
  },
  userImage: {
    type: String
  }
}, {
  toJSON: {
    // to delete some of model object 
    transform: function transform(doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
      delete ret._id;
      delete ret.password;
    }
  }
});

userSchema.methods.generateAuthToken = function () {
  var token = jwt.sign({
    id: this._id
  }, config.get('jwtPrivateKey')); // console.log('===============token ================' ,token)

  return token;
};

var UserModel = mongoose.model('User', userSchema);
var validateUserOnUpdateSchema = {
  type: "object",
  required: ['name', 'email', 'password'],
  properties: {
    name: {
      type: 'string',
      require: true,
      minlength: 4
    },
    email: {
      type: 'string',
      require: true,
      "format": "email"
    },
    password: {
      type: 'string',
      require: true,
      minlength: 6,
      maxlength: 15
    }
  }
};
exports.validateUserOnUpdateSchema = validateUserOnUpdateSchema;
var SignUpSchema = {
  type: "object",
  properties: {
    name: {
      type: 'string',
      require: true,
      minlength: 4
    },
    email: {
      type: 'string',
      require: true,
      "format": "email"
    },
    password: {
      type: 'string',
      require: true,
      minlength: 6,
      maxlength: 15
    }
  }
};
exports.SignUpSchema = SignUpSchema;
exports.UserModel = UserModel;