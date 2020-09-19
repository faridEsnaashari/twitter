const express = require('express');
const router = express.Router();

const postController = require(`${ global.controllers.registerRoute }/post`);
const checkValidation = require(`${ global.validations.registerRoute }/post`);

router.post('/', checkValidation, postController);

module.exports = router;