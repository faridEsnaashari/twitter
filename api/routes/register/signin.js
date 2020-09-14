const express = require('express');
const router = express.Router();

const getController = require('../../controllers/register/signin/get');
const checkValidation = require('../../validation/register/signinValidation');

router.get('/', (req, res, next) => {
    try{
        checkValidation(req, res);
        getController(req, res);
    }
    catch(err){
        return res.responseController.error(422, err.message, { field: err.field });
    }
});

module.exports = router;