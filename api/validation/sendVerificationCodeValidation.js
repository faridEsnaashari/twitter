const {isString, isUndefinedOrNull} = require('../tools/tools');

function checkValidation(req, res){
    if(isUndefinedOrNull(req.query.phonenumber)){
        responseJson = {
            message: "bad parameter provided"
        };

        return res.status(400).json(responseJson);
    }
    if(!isString(req.query.phonenumber)){
        responseJson = {
            message: "bad parameter provided"
        };

        return res.status(400).json(responseJson);
    }
}

module.exports = checkValidation;