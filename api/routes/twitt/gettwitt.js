const express = require('express');
const router = express.Router();

const checkValidation = require('../../validation/twitt/gettwittValidation');
const getController = require('../../controllers/twitt/gettwitt/get');

router.get('/', checkValidation, getController);

module.exports = router;