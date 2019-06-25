import request from 'supertest'
import { FlowerModel } from '../../../models/flower.models'
const { ShopModel } = require('../../../models/shop.models')
const { UserModel } = require('../../../models/user.models')

let server;


export const sponsorTest = () => {
    describe('/api/shops/:shopId/flowers/:flowerId/sponsored', () => {
        beforeEach(() => { server = require('../../../app') })

        afterEach(async () => {
            await server.close();

        })

        describe('success', () => {
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

            it('should update flower to be sponsored and return 200', async () => {
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

                Path = '/api/shops/' + shopId + '/flowers/' + flowerId + '/sponsored'
                res = await request(server)
                    .put(Path)
                    .set('Authorization', 'Bearer ' + token)

                expect(res.status).toBe(200)



            })
        })
    })
}