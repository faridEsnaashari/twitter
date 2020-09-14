const {IsString, IsUndefinedOrNull, IsIranMobile} = require('../../tools/validation');

function checkValidation(req, res){
    if(IsUndefinedOrNull(req.query.signin_token)){
        const error = {
            message: 'signin_token null or undefined',
            field: 'signin_token',
            error: 'undefined'
        }
        throw error;
    }
    if(!IsString(req.query.signin_token)){
        const error = {
            message: 'signin_token should be string',
            field: 'signin_token',
            error: 'wrong format'
        }
        throw error;
    }
}

module.exports = checkValidation;