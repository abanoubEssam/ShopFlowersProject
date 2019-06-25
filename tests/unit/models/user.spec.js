const { UserModel: User } = require('../../../models/user.models')
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
    it('should return a valid jwt ', () => {

        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            email: 'abanoub@e.com' ,
            // sub:new mongoose.Types.ObjectId().toHexString()
        };
        const user = new User(payload);

        
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        console.log('payload : ', payload)
        console.log('user : ', user)
        console.log('token: ', token)
        console.log('decoded: ', decoded)

        expect(decoded).toMatchObject(payload);

    })
})