const express = require('express');
const router = express.Router();

const checkValidation = require('../../validation/twitt/sendtwittValidation');
const postController = require('../../controllers/twitt/sendtwitt/post');

router.post('/', checkValidation, postController);

module.exports = router;