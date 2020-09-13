const {IsString, IsUndefinedOrNull, IsIranMobile} = require('../../tools/validation');

function checkValidation(req, res){
    if(IsUndefinedOrNull(req.query.phonenumber)){
        const error = {
            message: 'phonenumber null or undefined',
            field: 'phonenumber',
            error: 'undefined'
        }
        throw error;
    }
    if(!IsString(req.query.phonenumber)){
        const error = {
            message: 'phonenumber should be string',
            field: 'phonenumber',
            error: 'wrong format'
        }
        throw error;
    }
    if(!IsIranMobile(req.query.phonenumber)){
        const error = {
            message: 'the format of phonenumber is not a iran phonenumber',
            field: 'phonenumber',
            error: 'not iran phonenumber'
        }
        throw error;
    }
    if(IsUndefinedOrNull(req.query.code)){
        const error = {
            message: 'code null or undefined',
            field: 'code',
            error: 'undefined'
        }
        throw error;
    }
    if(!IsString(req.query.code)){
        const error = {
            message: 'code should be string',
            field: 'code',
            error: 'wrong format'
        }
        throw error;
    }
}

module.exports = checkValidation;