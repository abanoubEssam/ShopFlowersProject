import sponserController from '../controllers/sponser.controller'
import {JWTAuth} from "../services/passport.service"
const express = require('express');
const router = express.Router();

router.put('/:shopId/flowers/:flowerId/sponsered' , JWTAuth , sponserController.makeItSponsered );
module.exports = router;
