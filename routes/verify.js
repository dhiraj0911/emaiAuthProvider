const express = require('express');
const {
    sendotp, 
    verifyotp
} = require('../handler/otp')
const router = express.Router();


router.post('/sendotp', sendotp);
router.post('/verifyotp', verifyotp);

module.exports = router