import authController from '../controllers/auth.controller';
import {AuthLocal} from '../services/passport.service';
const express = require('express');
const router = express.Router();

router.post('/', AuthLocal , authController.Login);

module.exports = router;