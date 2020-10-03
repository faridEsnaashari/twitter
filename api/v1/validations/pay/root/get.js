const { IsUndefinedOrNull } = require(global.tools.validation);

function checkValidation(req, res, next){
    try{
        if(IsUndefinedOrNull(req.query.amount)){
            const error = {
                message: 'amount null or undefined',
                field: 'amount',
                error: 'undefined'
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
