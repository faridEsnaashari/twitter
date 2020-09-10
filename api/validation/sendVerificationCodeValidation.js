const {IsString, IsUndefinedOrNull, IsIranMobile} = require('../tools/validation');

function checkValidation(req, res){
    if(IsUndefinedOrNull(req.query.phonenumber)){
        return false;
    }
    if(!IsString(req.query.phonenumber)){
        return false;
    }
    if(!IsIranMobile(req.query.phonenumber)){
        return false;
    }
    if(IsUndefinedOrNull(req.query.code)){
        return false;
    }
    if(!IsString(req.query.code)){
        return false;
    }
    return true;
}

module.exports = checkValidation;