import favController from "../controllers/favflowers.controllers"
import { JWTAuth } from "../services/passport.service"
const express = require('express');
const router = express.Router();


router.post('/:userId/favourites/:flowerId' , JWTAuth , favController.makeFav);
router.get('/:userId/favourites' , JWTAuth , favController.getFav )
router.delete('/:userId/favourites/:flowerId' , JWTAuth , favController.deleteFav);

module.exports = router;