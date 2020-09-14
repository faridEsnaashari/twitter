class Reponse{
    constructor(res){
        this.response = res;
    }
    send(statusCode, messageText, info){
        const responseJson = {
            status: statusCode,
            success: true
        };
        if(messageText){
            responseJson.message = messageText;
        }
        if(info){
            for(const key in info){
                responseJson[key] = info[key];
            }
        }
        this.response.status(responseJson.status).json(responseJson);
    }
    error(statusCode, messageText, info){
        const err = {
            status: statusCode,
            success: false
        };
        if(messageText){
            err.message = messageText;
        }
        if(info){
            for(const key in info){
                err[key] = info[key];
            }
        }
        this.response.status(err.status).json(err);
    }
}
 
module.exports =() => {
    return function (req, res, next){
        res.responseController = new Reponse(res);
        next();
    };
};