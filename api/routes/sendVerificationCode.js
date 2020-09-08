const express = require('express');
const router = express.Router();

const sendVerificationCodeHandler = require('../controllers/sendVerificationCode/get');
router.get('/', (req, res, next) => {
    sendVerificationCodeHandler();
});

module.exports = router;