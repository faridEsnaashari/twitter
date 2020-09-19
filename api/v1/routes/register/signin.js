const express = require('express');
const router = express.Router();

const getController = require(`${ global.controllers.signinRoute }/get`);
const checkValidation = require(`${ global.validations.signinRoute }/get`);

router.get('/', checkValidation, getController);

module.exports = router;