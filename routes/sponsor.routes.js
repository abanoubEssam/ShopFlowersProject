import sponsorController from '../controllers/sponsor.controller'
import {JWTAuth} from "../services/passport.service"
const express = require('express');
const router = express.Router({mergeParams : true});

router.put('/:flowerId/sponsored' , JWTAuth , sponsorController.makeItSponsored );
module.exports = router;
