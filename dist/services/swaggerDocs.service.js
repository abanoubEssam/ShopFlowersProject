"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _shop = require("../models/shop.models");

var _user = require("../models/user.models");

var _flower = require("../models/flower.models");

var _clone = _interopRequireDefault(require("clone"));

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { if (i % 2) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else { Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i])); } } return target; }

var swaggerUI = require('swagger-ui-express');

var swaggerJsDoc = require('swagger-jsdoc');

// get a copy of object and update it then use it
// update shop schema
var validateOnUpdateSwaggerSchema = (0, _clone["default"])(_shop.validateOnUpdateSchema);
validateOnUpdateSwaggerSchema.properties = _objectSpread({}, validateOnUpdateSwaggerSchema.properties, {
  shopImage: {
    description: 'file to upload',
    type: 'string',
    format: 'binary'
  } // get a copy of object and update it then use it
  // update user schema

});
var validateUserOnUpdateSwaggerSchema = (0, _clone["default"])(_user.validateUserOnUpdateSchema);
validateUserOnUpdateSwaggerSchema.properties = _objectSpread({}, validateUserOnUpdateSwaggerSchema.properties, {
  userImage: {
    description: 'file to upload',
    type: 'string',
    format: 'binary'
  } // get a copy of object and update it then use it
  // create user schema

});
var SignUpSwaggerSchema = (0, _clone["default"])(_user.SignUpSchema);
SignUpSwaggerSchema.properties = _objectSpread({}, SignUpSwaggerSchema.properties, {
  userImage: {
    description: 'file to upload',
    type: 'string',
    format: 'binary'
  } // get a copy of object and update it then use it
  // create shop schema

});
var CreateShopSwaggerSchema = (0, _clone["default"])(_shop.CreateShopSchema); // to add more required fields in this schema 
// CreateShopSwaggerSchema.required.push(['']);

CreateShopSwaggerSchema.properties = _objectSpread({}, CreateShopSwaggerSchema.properties, {
  shopImage: {
    description: 'file to upload',
    type: 'string',
    format: 'binary'
  }
});
var CreateFlowerSwaggerSchema = (0, _clone["default"])(_flower.insertFlowerSchema);
CreateFlowerSwaggerSchema.required.push('flowerImage', 'price');
CreateFlowerSwaggerSchema.properties = _objectSpread({}, CreateFlowerSwaggerSchema.properties, {
  flowerImage: {
    description: 'file to upload',
    type: 'string',
    format: 'binary'
  }
});
var validateUpdateFlowerSwaggerSchema = (0, _clone["default"])(_flower.validateOnUpdateFlowerSchema);
validateUpdateFlowerSwaggerSchema.properties = _objectSpread({}, validateUpdateFlowerSwaggerSchema.properties, {
  flowerImage: {
    description: 'file to upload',
    type: 'string',
    format: 'binary'
  } // console.log(CreateFlowerSwaggerSchema.required);

});
var options = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Flowers API',
      version: '1.0.0',
      description: ' Flowers Express API with autogenerated swagger doc'
    },
    "components": {
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "Bearer"
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
    servers: [{
      url: '/api/'
    }],
    paths: {
      '/users': {
        post: {
          tags: ['users'],
          summary: ['Create User'],
          description: 'This can only be done by the logged in user.',
          operationId: 'createUser',
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: SignUpSwaggerSchema
              }
            }
          },
          'responses': {
            '200': {
              'description': 'user created successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        },
        get: {
          tags: ['users'],
          summary: ['Get All User'],
          description: 'This can only be done by the logged in Admin.',
          operationId: 'get userId if admin',
          'responses': {
            '200': {
              'description': 'user logged in successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/users/{userId}': {
        get: {
          tags: ['users'],
          summary: ['Get User by id'],
          description: 'This can only be done by the logged in user.',
          operationId: 'get user by id',
          parameters: [{
            name: "userId",
            "in": "path",
            description: "ID of user to return",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'user logged in successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        },
        "delete": {
          tags: ['users'],
          summary: ['Delete User by id'],
          description: 'This can only be done by the logged in user.',
          operationId: 'get user and delete',
          parameters: [{
            name: "userId",
            "in": "path",
            description: "ID of user to return",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '400': {
              'description': 'bad request'
            },
            '204': {
              'description': 'the user deleted successfuly and there is no content to shown(204)'
            }
          }
        },
        put: {
          tags: ['users'],
          summary: ['update User by id'],
          description: 'This can only be done by the logged in user.',
          operationId: 'get user and update',
          parameters: [{
            name: "userId",
            "in": "path",
            required: true,
            description: "ID of user to return",
            schema: {
              type: "string"
            }
          }],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: validateUserOnUpdateSwaggerSchema
              }
            }
          },
          'responses': {
            '200': {
              'description': 'user updated  successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/users/{userId}/favourites/{flowerId}': {
        get: {
          tags: ['users favourites'],
          summary: ['Get User by id and his/her favourite'],
          description: 'This can only be done by the logged in user.',
          operationId: 'get user by id and fav',
          parameters: [{
            name: "userId",
            "in": "path",
            description: "ID of user to return",
            required: true,
            schema: {
              type: "string"
            }
          }, {
            name: "flowerId",
            "in": "path",
            description: "ID of user to return",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'user logged in successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        },
        post: {
          tags: ['users favourites'],
          summary: ['post fav for User by id and his/her favourite flower by id'],
          description: 'This can only be done by the logged in user.',
          operationId: 'post user by id and fav',
          parameters: [{
            name: "userId",
            "in": "path",
            description: "ID of user to return",
            required: true,
            schema: {
              type: "string"
            }
          }, {
            name: "flowerId",
            "in": "path",
            description: "ID of user to return",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'user logged in successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        },
        "delete": {
          tags: ['users favourites'],
          summary: ['delete fav for User by id and his/her favourite flower by id'],
          description: 'This can only be done by the logged in user.',
          operationId: 'delete user by id and fav',
          parameters: [{
            name: "userId",
            "in": "path",
            description: "ID of user to return",
            required: true,
            schema: {
              type: "string"
            }
          }, {
            name: "flowerId",
            "in": "path",
            description: "ID of user to return",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'user logged in successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/users/{userId}/favourites': {
        get: {
          tags: ['users favourites'],
          summary: ['Get User by id and his/her All favourite'],
          description: 'This can only be done by the logged in user.',
          operationId: 'get user by id and all fav',
          parameters: [{
            name: "userId",
            "in": "path",
            description: "ID of user to return",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'user logged in successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/users/{userId}/cart': {
        get: {
          tags: ['users carts'],
          summary: ['Get User by id and his/her carts'],
          description: 'This can only be done by the logged in user.',
          operationId: 'get user by id and fav',
          parameters: [{
            name: "userId",
            "in": "path",
            description: "ID of user to return cart",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'user logged in successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/users/{userId}/cart/{flowerId}': {
        post: {
          tags: ['users carts'],
          summary: ['Post User by id and his/her carts'],
          description: 'This can only be done by the logged in user.',
          operationId: 'Post user by id and fav',
          parameters: [{
            name: "userId",
            "in": "path",
            description: "ID of user to return",
            required: true,
            schema: {
              type: "string"
            }
          }, {
            name: "flowerId",
            "in": "path",
            description: "ID of flower to return",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'user logged in successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        },
        "delete": {
          tags: ['users carts'],
          summary: ['delete flower of User by id of flower and his/her id'],
          description: 'This can only be done by the logged in user.',
          operationId: 'delete user by id and fav',
          parameters: [{
            name: "userId",
            "in": "path",
            description: "ID of user to return",
            required: true,
            schema: {
              type: "string"
            }
          }, {
            name: "flowerId",
            "in": "path",
            description: "ID of flower to return",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '201': {
              'description': 'flower deleted  successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/users/{userId}/orders': {
        get: {
          tags: ['orders'],
          summary: ['Get Orders of user'],
          description: 'this can only be done by the logged in user',
          operationId: 'get Order',
          parameters: [{
            name: "userId",
            "in": "path",
            description: "ID of user to return cart",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'order find successfuly'
            },
            '400': {
              'description': 'bad request'
            }
          }
        },
        post: {
          tags: ['orders'],
          summary: ['Post Orders of user'],
          description: 'this can only be done by the logged in user',
          operationId: 'Post Order',
          parameters: [{
            name: "userId",
            "in": "path",
            description: "ID of user to return cart",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'order find and posted successfuly'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/users/{userId}/orders/{orderId}': {
        "delete": {
          tags: ['orders'],
          summary: ['delete an Order of user using id'],
          description: 'this can only be done by the logged in user',
          operationId: 'delete Order',
          parameters: [{
            name: "userId",
            "in": "path",
            description: "ID of user to return cart",
            required: true,
            schema: {
              type: "string"
            }
          }, {
            name: "orderId",
            "in": "path",
            description: "ID of order to delete order",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'order deleted successfuly'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/notification': {
        get: {
          tags: ['notification'],
          summary: ['get notification'],
          description: 'This can only be done by the logged in user.',
          operationId: 'get notification',
          'responses': {
            '200': {
              'description': 'user created successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/push-notifications/unsubscribe?token={token}': {
        "delete": {
          tags: ['Push-Notification'],
          summary: ['delete token from user'],
          description: 'This can only be done by the logged in user.',
          operationId: 'delete notification',
          parameters: [{
            name: "token",
            "in": "path",
            description: " delete token ",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'user created successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/push-notifications/unsubscribe/{token}': {
        post: {
          tags: ['Push-Notification'],
          summary: ['post token from user'],
          description: 'This can only be done by the logged in user.',
          operationId: 'post notification',
          parameters: [{
            name: "token",
            "in": "path",
            description: " post token ",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'user created successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/shops': {
        post: {
          tags: ['shops'],
          summary: ['Create New Shop'],
          description: 'This can only be done by the logged in user.',
          operationId: 'Create Shop',
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: CreateShopSwaggerSchema
              }
            }
          },
          'responses': {
            '200': {
              'description': 'user created successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/shops/?pageNumber={pageNumber}&pageSize={pageSize}': {
        get: {
          tags: ['shops'],
          summary: ['Get All Shops with pagination'],
          description: 'This can only be done by the logged in user.',
          operationId: 'get shop',
          parameters: [{
            name: "pageNumber",
            "in": "path",
            description: "Number of Page to return shops",
            schema: {
              type: "number"
            }
          }, {
            name: "pageSize",
            "in": "path",
            description: "Number of shops to return shops",
            schema: {
              type: "number"
            }
          }],
          'responses': {
            '200': {
              'description': 'user logged in successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/shops/near?lng={lng}&lat={lat}&radius={radius}': {
        get: {
          tags: ['shops'],
          summary: ['Get All Shops near me'],
          description: 'This can only be done by the logged in user.',
          operationId: 'get shops near me',
          parameters: [{
            name: "lng",
            "in": "path",
            description: "Lng to return shop",
            required: true,
            schema: {
              type: "number"
            }
          }, {
            name: "lat",
            "in": "path",
            description: "Lat to return shop",
            required: true,
            schema: {
              type: "number"
            }
          }, {
            name: "radius",
            "in": "path",
            description: "radius to return shops on radius",
            schema: {
              type: "number",
              "default": 10
            }
          }],
          'responses': {
            '200': {
              'description': 'user logged in successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/shops/{shopId}': {
        put: {
          tags: ['shops'],
          summary: ['Update  Shop'],
          description: 'This can only be done by the logged in user. xxx',
          operationId: 'Update Shop',
          parameters: [{
            name: "shopId",
            "in": "path",
            required: true,
            description: "ID of Shop to return",
            schema: {
              type: "string"
            }
          }],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: validateOnUpdateSwaggerSchema
              }
            }
          },
          'responses': {
            '200': {
              'description': 'user created successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        },
        get: {
          tags: ['shops'],
          summary: ['Get Shop by id'],
          description: 'This can only be done by the logged in user.',
          operationId: 'get shop by id',
          parameters: [{
            name: "shopId",
            "in": "path",
            description: "ID of shop to return ",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'user logged in successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        },
        "delete": {
          tags: ['shops'],
          summary: ['Delete Shop using id'],
          description: 'This can only be done by the logged in user.',
          operationId: 'delete shop by id',
          parameters: [{
            name: "shopId",
            "in": "path",
            description: "ID of Shop to return ",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'user logged in successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/flowers': {
        get: {
          tags: ['Flowers'],
          summary: ['Get All Flowers'],
          description: 'This can only be done by the logged in user with shop id.',
          operationId: 'Get All Flowers',
          'responses': {
            '200': {
              'description': 'flowers finde successfuly'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/shops/{shopId}/flowers': {
        post: {
          tags: ['Flowers'],
          summary: ['Create Flowers'],
          description: 'This can only be done by the logged in user with shop id.',
          operationId: 'Create Flowers',
          parameters: [{
            name: "shopId",
            "in": "path",
            description: "ID of shop to add flower in it",
            required: true,
            schema: {
              type: "string"
            }
          }],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: CreateFlowerSwaggerSchema
              }
            }
          },
          'responses': {
            '200': {
              'description': 'Flower created successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        },
        get: {
          tags: ['Flowers'],
          summary: ['Get All Flowers On A shop'],
          description: 'This can only be done by the logged in user.',
          operationId: 'Get All Flowers on one shop',
          parameters: [{
            name: "shopId",
            "in": "path",
            description: "ID of shop to Get flower in it",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'Flower created successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/shops/{shopId}/flowers/{flowerId}': {
        get: {
          tags: ['Flowers'],
          summary: ['Get one of all Flowers On A shop'],
          description: 'This can only be done by the logged in user.',
          operationId: 'Get one of Flowers on one shop',
          parameters: [{
            name: "shopId",
            "in": "path",
            description: "ID of shop to Get flower in it",
            required: true,
            schema: {
              type: "string"
            }
          }, {
            name: "flowerId",
            "in": "path",
            description: "ID of flower to Get flower data",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'Flower created successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        },
        put: {
          tags: ['Flowers'],
          summary: ['update one of all Flowers On A shop'],
          description: 'This can only be done by the logged in user.',
          operationId: 'update one of Flowers on one shop',
          parameters: [{
            name: "shopId",
            "in": "path",
            description: "ID of shop to Get flower in it",
            required: true,
            schema: {
              type: "string"
            }
          }, {
            name: "flowerId",
            "in": "path",
            description: "ID of flower to Get flower data",
            required: true,
            schema: {
              type: "string"
            }
          }],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: validateUpdateFlowerSwaggerSchema
              }
            }
          },
          'responses': {
            '200': {
              'description': 'Flower updated successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        },
        "delete": {
          tags: ['Flowers'],
          summary: ['Delete flower using id of shop and flower'],
          description: 'This can only be done by the logged in user.',
          operationId: 'delete flower by id of shop and flower',
          parameters: [{
            name: "shopId",
            "in": "path",
            description: "ID of Shop to return ",
            required: true,
            schema: {
              type: "string"
            }
          }, {
            name: "flowerId",
            "in": "path",
            description: "ID of flower to return ",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '204': {
              'description': 'flower deleted successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      },
      '/shops/{shopId}/flowers/{flowerId}/sponsored': {
        put: {
          tags: ['Sponsored'],
          summary: ['update one of all Flowers On A shop to make it sponsored'],
          description: 'This can only be done by the logged in user.',
          operationId: 'update one of Flowers on one shop make it sponsored',
          parameters: [{
            name: "shopId",
            "in": "path",
            description: "ID of shop to Get flower in it",
            required: true,
            schema: {
              type: "string"
            }
          }, {
            name: "flowerId",
            "in": "path",
            description: "ID of flower to Get flower data",
            required: true,
            schema: {
              type: "string"
            }
          }],
          'responses': {
            '200': {
              'description': 'Flower Sponsord successfully'
            },
            '403': {
              'description': 'forbidden'
            }
          }
        }
      },
      '/auth': {
        post: {
          tags: ['Auth'],
          summary: ['Login'],
          description: 'This can only be done by the logged in user.',
          operationId: 'Login',
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
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
              }
            }
          },
          'responses': {
            '200': {
              'description': 'user logged in successfully'
            },
            '400': {
              'description': 'bad request'
            }
          }
        }
      }
    }
  },
  apis: []
};
var specs = swaggerJsDoc(options);

module.exports = function (app) {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
};