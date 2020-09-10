const {isString, isUndefinedOrNull, isPhoneNumber} = require('../tools/validation');

function checkValidation(req, res){
    if(isUndefinedOrNull(req.query.phonenumber)){
        return false;
    }
    if(!isString(req.query.phonenumber)){
        return false;
    }
    if(!isPhoneNumber(req.query.phonenumber)){
        return false;
    }
    if(isUndefinedOrNull(req.query.code)){
        return false;
    }
    if(!isString(req.query.code)){
        return false;
    }
    return true;
}

module.exports = checkValidation;