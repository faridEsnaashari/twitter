const express = require('express');
const router = express.Router();

const getController = require(`${ global.controllers.verifycodeRoute }/get`);
const checkValidation = require(`${ global.validations.verifycodeRoute }/get`);

router.get('/', checkValidation, getController);

module.exports = router;