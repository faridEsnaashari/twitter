const express = require('express');
const router = express.Router();

const postController = require('../controllers/register/post');
const checkValidation = require('../validation/registerValidation');

router.post('/', (req, res, next) => {
    try{
        checkValidation(req, res);
        postController(req, res);
    }
    catch(err){
        const error = {
            status: 422,
            success: false,
            message: err.message,
            field: err.field
        }
        return res.status(422).json(error);
    }
});

module.exports = router;