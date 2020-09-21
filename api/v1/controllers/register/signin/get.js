const { connection, executeQuery } = require(global.tools.connection);
const token = require(global.tools.token);

async function get(req, res) {
    try{
        const log_id = req.body.decoded_token;

        let query = `select * from verification_log_tbl_view where log_id = '${ log_id }'`;
        const selectFromVerificationLogTBLResult = await executeQuery(connection, query);

        if(!selectFromVerificationLogTBLResult[0].verified){
            throw "invalid singin_token";
        }
        const phonenumber = selectFromVerificationLogTBLResult[0].phonenumber;

        query = `select * from users_tbl_view where phonenumber = '${ phonenumber }'`;
        const selectFromUsersTBLResult = await executeQuery(connection, query);

        if (selectFromUsersTBLResult.length === 0) {
            throw "user doesn't found";
        }

        userId = selectFromUsersTBLResult[0].user_id;
        return res.responseController.send(200, "signin operation done successfully", { usertoken: token.create(userId) });
        
    }
    catch (err) {
        console.error(err);
        if((err.message && (err.message.includes('jwt') || err.message.includes('invalid signature'))) || err === "invalid singin_token" || err.message === "invalid token"){
            return res.responseController.error(403, "invalid singin_token");
        }
        if(err === "user doesn't found"){
            return res.responseController.error(404, "user doesn't found");
        }
        return res.responseController.error(500, "internal server error");
    }
}

module.exports = get;