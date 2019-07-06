import request from 'supertest'
const bcrypt = require('bcrypt');

// /api/auth
const { UserModel } = require('../../../src/models/user.models')

let server;

export const authTest = () => {
    describe('/api/auth', () => {
        beforeEach(() => { server = require('../../../src/app') })

        afterEach(async () => {
            await server.close();


        })

        //post login
        describe('Post /auth', function () {
            it('should return token of user and 200 status code', async () => {
                const salt = await bcrypt.genSalt(10);

                await UserModel.remove();
                const userData = new UserModel({
                    name: "abanoub essam from auth",
                    email: "a@e.com",
                    password: await bcrypt.hash('123456', salt)
                })
                // await bcrypt.hash('123456', salt)
                await userData.save();
                const user = await UserModel.findOne({})

                const userId = user.id;

                const userAuth = {
                    email: "a@e.com",
                    password:"123456"
                }

                const email = userAuth.email;
                const password = userAuth.password;

                const res = await request(server)
                    .post('/api/auth')
                    .send({email , password})

                expect(res.status).toBe(200);

            })
        })



    })


}