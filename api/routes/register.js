const express = require('express');
const router = express.Router();

const postController = require('../controllers/register/post');
const checkValidation = require('../validation/registerValidation');

router.post('/', (req, res, next) => {
    if(checkValidation(req, res)){
        postController(req, res);
    }
    else{
        responseJson = {
            message: "bad parameter provided"
        };

        return res.status(422).json(responseJson);
    }
});

module.exports = router;