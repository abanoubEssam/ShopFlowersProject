"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CartModel = exports.cartSchema = void 0;

var mongoose = require('mongoose');
/*
Cart
  user => ref owner of the cart
  flowers =>  Array of refs
  totalPrice => read only sum of all flowers prices !!!
*/


var cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  flowers: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Flower'
  }],
  totalPrice: {
    type: Number,
    default: 0
  }
});
exports.cartSchema = cartSchema;
cartSchema.index({
  user: 1,
  flower: 1
}, {
  unique: true
});
var CartModel = mongoose.model('Carts', cartSchema);
exports.CartModel = CartModel;