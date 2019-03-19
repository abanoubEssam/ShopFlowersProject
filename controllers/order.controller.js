const mongoose = require('mongoose')
import { CartModel } from '../models/cart.models'
import { orderModel } from '../models/order.models'
import { sendNotifi } from '../services/notification.service'
import { FlowerModel } from '../models/flower.models'
import { ShopModel } from '../models/shop.models'
import { UserModel } from '../models/user.models'
import dsClient from '../services/deepstreem.client.service'
export default {

    async makeOrder(req, res, next) {
        try {
            let userId = String(req.params.userId);

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).send('please enter a valid  id for user '); // They didn't send an object ID
            }

            if (String(req.user._id) !== String(userId)) return res.status(403).send('you are not allowed to access .');
            // const flowers = await CartModel.find({user : userId}).populate('flowers');
            const getCartData = await CartModel.findOne({ user: userId });

            if (!getCartData)
                return res.status(404).send('that cart not found');

            let shopOrders = {};

            for (let flowerIdInCart of getCartData.flowers) {
                let flower = await FlowerModel.findById(flowerIdInCart);
                if (!shopOrders[flower.shop])
                    shopOrders[flower.shop] = { flowers: [], price: 0 }

                shopOrders[flower.shop].flowers.push(flower._id)
                shopOrders[flower.shop].price += flower.price;

            }

            Object.keys(shopOrders).forEach(async (shopId) => {
                await orderModel.create({
                    user: userId,
                    flowers: shopOrders[shopId].flowers,
                    totalPrice: shopOrders[shopId].price,
                    shop: shopId
                });
                
                let shop =  await ShopModel.findById(shopId);
                let userName = await UserModel.findById(userId);
                let shopOwner = shop.user;
                console.log('shop user' , shop.user);
                console.log(' user name ' , userName.name);
                // user :  find shop by id and get its user id
                //text : name of user ordered take an order
                await sendNotifi(shopOwner , userName.name + " make order from your shop" )
                console.log(shopOwner);
                console.log(`/providers/${shopOwner}`);
                dsClient.event.emit(`/providers/${shopOwner}` , {newOrder: true , shopId});
            })


            await getCartData.remove();
            res.send();

        } catch (error) {
            next(error)
        }
    },
    async getOrder(req, res, next) {
        let userId = String(req.params.userId);

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send('please enter a valid  id for user '); // They didn't send an object ID
        }

        if (String(req.user._id) !== String(userId)) return res.status(403).send('you are not allowed to access .');
        const flowers = await orderModel.find({ user: userId }).populate('flowers');
        // const getOrderData = await orderModel.findOne({user : userId} , {} , {});

        res.send(flowers)
    },
    async deleteOrder(req, res, next) {

        try {

            let userId = String(req.params.userId);
            let orderId = String(req.params.orderId);

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).send('please enter a valid  id for user '); // They didn't send an object ID
            }
            if (!mongoose.Types.ObjectId.isValid(orderId)) {
                return res.status(400).send('please enter a valid  id for order '); // They didn't send an object ID
            }

            if (String(req.user._id) !== String(userId)) return res.status(403).send('you are not allowed to access .');
            // const flowers = await orderModel.find({user : userId , order}).populate('flowers');

            const getOrderId = await orderModel.findById(orderId);
            if (String(orderId) !== String(getOrderId._id)) return res.status(403).send('you are not allowed to access .');


            const getOrderIdAndDelete = await orderModel.findByIdAndDelete(orderId);



            res.status(204).send(getOrderIdAndDelete);
        } catch (error) {
            next(error);
        }

    }

}