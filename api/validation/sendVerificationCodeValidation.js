const {isString, isUndefinedOrNull, isPhoneNumber} = require('../tools/tools');

function checkValidation(req, res){
    if(isUndefinedOrNull(req.query.phonenumber)){
        console.log("un");
        return false;
    }
    if(!isString(req.query.phonenumber)){
        console.log("st");
        return false;
    }
    if(!isPhoneNumber(req.query.phonenumber)){
        return false;
    }
    return true;
}

module.exports = checkValidation;