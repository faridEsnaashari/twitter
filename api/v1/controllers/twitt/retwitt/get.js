const User = require(global.models.user_model);
const Twitt = require(global.models.twitt_model);

async function get(req, res) {
    try{
        const retwitt_status = req.query.retwitt_status;
        const twitt_id = req.query.twitt_id;
        const user_id = req.body.decoded_token;

        const twitt = await Twitt.findOne({$and: [{_id: twitt_id}, {deleted: false}]});

        if(!twitt){
            throw "twitt not found";
        }

        const user = await User.findById(user_id);

        if(!user){
            throw "user not found";
        }

        if(retwitt_status === 'unretwitt'){
            if(!user.retwitts_ids.includes(twitt_id)){
                throw "retwitt not found";
            }

            user.retwitts_ids.splice(user.retwitts_ids.indexOf(twitt_id), 1);
            twitt.users_retwitt_this_twitt.splice(twitt.users_retwitt_this_twitt.indexOf(user_id), 1);

            await twitt.save()
            await user.save()

            return res.responseController.send(200, "unretwitt operation done successfully");
        }

        if(user.retwitts_ids.includes(twitt_id)){
            throw "retwitt already exist";
        }

        user.retwitts_ids.push(twitt_id);
        twitt.users_retwitt_this_twitt.push(user_id);

        await user.save()
        await twitt.save()

        return res.responseController.send(200, "retwitt operation done successfully");
    }
    catch(err){
        console.error(err);
        if(err === "twitt not found"){
            return res.responseController.error(404, "twitt not found");
        }
        if(err === "user not found"){
            return res.responseController.error(404, "user not found");
        }
        if(err === "retwitt not found"){
            return res.responseController.error(404, "user doesn't retwitt this twitt before");
        }
        if(err === "retwitt already exist"){
            return res.responseController.error(422, "this twitt already retwitts by this user");
        }
        if(err.path === "_id"){
            return res.responseController.error(422, "invalid id type");
        }
        return res.responseController.error(500, "internal server error");
    }
}

module.exports = get;
