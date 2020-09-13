const {IsString, IsUndefinedOrNull, IsIranMobile, IsIranNationalCode} = require('../../tools/validation');

function checkValidation(req, res){
    if(IsUndefinedOrNull(req.body.username)){
        const error = {
            message: 'username null or undefined',
            field: 'username',
            error: 'undefined'
        }
        throw error;
    }
    if(IsUndefinedOrNull(req.body.userfamily)){
        const error = {
            message: 'userfamily null or undefined',
            field: 'userfamily',
            error: 'undefined'
        }
        throw error;
    }
    if(IsUndefinedOrNull(req.body.phonenumber)){
        const error = {
            message: 'phonenumber null or undefined',
            field: 'phonenumber',
            error: 'undefined'
        }
        throw error;
    }
    if(IsUndefinedOrNull(req.body.national_id_number)){
        const error = {
            message: 'national_id_number null or undefined',
            field: 'national_id_number',
            error: 'undefined'
        }
        throw error;
    }
    if(!IsString(req.body.username)){
        const error = {
            message: 'username should be string',
            field: 'username',
            error: 'wrong format'
        }
        throw error;
    }
    if(!IsString(req.body.userfamily)){
        const error = {
            message: 'userfamily should be string',
            field: 'userfamily',
            error: 'wrong format'
        }
        throw error;
    }
    if(!IsString(req.body.phonenumber)){
        const error = {
            message: 'phonenumber should be string',
            field: 'phonenumber',
            error: 'wrong format'
        }
        throw error;
    }
    if(!IsString(req.body.national_id_number)){
        const error = {
            message: 'national_id_number should be string',
            field: 'national_id_number',
            error: 'wrong format'
        }
        throw error;
    }
    if(!IsIranNationalCode(req.body.national_id_number)){
        const error = {
            message: 'the format of national_id_number is not a iran national_id_number',
            field: 'national_id_number',
            error: 'not iran national code'
        }
        throw error;
    }
    if(!IsIranMobile(req.body.phonenumber)){
        const error = {
            message: 'the format of phonenumber is not a iran phonenumber',
            field: 'phonenumber',
            error: 'not iran phonenumber'
        }
        throw error;
    }
}

module.exports = checkValidation;