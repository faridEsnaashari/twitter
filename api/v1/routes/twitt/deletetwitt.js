const express = require('express');
const router = express.Router();

const getController = require(`${ global.controllers.deletetwittRoute }/get`);
const checkValidation = require(`${ global.validations.deletetwittRoute }/get`);

router.get('/', checkValidation, getController);

module.exports = router;