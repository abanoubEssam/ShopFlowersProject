"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderModel = exports.orderSchema = void 0;

var mongoose = require('mongoose');
/* Order . => We will use this model as a history of all previous checkouts of the shopping cart
    user
    flowers
    totalPrice
    creationDate
All attributes are required for simplicity
*/


var orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Shop'
  },
  flowers: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Flower'
  }],
  totalPrice: {
    type: Number,
    default: 0
  },
  creationDate: {
    type: Date,
    default: Date.now()
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
exports.orderSchema = orderSchema;
var orderModel = mongoose.model('Order', orderSchema);
exports.orderModel = orderModel;
exports.orderModel = orderModel;