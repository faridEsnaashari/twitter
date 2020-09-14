const express = require('express');
const router = express.Router();

const checkValidation = require('../../validation/twitt/deletetwittValidation');
const getController = require('../../controllers/twitt/deletetwitt/get');

router.get('/', checkValidation, getController);

module.exports = router;