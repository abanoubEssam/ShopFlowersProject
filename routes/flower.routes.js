import { upload } from '../services/multer.service';
import flowersController from '../controllers/flower.controller';
import { JWTAuth } from "../services/passport.service"

const express = require('express');
const router = express.Router({mergeParams : true});

// import shopRoute from './shop.routes'
// router.use('/shops' ,  shopRoute);

// flowers
// router.get('/', flowersController.findAllFowers);

// this route will be shops/flowers?pageNumber=AnyNum&pageSize=AnyNum
// router.get('/', flowersController.findFlowers);

// shops/:shopId/flowers

// shops/:shopId/flowers/:flowerId
router.get('/:flowerId', flowersController.findFlowerById);
router.put('/:flowerId', JWTAuth, upload.single('flowerImage'), flowersController.updateFlower);
router.delete('/:flowerId', JWTAuth, flowersController.deleteFlower);

router.post('/', JWTAuth, upload.single('flowerImage'), flowersController.insertFlower);
router.get('/', flowersController.findFlowersByShopId);
module.exports = router;