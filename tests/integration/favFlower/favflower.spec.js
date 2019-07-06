import request from 'supertest'
import { FlowerModel } from '../../../src/models/flower.models'
const { ShopModel } = require('../../../src/models/shop.models')
const { UserModel } = require('../../../src/models/user.models')
import { FavModel } from '../../../src/models/favflowers.models';
let server;

export const favFlowerTest = () => {
    describe('api/users/:userId/favourites/:flowerId', () => {
        beforeEach(() => { server = require('../../../src/app') })

        afterEach(async () => {
            await server.close();

        })

        describe('Post /', () => {
            it('should return 200', async () => {

                // await ShopModel.remove()
                await FavModel.remove()
                const flower = await FlowerModel.findOne({})
                const user = await UserModel.findOne({});

                const userId = user._id
                const flowerId = flower._id;

                const path = '/api/users/' + userId + '/favourites/' + flowerId;
                const token = user.generateAuthToken();

                let res = await request(server)
                    .post(path)
                    .set('Authorization', 'Bearer ' + token)

                expect(res.status).toBe(200);


            })
        })

        describe('Get /', function () {
            it('should return 200', async () => {
                const flower = await FlowerModel.findOne({})
                const user = await UserModel.findOne({});
                const userId = user._id
                const flowerId = flower._id;
                const path = '/api/users/' + userId + '/favourites/';
                const token = user.generateAuthToken();
                let res = await request(server)
                    .get(path)
                    .set('Authorization', 'Bearer ' + token)
                expect(res.status).toBe(200);
            })
        })

    })

}