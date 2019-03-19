import notifiController from '../controllers/user-push-token.controller';
import { JWTAuth } from "../services/passport.service";
const express = require('express');
const router = express.Router();


router.post('/subscribe', JWTAuth, notifiController.subscribe);

router.delete('/unsubscribe', JWTAuth, notifiController.unSubscribe);
module.exports = router;