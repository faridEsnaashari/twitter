const { path } = require('../../../config');
const { IsString, IsUndefinedOrNull } = require(path.tools.validation);

function checkValidation(req, res, next){
    try{
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
        next();
    }
    catch(err){
        return res.responseController.error(422, err.message, { field: err.field });
    }
    
}

module.exports = checkValidation;