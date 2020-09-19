const express = require('express');
const router = express.Router();

const postController = require(`${ global.controllers.sendtwittRoute }/post`);
const checkValidation = require(`${ global.validations.sendtwittRoute }/post`);

router.post('/', checkValidation, postController);

module.exports = router;