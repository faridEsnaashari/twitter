const User = require(global.models.user_model);
const Twitt = require(global.models.twitt_model);

async function post(req, res) {
    const user_id = req.body.decoded_token;
    const text = req.body.text;
    const replay_to = req.body.replay_to || null;
    const img_link = req.body.img_link || null;

    try{
        const user = await User.findById(user_id).exec();

        if(!user){
            throw "user doesn't found";
        }

        user.twitts_ids.push(user_id);
        await user.save();

        const new_twitt = new Twitt({
            text: text,
            img_link: img_link,
            user_id: user_id,
        });

        if(replay_to){
            const twitt = await Twitt.findOne({$and: [{_id: replay_to}, {deleted: false}]});
            if(!twitt){
                throw "parent twitt not found";
            }

            new_twitt.replay_to_id = replay_to;

            twitt.twitts_ids_replay_to_this_twitt.push(new_twitt._id);
            await twitt.save();
        }

        await new_twitt.save();

        return res.responseController.send(201, "twitt submited");
    }
    catch(err){
        console.error(err);
        if(err.message === "token is not defined"){
            return res.responseController.error(401, "user unauthorized");
        }
        if(err === "user doesn't found"){
            return res.responseController.error(404, "user doesn't found");
        }
        if(err === "parent twitt not found"){
            return res.responseController.error(404, "parent twitt not found");
        }
        return res.responseController.error(500, "internal server error");
    }
}

module.exports = post;
