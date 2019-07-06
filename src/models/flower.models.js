const mongoose = require('mongoose');

let flowerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  },
  price: {
    type: Number,

  },
  creationDate: {
    type: Date,
    default: Date.now()
  },
  flowerImage: {
    type: String
  },
  sponsored: {
    type: Boolean,
    default: false
  }
}, {
    toJSON: {
      // to delete some of model object 
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      }
    }
  })
export const FlowerModel = mongoose.model('Flower', flowerSchema);


export const insertFlowerSchema = {
  type: "object",
  required: ['name', 'description'],
  properties: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    price: {
      type: 'string'
    }
  }
}

export const validateOnUpdateFlowerSchema = {
  type: "object",
  properties: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    price: {
      type: 'string'
    }
  }
}

