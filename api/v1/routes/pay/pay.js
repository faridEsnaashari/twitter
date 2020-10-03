const express = require('express');
const router = express.Router();

const getSigninToken = require(global.middleware.processAuthorization);

const getControllerPay = require(`${ global.controllers.payRoute }/get`);
const checkValidationPay = require(`${ global.validations.payRoute }/get`);

const getControllerVerify = require(`${ global.controllers.payVerifyRoute }/get`);

router.get('/', checkValidationPay, getControllerPay);
router.get('/verify', getControllerVerify);

module.exports = router;
