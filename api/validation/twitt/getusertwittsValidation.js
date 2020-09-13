const {IsString, IsUndefinedOrNull } = require('../../tools/validation');

function checkValidation(req, res){
    if(IsUndefinedOrNull(req.query.user_id)){
        const error = {
            message: 'user_id null or undefined',
            field: 'user_id',
            error: 'undefined'
        }
        throw error;
    }
    if(!IsString(req.query.user_id)){
        const error = {
            message: 'user_id should be string',
            field: 'user_id',
            error: 'wrong format'
        }
        throw error;
    }
}

module.exports = checkValidation;