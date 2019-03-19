import {upload} from '../services/multer.service';
import flowersController from '../controllers/flower.controller';
import {JWTAuth} from "../services/passport.service"

const express = require('express');
const router = express.Router();

// flowers
router.get('/' , flowersController.findAllFowers);

// this route will be shops/flowers?pageNumber=AnyNum&pageSize=AnyNum
router.get('/flowers' , flowersController.findFlowers);

// shops/:shopId/flowers
router.post('/:shopId/flowers' , JWTAuth , upload.single('flowerImage'), flowersController.insertFlower );
router.get('/:shopId/flowers'  , flowersController.findFlowersByShopId);

// shops/:shopId/flowers/:flowerId
router.get('/:shopId/flowers/:flowerId' , flowersController.findFlowerById);
router.put('/:shopId/flowers/:flowerId' , JWTAuth , upload.single('flowerImage'), flowersController.updateFlower );
router.delete('/:shopId/flowers/:flowerId' , JWTAuth , flowersController.deleteFlower);

module.exports = router;