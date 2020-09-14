const express = require('express');
const router = express.Router();

const getController = require('../../controllers/register/verifyphonenumber/get');
const checkValidation = require('../../validation/register/verifyphonenumberValidation');

router.get('/', checkValidation, getController);

module.exports = router;