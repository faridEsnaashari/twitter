const express = require('express');
const router = express.Router();

const postController = require('../../controllers/register/register/post');
const checkValidation = require('../../validation/register/registerValidation');

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