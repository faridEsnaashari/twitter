const { connection } = require('../../tools/connectionManager');
const { executeQuery } = require('../../tools/connectionManager');
const fetch = require('node-fetch');
const generateRandomCode = require('../../tools/randomCode');

async function post(req, res) {
    const username = req.body.username;
    const userfamily = req.body.userfamily;
    const phonenumber = req.body.phonenumber;
    const national_id_number = req.body.national_id_number;

    const code = generateRandomCode();

    try {
        let query = `insert into users_tbl(username, userfamily, phonenumber, national_id_number) value('${username}', '${userfamily}', '${phonenumber}', '${national_id_number}')`;
        const insertResult = await executeQuery(connection, query);
        const fetchResult = await fetch(`http://localhost:3000/sendvrificationcode?phonenumber=${phonenumber}&code=${code}`);
        if (fetchResult.status === 200) {
            query = `delete from registerycode_tbl where phonenumber = ${phonenumber}`;
            const deleteResult = await executeQuery(connection, query);
            query = `insert into registerycode_tbl value('${phonenumber}', '${code}')`;
            const insertToRegestryCodeTBLResult = await executeQuery(connection, query);
            const responseJson = {
                message: "user created"
            };

            return res.status(201).json(responseJson);
        }
    }
    catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            responseJson = {
                message: "user already existed"
            };

            return res.status(409).json(responseJson);
        }
    }
}

module.exports = post;