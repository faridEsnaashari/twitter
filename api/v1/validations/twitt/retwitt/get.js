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
        if(IsUndefinedOrNull(req.query.retwitt_status)){
            const error = {
                message: 'retwitt_status null or undefined',
                field: 'retwitt_status',
                error: 'undefined'
            }
            throw error;
        }
        if(!IsString(req.query.retwitt_status)){
            const error = {
                message: 'retwitt_status should be string',
                field: 'retwitt_status',
                error: 'wrong format'
            }
            throw error;
        }
        if(!(req.query.retwitt_status === 'retwitt' || req.query.retwitt_status === 'unretwitt')){
            const error = {
                message: 'retwitt_status value should be *retwitt* or *unretwitt*',
                field: 'retwitt_status',
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
