const express = require('express');
const router = express.Router();

const getController = require('../../controllers/register/verifyCode/get');
const checkValidation = require('../../validation/register/verifyCodeValidation');

router.get('/', checkValidation, getController);

module.exports = router;