const { connection, executeQuery } = require('../../../tools/connectionManager');
const token = require('../../../tools/token');
const fetch = require('node-fetch');

async function get(req, res) {
    try{
        const twitt_id = req.query.twitt_id;

        let query = `select * from twitts_tbl where twitt_id = ${ twitt_id } and deleted <> true`;
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
    
        query = `select * from twitts_tbl where replay_to_id = ${ twitt_id } and deleted <> true`;
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
        const responseJson = {
            status: 200,
            success: true,
            twitt: result
        };
        return res.status(200).json(responseJson);
    }
    catch(err){
        console.error(err);
        if(err === "twitt not found"){
            const error = {
                status: 404,
                success: false,
                message: "twitt not found"
            };
            return res.status(404).json(error);
        }

        const error = {
            status: 500,
            success: false,
            message: "internal server error",
        };
        return res.status(500).json(error);
    }
}

module.exports = get;