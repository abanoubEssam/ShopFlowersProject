import { NotifiModel } from '../models/notification.models'
import jwt from 'jsonwebtoken';


export default {
    async getNotification(req, res, next) {
        try {
            const userId = String(req.user._id);
            console.log(userId);
            const notifi = await NotifiModel.find({user:userId});
            console.log(notifi);
            if (!notifi)
                return res.status(404).send('there is no notification')
            res.send(notifi);
        } catch (error) {
            next(error);
        }

    }
}