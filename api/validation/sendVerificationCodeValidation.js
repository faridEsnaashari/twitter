const {isString, isUndefinedOrNull} = require('../tools/tools');

function checkValidation(req, res){
    if(isUndefinedOrNull(req.query.phonenumber)){
        return false;
    }
    if(!isString(req.query.phonenumber)){
        return false;
    }
    return true;
}

module.exports = checkValidation;