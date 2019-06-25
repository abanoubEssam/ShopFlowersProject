import request from 'supertest'
const { ShopModel } = require('../../models/shop.models')

let server;

describe('/api/shops',  () => {

    beforeEach(() => { server = require('../../app') })
    
    afterEach(async () => {
        await server.close();
        // ,
        // await ShopModel.remove()
        
    })
    
    describe('Get /',  () => {
        
        it('should return all shops', async () => {
            let res = await request(server).get('/api/shops');
            console.log('res body first===' , res.body)
            // await ShopModel.collection.insert({
            //     name: 'abanoub shop',
            //     geometry: {
            //         type: "Point",
            //         coordinates: [-73.88, 40.78]
            //     },
            //     aihabal:'a'
            // })

            const shop = new ShopModel({
                name:'test new1 ',
                geometry: {
                    type: "Point",
                    coordinates: [-73.88, 40.78]
                },
            })
            await shop.save();
            res = await request(server).get('/api/shops');
            expect(res.status).toBe(200);
            console.log('body shop -===', res.body)
        })
    })


})