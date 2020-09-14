const {IsString, IsUndefinedOrNull } = require('../../tools/validation');

function checkValidation(req, res, next){
    try{
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
        next();
    }
    catch(err){
        return res.responseController.error(422, err.message, { field: err.field });
    }
    
}

module.exports = checkValidation;