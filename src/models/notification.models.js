const mongoose = require('mongoose');

const notifiSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type:String
    }
},{
    toJSON: {
        // to delete some of model object 
        transform: function (doc, ret) {
          ret.id = ret._id;
          delete ret.__v;
          delete ret._id;
        }
      }
});

export const NotifiModel = mongoose.model('Notification', notifiSchema);
