import { upload } from '../services/multer.service';
import flowersController from '../controllers/flower.controller';
import { JWTAuth } from "../services/passport.service"

const express = require('express');
const router = express.Router();

// flowers
router.get('/', flowersController.findFlowers);

// this route will be shops/flowers?pageNumber=AnyNum&pageSize=AnyNum
// router.get('/flowers', flowersController.findFlowers);

module.exports = router;
