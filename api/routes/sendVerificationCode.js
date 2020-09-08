const express = require('express');
const router = express.Router();

const sendVerificationCodeHandler = require('../controllers/sendVerificationCode/get');
const checkValidation = require('../validation/sendVerificationCodeValidation');

router.get('/', (req, res, next) => {
    if(checkValidation(req, res)){
        sendVerificationCodeHandler(req, res);
    }
    else{
        responseJson = {
            message: "bad parameter provided"
        };

        return res.status(400).json(responseJson);
    }
});

module.exports = router;