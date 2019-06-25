import request from 'supertest'
const { ShopModel } = require('../../../models/shop.models')
const { UserModel } = require('../../../models/user.models')
let server;

export const shopTest = () => {
    describe('/api/shops', () => {

        beforeEach(() => { server = require('../../../app') })

        afterEach(async () => {
            await server.close();

        })
        describe('Post /', () => {

            const shopData = {
                name: 'abanoub shop',
                geometry: {
                    type: 'Point',
                    coordinates: [15, 30]
                }
            }

            it('should return 400 if shop name less than 5 charachters', async () => {
                await ShopModel.remove()

                const user = await UserModel.findOne({});
                const token = user.generateAuthToken();

                let res = await request(server)
                    .post('/api/shops')
                    .set('Authorization', 'Bearer ' + token)
                    .field("name", "test new1 ")
                    .field('geometryLng', shopData.geometry.coordinates[0])
                    .field('geometryLat', shopData.geometry.coordinates[1])
                    .attach('shopImage', './tests/resources/img1.png')
                expect(res.status).toBe(201);

            })

        })

        describe('Get /', () => {
            it('should return all shops', async () => {
                let res = await request(server).get('/api/shops');
                // console.log('res body first===', res.body)
                expect(res.status).toBe(200);
            })
        })

        describe('Get /:id', () => {
            it('should return 200 ', async () => {
                const shop = await ShopModel.findOne({});
                const res = await request(server).get('/api/shops/' + shop._id);
                // console.log('get shop by id : ' , res.body)
                expect(res.status).toBe(200);

            })

        })


    })
}

