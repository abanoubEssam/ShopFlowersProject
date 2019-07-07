import { FlowerModel  } from '../models/flower.models';
import {ShopModel} from '../models/shop.models';
const mongoose = require('mongoose');

export default {
    async makeItSponsored(req , res , next){
        let { shopId , flowerId } = req.params;
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.shopId)) {
                return res.status(400).send('please enter a valid  id '); // They didn't send an object ID
            }
            if (!mongoose.Types.ObjectId.isValid(req.params.flowerId)) {
                return res.status(400).send('please enter a valid  id '); // They didn't send an object ID
            }

            const shop = await ShopModel.findById(shopId);
            if (!shop) return res.status(400).send('shop not found');
            // console.log(shopId);
            
            const flower = await FlowerModel.findById(flowerId);
            if(!flower) return res.status(400).send('flower not found'); 
            // console.log(flowerId);

            if(String(flower.shop) !== String(shopId)) return res.status(403).send('you are not allowed to access this flower');
            
            let userJwt = String(req.user._id);
            let shopUserId = String(shop.user);
            if(userJwt !== shopUserId)
                return res.status(403).send('you have not the permission to do this operation ')

            // chech user of  shop of flower is equal to user in jwt  String(req.user._id)

            if (String(flower.shop) == String(shopId)) {
                flower.sponsored = true
            }

            await flower.save();

            res.send(flower);
        } catch (error) {
            next(error);
        }
    }
}