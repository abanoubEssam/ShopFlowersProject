import orderController from "../controllers/order.controller"

import { JWTAuth } from "../services/passport.service"
const express = require('express');
const router = express.Router();

router.post('/' , JWTAuth , orderController.makeOrder);
router.get('/' , JWTAuth , orderController.getOrder );

router.delete('/:orderId' , JWTAuth , orderController.deleteOrder);

module.exports = router;