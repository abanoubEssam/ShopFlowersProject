import { FlowerModel, insertFlowerSchema , validateOnUpdateFlowerSchema } from '../models/flower.models';
import {ShopModel} from '../models/shop.models';
const mongoose = require('mongoose');
import { validate } from '../services/validator.service';

export default {
    async findAllFowers(req , res , next){
        // const flowers = await FlowerModel.find().populate('shop');
        const flowers = await FlowerModel.find().sort({sponsored : -1 });
        console.log(flowers);
        res.send(flowers);
    },
    async findFlowers( req , res , next){
        try {
            let pageNumber = req.query.pageNumber;
            let pageSize = req.query.pageSize;

            const flowers = await FlowerModel.find()
            .skip((pageNumber - 1 ) * pageSize )
            .limit(Number(pageSize));
            res.send(flowers);

        } catch (error) {
            next(error);
        }
    },
    async insertFlower(req, res , next) {
        let { shopId } = req.params;
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.shopId)) {
                return res.status(400).send('please enter a valid  id '); // They didn't send an object ID
            }
            const shop = await ShopModel.findById(shopId);
            if (!shop) return res.status(400).send('shop not found');


            let userJwt = String(req.user._id);
            let shopUserId = String(shop.user);

            if(userJwt !== shopUserId)
                return res.status(403).send('you have not the permission to do this operation ')

            if (!req.file) {
                res.status(400).send('file is required !');
            }
            validate(req.body, insertFlowerSchema)
            let flower = await FlowerModel.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                flowerImage: 'http://localhost:3000/uploads/' + req.file.originalname,
                shop: shopId
            });
            //console.log(flower , ' flower console');
            res.send(flower);
            if(shop) {
                shop.totalFlowersCount += 1;
            }
            await shop.save();
            
        } catch (error) {
            next(error);
        }
    },
    async findFlowersByShopId(req , res , next){
        let { shopId } = req.params;
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.shopId)) {
                return res.status(400).send('please enter a valid  id '); // They didn't send an object ID
            }
            const shop = await ShopModel.findById(shopId);
            if (!shop) return res.status(400).send('shop not found');
            console.log(shopId);
            const flowers = await FlowerModel.find({shop : shopId});
            console.log(flowers);
         
            res.send(flowers);

        } catch (error) {
            next(error)
        }
    },
    async findFlowerById(req , res , next) {
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
            console.log(shopId);

            const flower = await FlowerModel.findById(flowerId);
            if(!flower) return res.status(400).send('flower not found'); 
            // console.log(flowerId);
            // console.log(flower);
            // console.log(flower.shop);
            // console.log(shopId);
            if(String(flower.shop) !== String(shopId)) return res.status(403).send('you are not allowed to access this flower');

            res.send(flower);

        } catch (error) {
            next(error);
        }
    },
    async updateFlower(req , res , next){
        let { shopId , flowerId } = req.params;
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.shopId)) {
                return res.status(400).send('please enter a valid  id '); // They didn't send an object ID
            }
            if (!mongoose.Types.ObjectId.isValid(req.params.flowerId)) {
                return res.status(400).send('please enter a valid  id '); // They didn't send an object ID
            }

            validate(req.body, validateOnUpdateFlowerSchema);

            const shop = await ShopModel.findById(shopId);
            if (!shop) return res.status(400).send('shop not found');
            console.log(shopId);

            const flower = await FlowerModel.findById(flowerId);
            if(!flower) return res.status(400).send('flower not found'); 
            console.log(flowerId);


            let userJwt = String(req.user._id);
            let shopUserId = String(shop.user);

            if(userJwt !== shopUserId)
                return res.status(403).send('you have not the permission to do this operation ')

            if(String(flower.shop) !== String(shopId)) return res.status(403).send('you are not allowed to access this flower');

            if (req.body.name) {
                flower.name = req.body.name
            }

            if (req.file) {
                flower.flowerImage = 'http://localhost:3000/uploads/' + req.file.originalname
            }

            await flower.save();

            res.send(flower);
        } catch (error) {
            next(error);
        }
    },
    async deleteFlower(req , res , next){
        let { shopId , flowerId } = req.params;
        try {
            if (!mongoose.Types.ObjectId.isValid(shopId)) {
                return res.status(400).send('please enter a valid  id '); // They didn't send an object ID
            }
            if (!mongoose.Types.ObjectId.isValid(flowerId)) {
                return res.status(400).send('please enter a valid  id '); // They didn't send an object ID
            }

            const shop = await ShopModel.findById(shopId);
            if (!shop) return res.status(400).send('shop not found');
            console.log(shopId);
            
            const flower = await FlowerModel.findById(flowerId);
            if(!flower) return res.status(400).send('flower not found'); 
            console.log(flowerId);


            let userJwt = String(req.user._id);
            let shopUserId = String(shop.user);

            if(userJwt !== shopUserId)
                return res.status(403).send('you have not the permission to do this operation ')

            if(String(flower.shop) !== String(shopId)) return res.status(403).send('you are not allowed to access this flower');

            if(String(flower.shop) == String(shopId)) {
                const flower = await FlowerModel.findByIdAndRemove(flowerId);
                if(!flower) return res.status(404).send('The shop with the given ID was not found.');
            }

            res.status(204).send('flower deleted successfuly ! ');

            if(shop) {
                shop.totalFlowersCount -= 1;
            }
            await shop.save();

        } catch (error) {
            next(error);
        }
    }

}