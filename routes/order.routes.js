import orderController from "../controllers/order.controller"

import { JWTAuth } from "../services/passport.service"
const express = require('express');
const router = express.Router();

router.post('/:userId/orders' , JWTAuth , orderController.makeOrder);
router.get('/:userId/orders' , JWTAuth , orderController.getOrder );

router.delete('/:userId/orders/:orderId' , JWTAuth , orderController.deleteOrder);

module.exports = router;