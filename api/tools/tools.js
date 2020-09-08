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


module.exports.isString = isString;
module.exports.isUndefinedOrNull = isUndefinedOrNull;