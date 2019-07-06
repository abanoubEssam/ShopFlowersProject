import request from 'supertest'
import { FlowerModel } from '../../../src/models/flower.models'
const { ShopModel } = require('../../../src/models/shop.models')
const { UserModel } = require('../../../src/models/user.models')

let server;

export const flowerTest = () => {
    beforeEach(() => { server = require('../../../src/app') })
    afterEach(async () => {
        await server.close();
    })

    describe('/api/flowers', () => {
        const Path = '/api/shops/flowers'
        describe('Get /', () => {

            it('should return all flowers', async () => {
                let res = await request(server)
                    .get(Path);

                expect(res.status).toBe(200);
            })
        })
    });

    describe('/:shopId /flowers', () => {

        describe('Post /:shopId/flowers',  () => {
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

            it('should post flower data and return 201', async () => {
                

                await ShopModel.remove()
    
                const user = await UserModel.findOne({});
                const token = user.generateAuthToken();
    
    
                let res = await request(server)
                    .post('/api/shops')
                    .set('Authorization', 'Bearer ' + token)
                    .field("name",  shopData.name)
                    .field('geometryLng', shopData.geometry.coordinates[0])
                    .field('geometryLat', shopData.geometry.coordinates[1])
                    .attach('shopImage', './tests/resources/img1.png')

                const shop = await ShopModel.findOne({})
                const shopId = shop._id;

                await FlowerModel.remove()

                const Path = '/api/shops/' + shop._id + '/flowers'

                res = await request(server)
                .post(Path)
                .set('Authorization', 'Bearer ' + token)
                .field("name", flowerData.name)
                .field('description', flowerData.description)
                .field('price', flowerData.price)
                .attach('flowerImage', './tests/resources/img1.png')
                expect(res.status).toBe(201)
               


            })
        })

        // should have authorization and user auth
        describe('Get /:shopId/flowers', () => {


            it('should get flower data and return 201', async () => {
                // await FlowerModel.remove()
                const user = await UserModel.findOne({});
                const token = user.generateAuthToken();
                const shop = await ShopModel.findOne({});
                const shopId = shop._id;
                const Path = '/api/shops/' + shop._id + '/flowers'

                let res = await request(server)
                    .get(Path)
                    .set('Authorization', 'Bearer ' + token)
                    expect(res.status).toBe(200)
             
            })

        })
    })
}