const VerificationLog = require(global.models.verification_log_model);
const User = require(global.models.user_model);

async function post(req, res) {
    try {
        const username = req.body.username;
        const userfamily = req.body.userfamily;
        const national_id_number = req.body.national_id_number;

        const log_id = req.body.decoded_token;

        const log = await VerificationLog.findById(log_id).exec();
        
        if(!log || !log.verified){
            throw "invalid singin_token";
        }

        let user = await User.findOne({phonenumber: log.phonenumber}).exec();
        if(user){
            throw "a user already exist with this phonenumber";
        }
        
        user = await User.findOne({national_id_number: national_id_number}).exec(); 
        if(user){
            throw "a user already exist with this national_id_number";
        }

        const new_user = new User({
            national_id_number: national_id_number,
            phonenumber: log.phonenumber,
            username: username,
            userfamily: userfamily
        });

        const inserted_user = await new_user.save();

        return res.responseController.send(201, "user created");
    }
    catch (err) {
        console.error(err);
        if(err === "invalid singin_token" || err.path === "_id"){
            return res.responseController.error(403, "invalid singin_token");
        }
        if(err === "a user already exist with this national_id_number"){
            return res.responseController.error(409, "a user already existed with this national_id_number");
        }
        if(err === "a user already exist with this phonenumber"){
            return res.responseController.error(409, "a user already existed with this phonenumber");
        }
        return res.responseController.error(500, "internal server error");
    }
}

module.exports = post;
