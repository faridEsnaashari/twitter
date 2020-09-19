const { connection, executeQuery } = require(global.tools.connection);

async function post(req, res) {
    const userId = req.body.decoded_token;
    const text = req.body.text;
    const replayTo = req.body.replay_to || null;
    const imgLink = req.body.img_link || null;
    const date = Date.now();

    try{
        let query = `select * from users_tbl_view where user_id = '${ userId }'`;
        const checkUserIdResult = await executeQuery(connection, query);
        if(checkUserIdResult.length === 0){
            throw "user doesn't found";
        }
        if(req.body.replay_to){
            query = `select * from twitts_tbl_view where twitt_id = '${ replayTo }'`;
            const checkRepalyToResult = await executeQuery(connection, query);
            if(checkRepalyToResult.length === 0){
                throw "parent twitt not found";
            }
        }
        query = `insert into twitts_tbl(text, img_link, user_id, date, replay_to_id) value(
            '${ text }',
            '${ imgLink }',
            UUID_TO_BIN('${ userId }'),
            '${ date }',
            UUID_TO_BIN('${ replayTo }'))`;
        const insertIntoTwittsTblResult = await executeQuery(connection, query);

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