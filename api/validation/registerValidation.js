const {IsString, IsUndefinedOrNull, IsIranMobile, IsIranNationalCode} = require('../tools/validation');

function checkValidation(req, res){
    if(IsUndefinedOrNull(req.body.username)){
        return false;
    }
    if(IsUndefinedOrNull(req.body.userfamily)){
        return false;
    }
    if(IsUndefinedOrNull(req.body.phonenumber)){
        return false;
    }
    if(IsUndefinedOrNull(req.body.national_id_number)){
        return false;
    }
    if(!IsString(req.body.username)){
        return false;
    }
    if(!IsString(req.body.userfamily)){
        return false;
    }
    if(!IsString(req.body.phonenumber)){
        return false;
    }
    if(!IsString(req.body.national_id_number)){
        return false;
    }
    if(!IsIranNationalCode(req.body.national_id_number)){
        return false;
    }
    if(!IsIranMobile(req.body.phonenumber)){
        return false;
    }
    return true;
}

module.exports = checkValidation;