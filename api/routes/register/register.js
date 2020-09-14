const express = require('express');
const router = express.Router();

const postController = require('../../controllers/register/register/post');
const checkValidation = require('../../validation/register/registerValidation');

router.post('/', checkValidation, postController);

module.exports = router;