const { Token, VerificationCode } = require('sms-ir');
const { APIKEY, SECRETKEY } = require('../../../config');

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
                status: 200,
                success: true,
                message: "verification code sent",
            };
            return res.status(200).json(responseJson);
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