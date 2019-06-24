import favController from "../controllers/favflowers.controllers"
import { JWTAuth } from "../services/passport.service"
const express = require('express');
const router = express.Router({mergeParams : true});


router.post('/:flowerId' , JWTAuth , favController.makeFav);
router.get('/' , JWTAuth , favController.getFav )
router.delete('/:flowerId' , JWTAuth , favController.deleteFav);

module.exports = router;