const express = require('express');
const router = express.Router();

const postController = require(`${ global.controllers.sendtwittRoute }/post`);
const checkValidation = require(`${ global.validations.sendtwittRoute }/post`);
const getSigninToken = require(global.middleware.processAuthorization);

router.post('/', getSigninToken, checkValidation, postController);

module.exports = router;