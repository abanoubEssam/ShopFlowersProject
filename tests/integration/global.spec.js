import request from 'supertest'
import { shopTest } from './shop/shop.spec'
import {userTest} from './user/user.spec';
import {flowerTest} from './flower/flower.spec';
import {authTest} from './auth/auth.spec';
import {favFlowerTest} from './favFlower/favflower.spec';
import {cartTest} from './cart/cart.spec'
import {orderTest} from './order/order.spec';
import { sponsorTest } from './sponsor/sponsor.spec';


describe('userTest ' , userTest)

describe('authTest' , authTest)

describe('shopTests ' , shopTest)
// describe flower global.spec.js

describe('flowerTest ' , flowerTest)

describe('favFlowerTest' , favFlowerTest)

// cart
describe('cartTest', cartTest)


describe('orderTest' , orderTest)

describe('sponsorTest', sponsorTest )