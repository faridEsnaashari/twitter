const express = require('express');
const router = express.Router();

const checkValidation = require('../../validation/twitt/sendtwittValidation');
const postController = require('../../controllers/twitt/sendtwitt/post');

router.post('/', (req, res, next) => {
    try{
        checkValidation(req, res);
        postController(req, res);
    }
    catch(err){
        return res.responseController.error(422, err.message, { field: err.field });
    }
});

module.exports = router;