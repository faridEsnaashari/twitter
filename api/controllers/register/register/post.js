const { connection, executeQuery } = require(global.tools.connection);
const token = require(global.tools.token);

async function post(req, res) {
    try {
        const username = req.body.username;
        const userfamily = req.body.userfamily;
        const national_id_number = req.body.national_id_number;

        const signin_token = req.body.signin_token;
        const log_id = token.verify(signin_token);

        let query = `select * from verification_log_tbl where log_id = ${ log_id }`;
        const selectFromVerificationLogTBLResult = await executeQuery(connection, query);
        if(!selectFromVerificationLogTBLResult[0].verified){
            throw "invalid singin_token";
        }
        const phonenumber = selectFromVerificationLogTBLResult[0].phonenumber;

        query = `select * from users_tbl where national_id_number = '${national_id_number}'`;
        const selectNationalIdFromUsersTBLResult = await executeQuery(connection, query);

        if (selectNationalIdFromUsersTBLResult.length !== 0) {
            throw "a user already exist with this national_id_number";
        }

        query = `select * from users_tbl where phonenumber = '${phonenumber}'`;
        const selectPhonenumberFromUsersTBLResult = await executeQuery(connection, query);

        if (selectPhonenumberFromUsersTBLResult.length !== 0) {
            throw "a user already exist with this phonenumber";
        }

        query = `insert into users_tbl(username, userfamily, phonenumber, national_id_number) value('${username}', '${userfamily}', '${phonenumber}', '${national_id_number}')`;
        const insertResult = await executeQuery(connection, query);

        return res.responseController.send(201, "user created");
    }
    catch (err) {
        console.error(err);
        if((err.message && (err.message.includes('jwt') || err.message.includes('invalid signature'))) || err === "invalid singin_token" || err.message === "invalid token"){
            return res.responseController.error(403, "invalid singin_token");
        }
        if(err === "a user already exist with this national_id_number"){
            return res.responseController.errpr(409, "a user already existed with this national_id_number");
        }
        if(err === "a user already exist with this phonenumber"){
            return res.responseController.error(409, "a user already existed with this phonenumber");
        }
        return res.responseController.error(500, "internal server error");
    }
}

module.exports = post;