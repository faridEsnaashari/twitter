const tokenTool = require(global.tools.token);

function getAuthorization(req, res, next){
    if(!req.headers.authorization){
        next(new Error("authorization not set"));
        return res.responseController.error(400, "authorization not set");
    }
    if(!req.headers.authorization.includes('Bearer ')){
        next(new Error("authorization not set"));
        return res.responseController.error(400, "authorization not set");
    }
    try{
        const incomingToken = req.headers.authorization.replace('Bearer ', '');
        const decoded_token = tokenTool.verify(incomingToken);
        req.body.decoded_token = decoded_token;
        next();
    }
    catch(err){
        next(new Error("token structure is invalid"));
        return res.responseController.error(400, "token structure is invalid");
    }
}

module.exports = getAuthorization;