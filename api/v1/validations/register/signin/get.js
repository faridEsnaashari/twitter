const { IsString, IsUndefinedOrNull } = require(global.tools.validation);

function checkValidation(req, res, next){
    try{
        next();
    }
    catch(err){
        return res.responseController.error(422, err.message, { field: err.field });
    }
}

module.exports = checkValidation;