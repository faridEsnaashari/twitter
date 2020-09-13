const {IsString, IsUndefinedOrNull } = require('../../tools/validation');

function checkValidation(req, res){
    if(IsUndefinedOrNull(req.query.twitt_id)){
        const error = {
            message: 'twitt_id null or undefined',
            field: 'twitt_id',
            error: 'undefined'
        }
        throw error;
    }
    if(!IsString(req.query.twitt_id)){
        const error = {
            message: 'twitt_id should be string',
            field: 'twitt_id',
            error: 'wrong format'
        }
        throw error;
    }
}

module.exports = checkValidation;