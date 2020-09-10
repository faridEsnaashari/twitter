const {isString, isUndefinedOrNull, isPhoneNumber} = require('../tools/tools');

function checkValidation(req, res){
    if(isUndefinedOrNull(req.body.username)){
        return false;
    }
    if(isUndefinedOrNull(req.body.userfamily)){
        return false;
    }
    if(isUndefinedOrNull(req.body.phonenumber)){
        return false;
    }
    if(isUndefinedOrNull(req.body.national_id_number)){
        return false;
    }
    if(!isString(req.body.username)){
        return false;
    }
    if(!isString(req.body.userfamily)){
        return false;
    }
    if(!isString(req.body.phonenumber)){
        return false;
    }
    if(!isString(req.body.national_id_number)){
        return false;
    }
    if(!isPhoneNumber(req.body.phonenumber)){
        return false;
    }
    return true;
}

module.exports = checkValidation;