import userController from '../controllers/user.controller';
import { upload } from '../services/multer.service';
import { JWTAuth } from "../services/passport.service"
const express = require('express');
const router = express.Router();



router.get('/', userController.findAll);
router.post('/', upload.single('userImage'), userController.createUser);
router.delete('/:userId', JWTAuth , userController.delete);
router.put('/:userId', JWTAuth , upload.single('userImage'), userController.updateUser);
router.get('/:userId', JWTAuth , userController.findUserById);

module.exports = router;