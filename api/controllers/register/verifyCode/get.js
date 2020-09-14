const { connection } = require('../../../tools/connectionManager');
const { executeQuery } = require('../../../tools/connectionManager');
const token = require('../../../tools/token');

async function get(req, res) {
    const phonenumber = req.query.phonenumber;
    const code = req.query.code;

    try {
        query = `select * from verification_log_tbl where phonenumber = '${phonenumber}'`;
        const selectFromRegisterTBLResult = await executeQuery(connection, query);

        if (selectFromRegisterTBLResult.length === 0) {
            throw "phone number not found";
        }

        if (selectFromRegisterTBLResult[0].code === code) {
            query = `update verification_log_tbl set verified = true where phonenumber = ${ phonenumber }`;
            const updateVerificationLogTBLResult = await executeQuery(connection, query);

            query = `select * from verification_log_tbl where phonenumber = ${ phonenumber }`;
            const selectFromVerificationLogTBLResult = await executeQuery(connection, query);

            const responseJson = {
                status: 200,
                success: true,
                message: "code verification done successfully",
                signin_token: token.create(selectFromVerificationLogTBLResult[0].log_id),
            };
            return res.status(200).json(responseJson);
        }
        else {
            throw "code is invalid";
        }
    }
    catch (err) {
        console.error(err);
        if(err === "code is invalid"){
            const error = {
                status: 404,
                success: false,
                message: "code is invalid",
            };
            return res.status(404).json(error);
        }
        if(err === "phone number not found"){
            const error = {
                status: 404,
                success: false,
                message: "phone number not found",
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