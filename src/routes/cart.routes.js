import cartController from "../controllers/cart.controller"

import { JWTAuth } from "../services/passport.service"
const express = require('express');
const router = express.Router({mergeParams : true});

router.post('/:flowerId' , JWTAuth , cartController.makeCart);
router.get('/' , JWTAuth , cartController.getCart );
// router.get('/:userId/cart/:flowerId' , JWTAuth , cartController.getCart );

router.delete('/:flowerId' , JWTAuth , cartController.deleteFlower);
// router.delete('/:userId/cart/:cartId' , JWTAuth , cartController.deleteCart);

module.exports = router;