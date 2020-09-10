const express = require('express');
const router = express.Router();

const getController = require('../controllers/verifyCode/get');
const checkValidation = require('../validation/verifyCodeValidation');

router.get('/', (req, res, next) => {
    if(checkValidation(req, res)){
        getController(req, res);
    }
    else{
        responseJson = {
            message: "bad parameter provided"
        };

        return res.status(400).json(responseJson);
    }
});

module.exports = router;