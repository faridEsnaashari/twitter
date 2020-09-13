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
        const error = {
            status: 422,
            success: false,
            message: err.message,
            field: err.field
        }
        return res.status(422).json(error);
    }
});

module.exports = router;