const { IsString, IsUndefinedOrNull, IsIranMobile } = require(global.tools.validation);

function checkValidation(req, res, next){
    try{
        if(IsUndefinedOrNull(req.query.phonenumber)){
            const error = {
                message: 'phonenumber null or undefined',
                field: 'phonenumber',
                error: 'undefined'
            }
            throw error;
        }
        if(!IsString(req.query.phonenumber)){
            const error = {
                message: 'phonenumber should be string',
                field: 'phonenumber',
                error: 'wrong format'
            }
            throw error;
        }
        if(!IsIranMobile(req.query.phonenumber)){
            const error = {
                message: 'the format of phonenumber is not a iran phonenumber',
                field: 'phonenumber',
                error: 'not iran phonenumber'
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