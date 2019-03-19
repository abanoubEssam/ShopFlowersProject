
const mongoose = require('mongoose');

const UserModel = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  creationDate:{
    type: Date,
  },
  userImage: {
    type: String
  }
}, {
    toJSON: {
      // to delete some of model object 
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
        delete ret.password;
      }
    }
  }
));


export const validateUserOnUpdateSchema = {
  type: "object",
  properties: {
    name: {
      type: 'string',
      require: false
    },
    email: {
      type: 'string',
      require: false
    },
    password: {
      type: 'string',
      require: false
    }
  }
}

export const SignUpSchema = {
  type: "object",
  properties: {
    name: {
      type: 'string',
      require: true
    },
    email: {
      type: 'string',
      require: true
    },
    password: {
      type: 'string',
      require: true
    }

  }
}
exports.UserModel = UserModel;

