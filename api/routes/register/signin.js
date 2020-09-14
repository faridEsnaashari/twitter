const express = require('express');
const router = express.Router();

const getController = require('../../controllers/register/signin/get');
const checkValidation = require('../../validation/register/signinValidation');

router.get('/', checkValidation, getController);

module.exports = router;