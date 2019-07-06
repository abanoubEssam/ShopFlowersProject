const mongoose = require('mongoose');
import { PushNotifiModel, CreateNotifiSchema } from '../models/user-push-token.models';
import { validate } from '../services/validator.service';

export default {
    async subscribe(req, res, next) {
        try {
            validate(req.body, CreateNotifiSchema);
            await PushNotifiModel.findOneAndUpdate({
                user: req.user._id,

            }, { $push: { tokens: req.body.token } }, { upsert: true });
            res.status(204).send();
        } catch (error) {
            // console.log('ERROR : ', error);
            next(error)
        }
    },



    async unSubscribe(req, res, next) {
        try {
            let token = req.query.token;
            // 422 for required fields
            if (!token)
                return res.status(422).send('token is required');
            await PushNotifiModel.findOneAndUpdate({
                user: req.user._id,

            }, { $pull: { tokens: req.body.token } });
            res.status(204).send();
        } catch (error) {
            next(error)
        }
    }
}