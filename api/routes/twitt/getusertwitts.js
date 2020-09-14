const express = require('express');
const router = express.Router();

const checkValidation = require('../../validation/twitt/getusertwittsValidation');
const getController = require('../../controllers/twitt/getusertwitts/get');

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