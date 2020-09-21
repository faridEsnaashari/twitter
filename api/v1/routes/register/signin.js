const express = require('express');
const router = express.Router();

const getController = require(`${ global.controllers.signinRoute }/get`);
const checkValidation = require(`${ global.validations.signinRoute }/get`);
const getSigninToken = require(global.middleware.processAuthorization);

router.get('/', getSigninToken, checkValidation, getController);

module.exports = router;