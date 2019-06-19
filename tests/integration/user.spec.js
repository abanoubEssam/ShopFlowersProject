// const request = require('supertest');
import request from 'supertest'
const { UserModel } = require('../../models/user.models')

// console.log('request =================' ,request)
let server;


describe('/api/users', () => {

    beforeEach(() => { server = require('../../app') })

    afterEach( async () => {
        await server.close();
    
        await UserModel.remove();
    
    })

    describe('Get /', () => {
        it('shuld return all users', async () => {
            await UserModel.collection.insert({
                name: "abanoub essam",
                email: 'aaaem@a.com',
                password: '12345677'
            });
            const res = await request(server).get('/api/users')
            console.log('body -===', res.body)
            expect(res.status).toBe(200);

            await UserModel.remove();
        }
        );
    })

    describe('Get /:id', () => {
        it('should return 401 by id if id valid or not , and no token', async () => {
            const user = new UserModel({
                name: "abanoub essam",
                email: 'aaaem@a.com',
                password: '12345677'
            })
            // await user.save();
            const res = await request(server).get('/api/users/' + user._id);

            expect(res.status).toBe(401)
        })
    })
})