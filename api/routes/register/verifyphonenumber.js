const express = require('express');
const router = express.Router();

const getController = require('../../controllers/register/verifyphonenumber/get');
const checkValidation = require('../../validation/register/verifyphonenumberValidation');

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