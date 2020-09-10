const { Token, VerificationCode } = require('sms-ir');
const { APIKEY } = require('../../config');
const { SECRETKEY } = require('../../config');

const token = new Token();
const verificationCode = new VerificationCode();

async function get(req, res) {
    const phonenumber = req.query.phonenumber;
    const code = req.query.code;

    try {
        const tokenResult = await token.get(APIKEY, SECRETKEY);
        const verificationResult = await verificationCode.send(tokenResult, phonenumber, code);
        if (verificationResult.IsSuccessful) {
            const responseJson = {
                message: "verification code sent"
            };
            return res.status(200).json(responseJson);
        }
        else {
            throw (new Error('sms panel error'));
        }
    }
    catch (err) {
        console.error(err);
    }

}

module.exports = get;