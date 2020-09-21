const { connection, executeQuery } = require(global.tools.connection);
const token = require(global.tools.token);

async function get(req, res) {
    const phonenumber = req.query.phonenumber;
    const code = req.query.code;

    try {
        query = `select * from verification_log_tbl_view where phonenumber = '${phonenumber}'`;
        const selectFromVerificationLogTBLResult = await executeQuery(connection, query);

        if (selectFromVerificationLogTBLResult.length === 0) {
            throw "phone number not found";
        }

        if (selectFromVerificationLogTBLResult[0].code === code) {
            query = `update verification_log_tbl set verified = true where phonenumber = ${ phonenumber }`;
            const updateVerificationLogTBLResult = await executeQuery(connection, query);

            // query = `select * from verification_log_tbl where phonenumber = ${ phonenumber }`;
            // selectFromVerificationLogTBLResult = await executeQuery(connection, query);

            responseJson = {
                signin_token: token.create(selectFromVerificationLogTBLResult[0].log_id),
            };
            return res.responseController.send(200, "code verification done successfully", responseJson);
        }
        else {
            throw "code is invalid";
        }
    }
    catch (err) {
        console.error(err);
        if(err === "code is invalid"){
            return res.responseController.error(404, "code is invalid");
        }
        if(err === "phone number not found"){
            return res.responseController.error(404, "phone number not found");
        }
        return res.responseController.error(500, "internal server error");
    }
}

module.exports = get;