// here call controller
import  notifiController  from '../controllers/notification.controller'
import { JWTAuth } from "../services/passport.service"
const express = require('express');
const router = express.Router();

router.get('/' , JWTAuth , notifiController.getNotification );

module.exports = router;
