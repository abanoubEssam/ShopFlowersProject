import shopingController from '../controllers/shop.controller';
import {JWTAuth} from "../services/passport.service"
import {upload} from '../services/multer.service';
const express = require('express');
const router = express.Router();


import flowerRoute from './flower.routes';

// why use it ?
router.use('/flowers' ,  flowerRoute);

// /shops
// shops/page?pageNumber=2&pageSize=2
router.get('/' , shopingController.findAllUsePagination);

// shops/page?pageNumber=2&pageSize=2
// router.get('/page'  , shopingController.findAllUsePagination);

// shops/near?lat=30&lng=45
router.get('/near'  , shopingController.findNear);

router.post('/', JWTAuth ,  upload.single('shopImage') , shopingController.createShop );
router.delete('/:shopId' , JWTAuth ,  shopingController.delete );
router.put('/:shopId' , JWTAuth , upload.single('shopImage') ,shopingController.updateShop );
router.get('/:shopId' , JWTAuth , shopingController.findeShopById );




module.exports = router;