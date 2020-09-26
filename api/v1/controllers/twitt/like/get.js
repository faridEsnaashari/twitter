const User = require(global.models.user_model);
const Twitt = require(global.models.twitt_model);

async function get(req, res) {
    try{
        const like_status = req.query.like_status;
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

        if(like_status === 'unlike'){
            if(!user.likes_ids.includes(twitt_id)){
                throw "like not found";
            }

            user.likes_ids.splice(user.likes_ids.indexOf(twitt_id), 1);
            twitt.users_like_this_twitt.splice(twitt.users_like_this_twitt.indexOf(user_id), 1);

            await twitt.save()
            await user.save()

            return res.responseController.send(200, "unlike operation done successfully");
        }

        if(user.likes_ids.includes(twitt_id)){
            throw "like already exist";
        }

        user.likes_ids.push(twitt_id);
        twitt.users_like_this_twitt.push(user_id);

        await user.save()
        await twitt.save()

        return res.responseController.send(200, "like operation done successfully");
    }
    catch(err){
        console.error(err);
        if(err === "twitt not found"){
            return res.responseController.error(404, "twitt not found");
        }
        if(err === "user not found"){
            return res.responseController.error(404, "user not found");
        }
        if(err === "like not found"){
            return res.responseController.error(404, "user doesn't like this twitt before");
        }
        if(err === "like already exist"){
            return res.responseController.error(422, "this twitt already liked by this user");
        }
        if(err.path === "_id"){
            return res.responseController.error(404, "invalid id type");
        }
        return res.responseController.error(500, "internal server error");
    }
}

module.exports = get;
