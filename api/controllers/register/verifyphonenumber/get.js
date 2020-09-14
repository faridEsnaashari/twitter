const { connection } = require('../../../tools/connectionManager');
const { executeQuery } = require('../../../tools/connectionManager');
const fetch = require('node-fetch');
const generateRandomCode = require('../../../tools/randomCode');
const { Token, VerificationCode } = require('sms-ir');
const { APIKEY, SECRETKEY } = require('../../../config');

const token = new Token();
const verificationCode = new VerificationCode();

async function get(req, res) {
    const phonenumber = req.query.phonenumber;
    const code = generateRandomCode();

    try{
        const tokenResult = await token.get(APIKEY, SECRETKEY);
        const verificationResult = await verificationCode.send(tokenResult, phonenumber, code);
        if (verificationResult.IsSuccessful) {
            query =  `delete from verification_log_tbl where phonenumber = ${phonenumber}`;
            const deleteFromRegisteryCodeTBLResult = await executeQuery(connection, query);
            query = `insert into verification_log_tbl(phonenumber, code) value('${phonenumber}', '${code}')`;
            const insertToRegiseryCodeTBlResult = await executeQuery(connection, query);
            const responseJson = {
                status: 200,
                success: true,
                message: "code sent successfully",
            };
            return res.status(200).json(responseJson);
        }
        else {
            throw "sms panel error";
        }
    }
    catch (err) {
        console.error(err);
        if(err === "sms panel error"){
            const error = {
                status: 503,
                success: false,
                message: "sms panel error",
            };
            return res.status(503).json(error);
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