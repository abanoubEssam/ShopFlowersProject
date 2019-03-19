import cartController from "../controllers/cart.controller"

import { JWTAuth } from "../services/passport.service"
const express = require('express');
const router = express.Router();

router.post('/:userId/cart/:flowerId' , JWTAuth , cartController.makeCart);
router.get('/:userId/cart' , JWTAuth , cartController.getCart );
// router.get('/:userId/cart/:flowerId' , JWTAuth , cartController.getCart );

router.delete('/:userId/cart/:flowerId' , JWTAuth , cartController.deleteFlower);
// router.delete('/:userId/cart/:cartId' , JWTAuth , cartController.deleteCart);

module.exports = router;