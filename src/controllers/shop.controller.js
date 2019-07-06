const { ShopModel, validateOnUpdateSchema, CreateShopSchema, GeoSchema } = require('../models/shop.models');
const mongoose = require('mongoose');
// const Loc = mongoose.model('Location');

import { validate } from '../services/validator.service';

export default {

    // async findAll(req, res , next){

    //     try {
    //         const shops = await ShopModel.find().select('name shopImage');
    //         res.send(shops);
    //     } catch (error) {
    //         next(error);
    //     }
    // },

    async findAllUsePagination(req, res, next) {
        // console.log(shops.length);
        let pageNumber = Number(req.query.pageNumber) || 1;
        let pageSize = Number(req.query.pageSize) || 5;

        try {
            const shops = await ShopModel.find()
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                // .select('name shopImage');

            // console.log(shops.length);
            const countShop = await ShopModel.count();
            // console.log('all shops : ', countShop);
            let remainingShops = Math.ceil(countShop - pageSize);
            // console.log('remaining pages : ', Math.ceil(remainingShops / pageSize))
            let pageCount = Math.ceil(countShop / pageSize)
            res.send({ data: shops, pageNumber, pageSize, totalCount: countShop, pageCount });
        } catch (error) {
            next(error);
        }


    },
    // to find nearest shop
    async findNear(req, res, next) {
        try {
            let radius = req.query.radius || 10;
            let lng = req.query.lng;
            let lat = req.query.lat;

            if (!lng || !lat) return res.status(400).send('please lng lat is req');

            let shops = await ShopModel.find({
                "geometry": {
                    "$nearSphere": {
                        "$geometry": {
                            "type": "Point",
                            "coordinates": [lng, lat]
                        },
                        $maxDistance: radius * 1000
                    }
                }
            })
            res.send(shops);
        } catch (error) {
            next(error)
        }
    },

    async createShop(req, res) {
        try {

            if (!req.file) {
                res.status(400).send('file is required !');
            }
            validate(req.body, CreateShopSchema)

            // console.log('shop model : ' , ShopModel , ' : this is a shop model console');
            let shop = await ShopModel.create({
                name: req.body.name,
                shopImage: 'http://localhost:3000/uploads/' + req.file.originalname,
                user: req.user._id,
                geometry: {
                    type: "Point",
                    coordinates: [req.body.geometryLng, req.body.geometryLat]
                }
            });
            res.status(201).send(shop);
        } catch (error) {
        }
    },

    // delete shop using id
    async delete(req, res, next) {

        try {
            // chech if it is right id
            if (!mongoose.Types.ObjectId.isValid(req.params.shopId)) {
                return res.status(400).send('please enter a valid  id '); // They didn't send an object ID
            }
            const shop = await ShopModel.findByIdAndRemove(req.params.shopId);
            if (!shop) return res.status(404).send('The shop with the given ID was not found.');
            // the shop deleted successfuly and there is no content to shown(204)
            if (String(req.user._id) !== String(shop.user)) return res.status(403).send('you are not allowed to access .');
            res.status(204).send('deleted successfuly ! ');
        } catch (error) {
            next(error);
        }
    },

    // update shop name
    async updateShop(req, res, next) {
        
        try {
            // chech if it is right id
            if (!mongoose.Types.ObjectId.isValid(req.params.shopId)) {
                return res.status(400).send('please enter a valid  id '); // They didn't send an object ID
            }

            validate(req.body, validateOnUpdateSchema)
            // const { error } = validateOnUpdate(req.body);
            // if (error) return res.status(400).send(error.details[0].message);

            let shop = await ShopModel.findById(req.params.shopId);

            // if (req.user._id !== shop.user) return res.status(403).send('you are not the owner');

            if (!shop) return res.status(404).send('The genre with the given ID was not found.');

            if (String(req.user._id) !== String(shop.user)) return res.status(403).send('you are not allowed to access .');

            if (req.body.name) {
                shop.name = req.body.name
            }


            if (Number(req.body.geometryLng) && Number(req.body.geometryLat)) {
                shop.geometry.coordinates = [Number(req.body.geometryLng), Number(req.body.geometryLat)]
            }

            if (req.file) {
                shop.shopImage = 'http://localhost:3000/uploads/' + req.file.originalname
            }

            await shop.save();

            res.send(shop);
        } catch (error) {
            next(error)
        }
    },

    // find shop by id
    async findeShopById(req, res, next) {

        try {
            const shop = await ShopModel.findById(req.params.shopId);
            if (!shop) return res.status(404).send('The shop with the given ID was not found.');
            // the shop deleted successfuly and there is no content to shown(204)
            res.status(200).send(shop);
        } catch (error) {
            next(error)
        }
    }
}