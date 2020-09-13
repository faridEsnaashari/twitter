const { connection } = require('../../../tools/connectionManager');
const { executeQuery } = require('../../../tools/connectionManager');
const token = require('../../../tools/token');

async function get(req, res) {
    const phonenumber = req.query.phonenumber;
    const code = req.query.code;

    try{
        let query = `select * from registerycode_tbl where phonenumber = ${phonenumber}`;
        const selectFromRegisterTBLResult = await executeQuery(connection, query);
        if (selectFromRegisterTBLResult.length === 0) {
            const error = {
                status: 404,
                success: false,
                message: "phone number not found",
            };
            return res.status(404).json(error);
        }
        if (selectFromRegisterTBLResult[0].code === code) {
            query = `update users_tbl set verified = true where phonenumber = '${phonenumber}'`;
            const updateUsersTBLResult = await executeQuery(connection, query);
            query = `delete from registerycode_tbl where phonenumber = ${phonenumber}`;
            const deleteFromRegisteryCodeTBLResult = await executeQuery(connection, query);
            query = `select * from users_tbl where phonenumber = ${phonenumber}`;
            const selectFromUsersTBLResult = await executeQuery(connection, query);
            const userId = selectFromUsersTBLResult[0].user_id;
            const responseJson = {
                status: 200,
                success: true,
                message: "code verification done successfully",
                token: token.create(userId),
            };
            return res.status(200).json(responseJson);
        }
        else{
            const error = {
                status: 404,
                success: false,
                message: "code is invalid",
            };
            return res.status(404).json(error);
        }
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