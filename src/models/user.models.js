
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
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
  creationDate: {
    type: Date,
  },
  userImage: {
    type: String
  }
},
  {
    toJSON: {
      // to delete some of model object 
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
        delete ret.password;
      }
    }
  })


userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, config.get('jwtPrivateKey'));
  // console.log('===============token ================' ,token)
  return token;
}

const UserModel = mongoose.model('User', userSchema);

export const validateUserOnUpdateSchema = {
  type: "object",
  required: ['name', 'email', 'password'],
  properties: {
    name: {
      type: 'string',
      require: true,
      minLength: 4
    },
    email: {
      type: 'string',
      require: true,
      "format": "email"

    },
    password: {
      type: 'string',
      require: true,
      minLength: 6
    }
  }
}

export const SignUpSchema = {
  type: "object",
  properties: {
    name: {
      type: 'string',
      require: true,
      minLength: 4
    },
    email: {
      type: 'string',
      require: true,
      "format": "email"

    },
    password: {
      type: 'string',
      require: true,
      minLength: 6


    }

  }
}
exports.UserModel = UserModel;
