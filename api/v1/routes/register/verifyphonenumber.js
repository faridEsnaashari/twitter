const express = require('express');
const router = express.Router();

const getController = require(`${ global.controllers.verifyphonenumberRoute }/get`);
const checkValidation = require(`${ global.validations.verifyphonenumberRoute }/get`);

router.get('/', checkValidation, getController);

module.exports = router;