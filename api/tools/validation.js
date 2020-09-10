function IsString(value){
    if(typeof value === "string"){
        return true;
    }
    else{
        return false;
    }
}

function IsUndefinedOrNull(value){
    if(!value){
        return true;
    }
    else{
        return false;
    }
}

function containAlphabetical(value){
    const reg = new RegExp('^[0-9]+$');
    if(value.length === 11 && reg.test(value)){
        return true;
    }
    else{
        return false;
    }
}

function IsIranMobile(Data){
    const pattern = new RegExp(/^(?:98|\+98|0098|0)?9[0-9]{9}$/);
    if(pattern.test(String(Data).toLowerCase())){
        return true;
    } 
    else {
        return false;
    }
}

function IsIranNationalCode(Data){
    const pattern = new RegExp(/^\d{10}$/);
    if (!pattern.test(Data)){
        return false;
    }
    var check = +Data[9];
    var sum = Array(9).fill().map((_, i) => +Data[i] * (10 - i)).reduce((x, y) => x + y) % 11;
    if((sum < 2 && check == sum) || (sum >= 2 && check + sum == 11)){
        return true;
    } 
    else {
        return false;
    }
}


module.exports.IsString = IsString;
module.exports.IsUndefinedOrNull = IsUndefinedOrNull;
module.exports.containAlphabetical = containAlphabetical;
module.exports.IsIranMobile = IsIranMobile;
module.exports.IsIranNationalCode = IsIranNationalCode;