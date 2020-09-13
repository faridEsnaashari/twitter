const { connection } = require('../../../tools/connectionManager');
const { executeQuery } = require('../../../tools/connectionManager');
const fetch = require('node-fetch');
const generateRandomCode = require('../../../tools/randomCode');

async function get(req, res) {
    const phonenumber = req.query.phonenumber;
    const code = generateRandomCode();

    try{
        let query = `select * from users_tbl where phonenumber = ${phonenumber}`;
        const selectFromUsersTBLResult = await executeQuery(connection, query);
        if (selectFromUsersTBLResult.length === 0) {
            const error = {
                status: 404,
                success: false,
                message: "user doesn't found",
            };
            return res.status(404).json(error);
        }
        const fetchResult = await fetch(`http://localhost:3000/sendvrificationcode?phonenumber=${phonenumber}&code=${code}`);
        if (fetchResult.status === 200) {
            query =  `delete from registerycode_tbl where phonenumber = ${phonenumber}`;
            const deleteFromRegisteryCodeTBLResult = await executeQuery(connection, query);
            query = `insert into registerycode_tbl value('${phonenumber}', '${code}')`;
            const insertToRegiseryCodeTBlResult = await executeQuery(connection, query);
            const error = {
                status: 200,
                success: true,
                message: "code sent successfully",
            };
            return res.status(200).json(error);
        }
        else {
            const error = {
                status: 503,
                success: false,
                message: "sms panel error",
            };
            return res.status(503).json(error);
        }
    }
    catch (err) {
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