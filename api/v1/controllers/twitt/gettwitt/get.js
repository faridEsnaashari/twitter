const User = require(global.models.user_model);
const Twitt = require(global.models.twitt_model);

async function get(req, res) {
    try{
        const twitt_id = req.query.twitt_id;
        const twitt = await Twitt.findOne({$and: [{_id: twitt_id}, {deleted: false}]});

        if(!twitt){
            throw "twitt not found";
        }

        const result = {
            twitt_id: twitt._id,
            text: twitt.text,
            img_link: twitt.img_link,
            replay_to: twitt.replay_to_id[0] || null,
            date: new Date(parseInt(twitt.date)),
            owner_id: twitt.user_id[0]
        };

        const populated_twitt = await twitt.populate('twitts_ids_replay_to_this_twitt').execPopulate();

        const result_replays = [];
        populated_twitt.twitts_ids_replay_to_this_twitt.forEach((value) => {
            const replay = {
                twitt_id: value._id,
                text: value.text,
                img_link: value.img_link,
                replay_to: value.replay_to_id[0] || null,
                date: new Date(parseInt(value.date)),
                owner_id: value.user_id[0]
            };

            result_replays.push(replay);
        });

        result.replays = result_replays;

        return res.responseController.send(200, null, { twitt: result });
    }
    catch(err){
        console.error(err);
        if(err === "twitt not found"){
            return res.responseController.error(404, "twitt not found");
        }
        return res.responseController.error(500, "internal server error");
    }
}

module.exports = get;
