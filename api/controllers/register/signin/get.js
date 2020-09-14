const { connection } = require('../../../tools/connectionManager');
const { executeQuery } = require('../../../tools/connectionManager');
const fetch = require('node-fetch');
const token = require('../../../tools/token');


async function get(req, res) {
    try{
        const signin_token = req.query.signin_token;
        const log_id = token.verify(signin_token);

        let query = `select * from verification_log_tbl where log_id = ${ log_id }`;
        const selectFromVerificationLogTBLResult = await executeQuery(connection, query);

        if(!selectFromVerificationLogTBLResult[0].verified){
            throw "invalid singin_token";
        }
        const phonenumber = selectFromVerificationLogTBLResult[0].phonenumber;

        query = `select * from users_tbl where phonenumber = ${ phonenumber }`;
        const selectFromUsersTBLResult = await executeQuery(connection, query);

        if (selectFromUsersTBLResult.length === 0) {
            throw "user doesn't found";
        }

        userId = selectFromUsersTBLResult[0].user_id;
        const responseJson = {
            status: 200,
            success: true,
            message: "signin operation done successfully",
            usertoken: token.create(userId)
        };
        return res.status(200).json(responseJson);
        
    }
    catch (err) {
        console.error(err);
        if((err.message && (err.message.includes('jwt') || err.message.includes('invalid signature'))) || err === "invalid singin_token" || err.message === "invalid token"){
            const error = {
                status: 403,
                success: false,
                message: "invalid singin_token",
            };
            return res.status(403).json(error);
        }
        if(err === "user doesn't found"){
            const error = {
                status: 404,
                success: false,
                message: "user doesn't found",
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