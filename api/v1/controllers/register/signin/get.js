const { connection, executeQuery } = require(global.tools.connection);
const token = require(global.tools.token);
const VerificationLog = require(global.models.verification_log_model);
const User = require(global.models.user_model);

async function get(req, res) {
    try{
        const log_id = req.body.decoded_token;

        const log = await VerificationLog.findById(log_id).exec();

        if(!log || !log.verified){
            throw "invalid singin_token";
        }

        const user = await User.findOne({phonenumber: log.phonenumber}).exec();

        if(!user){
            throw "user doesn't found";
        }

        return res.responseController.send(200, "signin operation done successfully", { usertoken: token.create(user._id + '') });
    }
    catch (err) {
        console.error(err);
        if((err.message && (err.message.includes('jwt') || err.message.includes('invalid signature'))) || err === "invalid singin_token" || err.message === "invalid token"){
            return res.responseController.error(403, "invalid singin_token");
        }
        if(err === "user doesn't found"){
            return res.responseController.error(404, "user doesn't found");
        }
        return res.responseController.error(500, "internal server error");
    }
}

module.exports = get;
