const { connection, executeQuery } = require('../../../tools/connectionManager');
const token = require('../../../tools/token');
const fetch = require('node-fetch');

async function post(req, res) {
    const userToken = req.body.usertoken;
    const text = req.body.text;
    const replayTo = req.body.replay_to || null;
    const imgLink = req.body.img_link || null;
    const date = Date.now();

    try{
        const userId = token.verify(userToken);
        let query = `select * from users_tbl where user_id = ${ userId }`;
        const checkUserIdResult = await executeQuery(connection, query);
        if(checkUserIdResult.length === 0){
            throw "user doesn't found";
        }
        if(req.body.replay_to){
            query = `select * from twitts_tbl where twitt_id = ${ replayTo }`;
            const checkRepalyToResult = await executeQuery(connection, query);
            if(checkRepalyToResult.length === 0){
                throw "parent twitt not found";
            }
        }
        query = `insert into twitts_tbl(text, img_link, user_id, date, replay_to_id) value(
            '${ text }',
            '${ imgLink }',
            ${ userId },
            '${ date }',
            ${ replayTo })`;
        const insertIntoTwittsTblResult = await executeQuery(connection, query);

        const responseJson = {
            status: 201,
            success: true,
            message: "twitt submited"
        };
        return res.status(201).json(responseJson);
    }
    catch(err){
        console.error(err);
        if(err.message === "token is not defined"){
            const error = {
                status: 401,
                success: false,
                message: "user unauthorized"
            };
            return res.status(401).json(error);
        }
        if(err === "user doesn't found"){
            const error = {
                status: 404,
                success: false,
                message: "user doesn't found"
            };
            return res.status(404).json(error);
        }
        if(err === "parent twitt not found"){
            const error = {
                status: 404,
                success: false,
                message: "parent twitt not found"
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

module.exports = post;