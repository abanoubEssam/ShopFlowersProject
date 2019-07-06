const mongoose = require('mongoose');
const userPushToken = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    tokens: {
      type: [String]
    }
  })


  export const CreateNotifiSchema = {
    type: "object",
    required: [ 'token'],
    properties: {
      token: {
        type: 'string'
      }
  
    }
  }

  export const PushNotifiModel = mongoose.model('PushNotification', userPushToken);