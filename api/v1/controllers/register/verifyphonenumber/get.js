const { connection, executeQuery } = require(global.tools.connection);
const generateRandomCode = require(global.tools.randomCode);
const { Token, VerificationCode } = require('sms-ir');
const VerificationLog = require(global.models.verification_log_model);

const token = new Token();
const verificationCode = new VerificationCode();

async function get(req, res) {
    const phonenumber = req.query.phonenumber;
    const code = generateRandomCode();
    
    try{
        const tokenResult = await token.get(global.env.SMS_PANEL.APIKEY, global.env.SMS_PANEL.SECRETKEY);
        const verificationResult = await verificationCode.send(tokenResult, phonenumber, code);
        if (verificationResult.IsSuccessful) {
            await VerificationLog.findOneAndRemove({phonenumber: phonenumber}).exec();

            const new_log = new VerificationLog({
                phonenumber: phonenumber,
                code: code 
            });
            await new_log.save();

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
