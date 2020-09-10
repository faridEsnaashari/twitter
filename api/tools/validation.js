function isString(value){
    if(typeof value === "string"){
        return true;
    }
    else{
        return false;
    }
}

function isUndefinedOrNull(value){
    if(!value){
        return true;
    }
    else{
        return false;
    }
}

function isPhoneNumber(value){
    const reg = new RegExp('^[0-9]+$');
    if(value.length === 11 && reg.test(value)){
        return true;
    }
    else{
        return false;
    }
}


module.exports.isString = isString;
module.exports.isUndefinedOrNull = isUndefinedOrNull;
module.exports.isPhoneNumber = isPhoneNumber;