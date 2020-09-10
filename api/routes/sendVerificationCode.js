const express = require('express');
const router = express.Router();

const getController = require('../controllers/sendVerificationCode/get');
const checkValidation = require('../validation/sendVerificationCodeValidation');

router.get('/', (req, res, next) => {
    if(checkValidation(req, res)){
        getController(req, res);
    }
    else{
        responseJson = {
            message: "bad parameter provided"
        };

        return res.status(422).json(responseJson);
    }
});

module.exports = router;