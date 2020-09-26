const VerificationLog = require(global.models.verification_log_model);
const User = require(global.models.user_model);
const Twitt = require(global.models.twitt_model);

async function get(req, res) {
    try{
        const user_id = req.body.decoded_token;
        const twitt_id = req.query.twitt_id;

        const user = await User.findById(user_id).exec();

        if(!user){
            throw "user doesn't found";
        }

        const twitt = await Twitt.findOne({$and: [{_id: twitt_id}, {deleted: false}]});
        if(!twitt){
            throw "twitt not found";
        }

        if(twitt.user_id[0] + '' !== user_id){
            throw "user not permited";
        }

        await Twitt.findOneAndUpdate({_id: twitt_id}, {$set: {deleted: true}}).exec();

        return res.responseController.send(200, "twitt deleted successfuly");
    }
    catch(err){
        console.error(err);
        if(err === "twitt not found"){
            return res.responseController.error(404, "twitt not found");
        }
        if(err === "user doesn't found"){
            return res.responseController.error(404, "user doesn't found");
        }
        if(err === "user not permited"){
            return res.responseController.error(403, "this twitt is not belong to current user");
        }
        return res.responseController.error(500, "internal server error");
    }
}

module.exports = get;
