const { connection, executeQuery } = require(global.tools.connection);
const generateRandomCode = require(global.tools.randomCode);
const { Token, VerificationCode } = require('sms-ir');

const token = new Token();
const verificationCode = new VerificationCode();

async function get(req, res) {
    const phonenumber = req.query.phonenumber;
    const code = generateRandomCode();
    
    try{
        const tokenResult = await token.get(global.env.SMS_PANEL.APIKEY, global.env.SMS_PANEL.SECRETKEY);
        const verificationResult = await verificationCode.send(tokenResult, phonenumber, code);
        if (verificationResult.IsSuccessful) {
            query =  `delete from verification_log_tbl where phonenumber = ${phonenumber}`;
            const deleteFromRegisteryCodeTBLResult = await executeQuery(connection, query);
            query = `insert into verification_log_tbl(phonenumber, code) value('${phonenumber}', '${code}')`;
            const insertToRegiseryCodeTBlResult = await executeQuery(connection, query);
            return res.responseController.send(200, "code sent successfully");
        }
        else {
            throw "sms panel error";
        }
    }
    catch (err) {
        console.error(err);
        if(err === "sms panel error"){
            return res.responseController.error(503, "sms panel error");
        }
        return res.responseController.error(500, "internal server error");
    }
}

module.exports = get;