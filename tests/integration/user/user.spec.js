// const request = require('supertest');
import request from 'supertest'
const { UserModel } = require('../../../src/models/user.models')
const { ShopModel } = require('../../../src/models/shop.models')


let server;


export const userTest = () => {
    describe('/api/users', () => {

        beforeEach(() => { server = require('../../../src/app') })
    
        afterEach(async () => {
            await server.close();
    
    
        })
    
    
    
        describe('Get /', () => {
            it('shuld return all users', async () => {
                await UserModel.remove();
    
                const user = new UserModel({
                    name: "abanoub essam",
                    email: 'aaaem@a.com',
                    password: '12345677'
                })
                await user.save();
                const res = await request(server).get('/api/users')

                expect(res.status).toBe(200);
            }
            );
        })
    
    })
}


