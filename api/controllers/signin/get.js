const { connection } = require('../../tools/connectionManager');
const { executeQuery } = require('../../tools/connectionManager');
const fetch = require('node-fetch');
const generateRandomCode = require('../../tools/randomCode');

async function get(req, res) {
    const phonenumber = req.query.phonenumber;
    const code = generateRandomCode();

    try{
        let query = `select * from users_tbl where phonenumber = ${phonenumber}`;
        const selectFromUsersTBLResult = await executeQuery(connection, query);
        if (selectFromUsersTBLResult.length === 0) {
            const responseJson = {
                message: "user doesn't found"
            };
            return res.status(404).json(responseJson);
        }
        const fetchResult = await fetch(`http://localhost:3000/sendvrificationcode?phonenumber=${phonenumber}&code=${code}`);
        if (fetchResult.status === 200) {
            query =  `delete from registerycode_tbl where phonenumber = ${phonenumber}`;
            const deleteFromRegisteryCodeTBLResult = await executeQuery(connection, query);
            query = `insert into registerycode_tbl value('${phonenumber}', '${code}')`;
            const insertToRegiseryCodeTBlResult = await executeQuery(connection, query);
            const responseJson = {
                message: "code sent successfully"
            };
            return res.status(200).json(responseJson);
        }
    }
    catch (err) {
        console.error(err);
    }
}

module.exports = get;