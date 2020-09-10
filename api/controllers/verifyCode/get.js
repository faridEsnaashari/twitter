const { connection } = require('../../tools/connectionManager');
const { executeQuery } = require('../../tools/connectionManager');
const token = require('../../tools/token');

async function get(req, res) {
    const phonenumber = req.query.phonenumber;
    const code = req.query.code;

    try{
        let query = `select * from registerycode_tbl where phonenumber = ${phonenumber}`;
        const selectFromRegisterTBLResult = await executeQuery(connection, query);
        if (selectFromRegisterTBLResult.length === 0) {
            responseJson = {
                message: "phone number not found"
            };
    
            return res.status(404).json(responseJson);
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
                token: token.create(userId)
            };
            return res.status(200).json(responseJson);
        }
        else{
            responseJson = {
                message: "code invalid"
            };
    
            return res.status(404).json(responseJson);
        }
    }
    catch(err){
        console.error(err);
    }
}

module.exports = get;