const {Token,VerificationCode} = require('sms-ir');
const {APIKEY} = require('../../config');
const {SECRETKEY} = require('../../config');
const generateRandomCode = require('../../tools/randomCode');
const connection = require('../../tools/connection');

const token = new Token();
const verificationCode = new VerificationCode();

async function get(req, res){
    const phonenumber = req.query.phonenumber;
    const code = generateRandomCode();
    const userExistsQuery = `select * from users_tbl where phonenumber = ${ phonenumber }`;
    connection.query(userExistsQuery, (err, result, fields) => {
        if(err){
            console.error(err);
            return;
        }
        
        if(result.length === 0){
            const insertIntoRegestryQuery = `insert into registerycode_tbl value('${ phonenumber }', '${ code }')`
            connection.query(insertIntoRegestryQuery, async(err, result, fields) => {
                if(err){
                    console.error(err);
                    return;
                }
                try{
                    const tokenResult = await token.get(APIKEY, SECRETKEY);
                    const verificationResult = await verificationCode.send(tokenResult, phonenumber, code);
                    if(verificationResult.IsSuccessful){
                        const responseJson = {
                            message : "verification code sent"
                        };
                        return res.status(200).json(responseJson);
                    }
                    else{
                        throw(new Error('sms panel error'));
                    }
                }
                catch(err){
                    console.error(err);
                }
            });
        }
        else{
            const responseJson = {
                message : "user existed already"
            };
            return res.status(409).json(responseJson);
        }
    });
    
}

module.exports = get;