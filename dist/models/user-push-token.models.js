"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PushNotifiModel = exports.CreateNotifiSchema = void 0;

var mongoose = require('mongoose');

var userPushToken = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tokens: {
    type: [String]
  }
});
var CreateNotifiSchema = {
  type: "object",
  required: ['token'],
  properties: {
    token: {
      type: 'string'
    }
  }
};
exports.CreateNotifiSchema = CreateNotifiSchema;
var PushNotifiModel = mongoose.model('PushNotification', userPushToken);
exports.PushNotifiModel = PushNotifiModel;