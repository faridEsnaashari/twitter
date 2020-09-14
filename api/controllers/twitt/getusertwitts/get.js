const { connection, executeQuery } = require('../../../tools/connectionManager');
const token = require('../../../tools/token');
const fetch = require('node-fetch');

async function get(req, res) {
    try{
        const user_id = req.query.user_id;

        let query = `select * from twitts_tbl where user_id = ${ user_id } and deleted <> true`;
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

        return res.responseController.send(200, null, { twitt: twitts });
    }
    catch(err){
        console.error(err);
        return res.responseController.error(500, "internal server error");
    }
}

module.exports = get;