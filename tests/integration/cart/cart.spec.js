import request from 'supertest'
import { FlowerModel } from '../../../src/models/flower.models'
const { ShopModel } = require('../../../src/models/shop.models')
const { UserModel } = require('../../../src/models/user.models')
import { CartModel } from '../../../src/models/cart.models';
let server;

export const cartTest = () => {
    beforeEach(() => { server = require('../../../src/app') })
    afterEach(async () => {
        await server.close();
    })
    describe('/api/users/:userId/cart', () => {


        describe('success ',  () => {
            const flowerData = {
                name: 'red flower',
                description: 'flower 7lwa',
                price: 15
            }
            const shopData = {
                name: 'test for flower',
                geometry: {
                    type: 'Point',
                    coordinates: [15, 30]
                }
            }

            it('should post flowers at cart and return 201', async () => {
                await ShopModel.remove()
                const user = await UserModel.findOne({});
                const token = user.generateAuthToken();
                const userId = user._id;
                let res = await request(server)
                    .post('/api/shops')
                    .set('Authorization', 'Bearer ' + token)
                    .field("name", shopData.name)
                    .field('geometryLng', shopData.geometry.coordinates[0])
                    .field('geometryLat', shopData.geometry.coordinates[1])
                    .attach('shopImage', './tests/resources/img1.png')

                const shop = await ShopModel.findOne({})
                const shopId = shop._id;
                await FlowerModel.remove()
                let Path = '/api/shops/' + shop._id + '/flowers'

                res = await request(server)
                    .post(Path)
                    .set('Authorization', 'Bearer ' + token)
                    .field("name", flowerData.name)
                    .field('description', flowerData.description)
                    .field('price', flowerData.price)
                    .attach('flowerImage', './tests/resources/img1.png')
                expect(res.status).toBe(201)

                const flower = await FlowerModel.findOne({})
                const flowerId = flower._id;

                await CartModel.remove()

                Path = '/api/users/' + userId + '/cart/' + flowerId
                res = await request(server)
                    .post(Path)
                    .set('Authorization', 'Bearer ' + token)
                expect(res.status).toBe(200)


            })


            it('should get the cart and return 200', async () => {
                // const cart = await CartModel.findOne({})
                const user = await UserModel.findOne({});
                const token = user.generateAuthToken();

                const userId = user._id;
                let Path = '/api/users/' + userId + '/cart'
                let res = await request(server)
                    .get(Path)
                    .set('Authorization', 'Bearer ' + token)
                expect(res.status).toBe(200)
                // console.log(res.body)
                // const out = { ...res.body }
                // console.log(out[0].flowers)


            })



        })



    })


}