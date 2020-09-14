const express = require('express');
const router = express.Router();

const checkValidation = require('../../validation/twitt/gettwittValidation');
const getController = require('../../controllers/twitt/gettwitt/get');

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