const { connection, executeQuery } = require(global.tools.connection);

async function get(req, res) {
    try{
        const twitt_id = req.query.twitt_id;

        let query = `select * from twitts_tbl_view where twitt_id = '${ twitt_id }' and deleted <> true`;
        const selectFromTwittsTBLResult = await executeQuery(connection, query);
    
        if(selectFromTwittsTBLResult.length === 0){
            throw "twitt not found";
        }
    
        const result = {
            twitt_id: selectFromTwittsTBLResult[0].twitt_id,
            text: selectFromTwittsTBLResult[0].text,
            img_link: selectFromTwittsTBLResult[0].img_link,
            replay_to: selectFromTwittsTBLResult[0].replay_to_id,
            date: new Date(parseInt(selectFromTwittsTBLResult[0].date)),
            owner_id: selectFromTwittsTBLResult[0].user_id
        };
    
        query = `select * from twitts_tbl_view where replay_to_id = '${ twitt_id }' and deleted <> true`;
        const selectReplaysFromTwittsTBLResult = await executeQuery(connection, query);   
        
        let replays = [];
        selectReplaysFromTwittsTBLResult.forEach((value) => {
            const replay_twitt = {
                twitt_id: value.twitt_id,
                text: value.text,
                img_link: value.img_link,
                replay_to: value.replay_to_id,
                date: new Date(parseInt(value.date)),
                owner_id: value.user_id
            };
            replays.push(replay_twitt);
        });

        result.replays = replays;
    
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