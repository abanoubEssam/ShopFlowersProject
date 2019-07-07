const mongoose = require('mongoose');
// const Loc = mongoose.model('Location');
import { FavModel } from '../models/favflowers.models';
import { FlowerModel } from '../models/flower.models';

export default {

    async makeFav(req, res, next) {
        try {
            let flowerId = String(req.params.flowerId);
            let userId = String(req.params.userId);

            if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
                return res.status(400).send('please enter a valid  id '); // They didn't send an object ID
            }

            if (!mongoose.Types.ObjectId.isValid(req.params.flowerId)) {
                return res.status(400).send('please enter a valid  id '); // They didn't send an object ID
            }

            const flower = await FlowerModel.findById(flowerId);
            // console.log(flowerId);
            if (!flower) return res.status(404).send('flower not found');

            if (String(req.user._id) !== String(userId)) return res.status(403).send('you are not allowed to access .');

            let favFlower = await FavModel.findOneAndUpdate({
                flower: flowerId,
                user: userId
            }, {}, { upsert: true, new: true });
            res.send(favFlower);
        } catch (error) {
            next(error);
        }

    },
    async getFav(req, res, next) {
        let userId = String(req.params.userId);
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
                return res.status(400).send('please enter a valid  id '); // They didn't send an object ID
            }

            if (String(req.user._id) !== String(userId)) return res.status(403).send('you are not allowed to access .');

            const favFlowers = await FavModel.find({ user: userId }).populate('flower');
            
            // if (!flowers) return res.status(400).send('there is no flowers');
            res.send(favFlowers);

        } catch (error) {
            next(error);
        }

    },
    async deleteFav(req, res, next) {
        try {
            let flowerId = String(req.params.flowerId);
            let userId = String(req.params.userId);

            if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
                return res.status(400).send('please enter a valid  id '); // They didn't send an object ID
            }

            if (!mongoose.Types.ObjectId.isValid(req.params.flowerId)) {
                return res.status(400).send('please enter a valid  id '); // They didn't send an object ID
            }

            if (String(req.user._id) !== userId) return res.status(403).send('you are not allowed to access .');

            const flower = await FlowerModel.findById(flowerId).populate('shop');
            console.log(flowerId);
            if (!flower) return res.status(404).send('flower not found');
            console.log('test  0 :' , flower.shop.user );
            console.log(userId);

            
            // if (flower.shop.user == userId) {
            //     console.log(flower.shop.user );
            //     const deleteFlower = await FavModel.findOneAndRemove(flowerId);
            //     console.log('successed')
            //     if(!deleteFlower) return res.status(404).send('The flower with the given ID was not found.');
            // }

            const deleteFlower = await FavModel.findOneAndRemove({user : userId , flower: flowerId });
            if(!deleteFlower) return res.status(404).send('The flower with the given ID was not found.');
            console.log('deleted successfully');
            res.status(204).send();

        } catch (error) {
            next(error)
        }
    }

}