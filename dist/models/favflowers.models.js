"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FavModel = exports.favSchema = void 0;

var mongoose = require('mongoose');

var favSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  flower: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Flower'
  }
});
exports.favSchema = favSchema;
favSchema.index({
  user: 1,
  flower: 1
}, {
  unique: true
}); // export const makeFavSchema = {
//     type: "object",
//     required: ['flowerId'],
//     properties: {
//         flowerId: {
//             type: 'string'
//         }
//     }
// }
// export const getFavSchema = {
//     type: "object",
//     required: ['userId'],
//     properties: {
//         userId: {
//             type: 'string'
//         }
//     }
// }

var FavModel = mongoose.model('FavFlower', favSchema);
exports.FavModel = FavModel;
exports.FavModel = FavModel;