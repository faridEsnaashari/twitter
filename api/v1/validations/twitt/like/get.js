const { IsString, IsUndefinedOrNull } = require(global.tools.validation);

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
        if(IsUndefinedOrNull(req.query.like_status)){
            const error = {
                message: 'like_status null or undefined',
                field: 'like_status',
                error: 'undefined'
            }
            throw error;
        }
        if(!IsString(req.query.like_status)){
            const error = {
                message: 'like_status should be string',
                field: 'like_status',
                error: 'wrong format'
            }
            throw error;
        }
        if(!(req.query.like_status === 'like' || req.query.like_status === 'unlike')){
            const error = {
                message: 'like_status value should be *like* or *unlike*',
                field: 'like_status',
                error: 'wrong value'
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
