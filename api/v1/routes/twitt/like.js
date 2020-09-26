const express = require('express');
const router = express.Router();

const getController = require(`${ global.controllers.likeRoute }/get`);
const checkValidation = require(`${ global.validations.likeRoute }/get`);
const getSigninToken = require(global.middleware.processAuthorization);

router.get('/', getSigninToken, checkValidation, getController);

module.exports = router;
