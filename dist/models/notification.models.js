"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotifiModel = void 0;

var mongoose = require('mongoose');

var notifiSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String
  }
}, {
  toJSON: {
    // to delete some of model object 
    transform: function transform(doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
      delete ret._id;
    }
  }
});
var NotifiModel = mongoose.model('Notification', notifiSchema);
exports.NotifiModel = NotifiModel;