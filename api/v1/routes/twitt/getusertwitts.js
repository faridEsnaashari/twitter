const express = require('express');
const router = express.Router();

const getController = require(`${ global.controllers.getusertwittsRoute }/get`);
const checkValidation = require(`${ global.validations.getusertwittsRoute }/get`);

router.get('/', checkValidation, getController);

module.exports = router;