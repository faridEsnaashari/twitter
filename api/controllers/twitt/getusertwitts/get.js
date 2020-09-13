const { connection, executeQuery } = require('../../../tools/connectionManager');
const token = require('../../../tools/token');
const fetch = require('node-fetch');

async function get(req, res) {
    try{
        //get data
        //twitts from database
        const user_id = req.query.user_id;

        let query = `select * from twitts_tbl where user_id = ${ user_id }`;
        const selectFromTwittsTBLResult = await executeQuery(connection, query);

        const twitts = [];
        selectFromTwittsTBLResult.forEach((value) => {
            const twitt = {
                twitt_id: value.twitt_id,
                text: value.text,
                img_link: value.img_link,
                replay_to: value.replay_to_id,
                date: new Date(parseInt(value.date)),
                owner_id: value.user_id
            };
            twitts.push(twitt);
        });

        const responseJson = {
            status: 200,
            success: true,
            twitt: twitts
        };
        return res.status(200).json(responseJson);
    }
    catch(err){
        console.error(err);
        const error = {
            status: 500,
            success: false,
            message: "internal server error",
        };
        return res.status(500).json(error);
    }
}

module.exports = get;