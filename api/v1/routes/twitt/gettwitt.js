const express = require('express');
const router = express.Router();

const getController = require(`${ global.controllers.gettwittRoute }/get`);
const checkValidation = require(`${ global.validations.gettwittRoute }/get`);

router.get('/', checkValidation, getController);

module.exports = router;