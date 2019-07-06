import shopingController from '../controllers/shop.controller';
import {JWTAuth} from "../services/passport.service"
import {upload} from '../services/multer.service';
const express = require('express');
const router = express.Router();


import flowerRoute from './flower.routes';
import allFlowerRoute from './allFlowers.routes';
import sponsorRoute from './sponsor.routes';


// why use it ?
router.use('/:shopId/flowers' ,  flowerRoute);
router.use('/flowers' ,  allFlowerRoute);
router.use('/:shopId/flowers' , sponsorRoute)
// /shops
// shops/page?pageNumber=2&pageSize=2
// shops/page?pageNumber=2&pageSize=2
// router.get('/page'  , shopingController.findAllUsePagination);

// shops/near?lat=30&lng=45
router.get('/near'  , shopingController.findNear);

router.delete('/:shopId' , JWTAuth ,  shopingController.delete );
router.put('/:shopId' , JWTAuth , upload.single('shopImage') ,shopingController.updateShop );
router.get('/:shopId'  , shopingController.findeShopById );

router.post('/', JWTAuth ,  upload.single('shopImage') , shopingController.createShop );
router.get('/' , shopingController.findAllUsePagination);



module.exports = router;