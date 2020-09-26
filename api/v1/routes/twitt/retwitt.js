const express = require('express');
const router = express.Router();

const getController = require(`${ global.controllers.retwittRoute }/get`);
const checkValidation = require(`${ global.validations.retwittRoute }/get`);
const getSigninToken = require(global.middleware.processAuthorization);

router.get('/', getSigninToken, checkValidation, getController);

module.exports = router;
