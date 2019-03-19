const mongoose = require('mongoose');
/*
Cart
  user => ref owner of the cart
  flowers =>  Array of refs
  totalPrice => read only sum of all flowers prices !!!
*/
export const cartSchema = new mongoose.Schema({

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
        type:Number,
        default: 0
    }
});

cartSchema.index({ user: 1, flower: 1 }, { unique: true });

export const CartModel = mongoose.model('Carts', cartSchema);
