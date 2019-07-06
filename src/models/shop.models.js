const mongoose = require('mongoose');

const GeoSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number]
  }
},
  {
    toJSON: {
      // to delete some of model object 
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

export const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  shopImage: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  creationDate: {
    type: Date,
    default: Date.now()
  },
  totalFlowersCount: {
    type: Number,
    default: 0
  },
  geometry: GeoSchema,


}
  ,
  {
    toJSON: {
      // to delete some of model object 
      transform: function (doc, ret) {
        delete ret.__v;
        if (ret.geometry)
          ret.geometry = ret.geometry.coordinates;
      }
    }
  }
)


shopSchema.index({ geometry: '2dsphere' });
export const ShopModel = mongoose.model('Shop', shopSchema);



export const validateOnUpdateSchema = {
  type: "object",
  properties: {
    name: {
      type: 'string',
     
    },
    geometryLng: {
      type: 'string'
    },
    geometryLat: {
      type: 'string'
    }
  }
}

export const CreateShopSchema = {
  type: "object",
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      minimum: 5
    },
    geometryLng: {
      type: 'string'
    },
    geometryLat: {
      type: 'string'
    }

  }
}
exports.ShopModel = ShopModel;
