const express = require('express');
const router = express.Router();

const sendVerificationCodeHandler = require('../controllers/sendVerificationCode/get');
const checkValidation = require('../validation/sendVerificationCodeValidation');

router.get('/', (req, res, next) => {
    checkValidation(req, res);
    sendVerificationCodeHandler(req, res);
});

module.exports = router;