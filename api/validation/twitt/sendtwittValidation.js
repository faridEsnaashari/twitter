const {IsString, IsUndefinedOrNull, IsLessThanTwittLengthLimit} = require('../../tools/validation');

function checkValidation(req, res, next){
    try{
        if(IsUndefinedOrNull(req.body.usertoken)){
            const error = {
                message: 'usertoken null or undefined',
                field: 'usertoken',
                error: 'undefined'
            }
            throw error;
        }
        if(IsUndefinedOrNull(req.body.text)){
            const error = {
                message: 'text null or undefined',
                field: 'text',
                error: 'undefined'
            }
            throw error;
        }
        if(!IsLessThanTwittLengthLimit(req.body.text)){
            const error = {
                message: 'text is bigger than twitt length limitation',
                field: 'text',
                error: 'reach twitt length limitation'
            }
            throw error;
        }
        if(!IsString(req.body.usertoken)){
            const error = {
                message: 'usertoken should be string',
                field: 'usertoken',
                error: 'wrong format'
            }
            throw error;
        }
        if(!IsString(req.body.text)){
            const error = {
                message: 'text should be string',
                field: 'text',
                error: 'wrong format'
            }
            throw error;
        }
        if(req.body.replay_to){
            if(!IsString(req.body.replay_to)){
                const error = {
                    message: 'replay_to should be string',
                    field: 'replay_to',
                    error: 'wrong format'
                }
                throw error;
            }
        }
        if(req.body.img_link){
            if(!IsString(req.body.img_link)){
                const error = {
                    message: 'img_link should be string',
                    field: 'img_link',
                    error: 'wrong format'
                }
                throw error;
            }
        }
        next();
    }
    catch(err){
        return res.responseController.error(422, err.message, { field: err.field });
    }
    
}

module.exports = checkValidation;