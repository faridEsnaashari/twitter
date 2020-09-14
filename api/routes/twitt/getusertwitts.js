const express = require('express');
const router = express.Router();

const checkValidation = require('../../validation/twitt/getusertwittsValidation');
const getController = require('../../controllers/twitt/getusertwitts/get');

router.get('/', checkValidation, getController);

module.exports = router;