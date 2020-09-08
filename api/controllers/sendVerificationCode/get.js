const {Token,VerificationCode} = require('sms-ir')
const token = new Token();
const verificationCode = new VerificationCode();
const {APIKEY} = require('../../config');
const {SECRETKEY} = require('../../config');

async function get(){
    //get number
    //get rand
    //insert in database
    const tokenResult = await token.get(APIKEY, SECRETKEY);
    const verificationResult = await verificationCode.send(tokenResult, '09140466901', '11111');
}

module.exports = get;