const { UserModel, validateUserOnUpdateSchema, SignUpSchema } = require('../models/user.models');
import mongoose from 'mongoose';
import { validate } from '../services/validator.service';
import jwt from 'jsonwebtoken';
import config from 'config'
const bcrypt = require('bcrypt');
import {urlConf} from './../utils/urlUpload';

// function APIErrors(req , res , next){
//     const BadRequest = res.send(message).status(400)
//     const UnAuthorized = res.status(401)
//     const Forbidden = res.status(403)
// }


function checkCurrentUser(currentUser, paramUserId) {

    if (String(currentUser._id) !== String(paramUserId))
        throw new Error('sorry you are not allowed');
}

function chechPasswordLength(currentPassword){
    const cPass = currentPassword ;
    if (cPass.length < 6) {
        throw new Error('your password is less than 6 char')
    }
}

export default {

    async findAll(req, res, next) {
        const user = await UserModel.find()
            .select('name imageURL email');

        res.send(user);

    },

    async createUser(req, res , next) {
        try {
            // console.log(req.file, '  : here is req.file');
            // console.log(req.body, ' : here is req.body');
            if (!req.file) {
                res.status(400).send('image is required !');
            }
            chechPasswordLength(req.body.password)
            validate(req.body, SignUpSchema)

            let foundUserEmail = await UserModel.findOne({email : req.body.email});
            if (foundUserEmail) return next ( new Error ('email is duplicated'));

            // here salt to add generated string to .....
            // then hashed the password
            const salt = await bcrypt.genSalt(10);
            let testDate = Date.now();
            console.log(testDate);

            let user = await UserModel.create({
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, salt),
                creationDate: testDate,
                userImage: `${urlConf}/uploads/` + req.file.originalname
            });
            // console.log('user ******  ' , user);

            const token = jwt.sign({id: user._id } , config.get('jwtPrivateKey'));
            console.log('token == ** == : ' , token);
            res.send({
                user,
                accessToken:token
            });

        } catch (error) {

            res.status(400).send(error.message);
        }
    },
    // delete user using id
    async delete(req, res, next) {
        try {
            checkCurrentUser(req.user, req.params.userId);
            const user = await UserModel.findByIdAndRemove(req.params.userId);
            if (!user) return res.status(404).send('The user with the given ID was not found.');
            // the user deleted successfuly and there is no content to shown(204)
            res.status(204).send('user deleted successfuly');
        } catch (error) {
            next(error);
        }
    },

    // update user name
    async updateUser(req, res, next) {
        try {
            // check if user id in token = to user id in params
            checkCurrentUser(req.user, req.params.userId);
            chechPasswordLength(req.body.password)

            console.log(req.body);
            validate(req.body, validateUserOnUpdateSchema);

            let updateData = {};
            if (req.body.name) {
                updateData.name = req.body.name
            }
            if (req.body.email) {
                updateData.email = req.body.email
            }
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                updateData.password = await bcrypt.hash(req.body.password, salt);
            }
            if (req.file) {
                updateData.userImage = `${urlConf}/uploads/` + req.file.originalname
            }
            const user = await UserModel.findOneAndUpdate(
                { _id: req.params.userId },
                updateData,
                { new: true });

            if (!user) return res.status(404).send('The user with the given ID was not found.');

            res.send(user);
        } catch (error) {
            next(error);
        }
    },
    // find user by id
    async findUserById(req, res, next) {
        try {
            // chech if it is right id
            if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
                return res.status(400).send('please enter a valid  id '); // They didn't send an object ID
            }
            const user = await UserModel.findById(req.params.userId);
            if (!user) return res.status(404).send('The user with the given ID was not found.');
            // the user deleted successfuly and there is no content to shown(204)
            res.status(200).send(user);
        } catch (error) {
            next(error)
        }
    }
}