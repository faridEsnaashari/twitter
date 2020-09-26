const token = require(global.tools.token);
const VerificationLog = require(global.models.verification_log_model);

async function get(req, res) {
    const phonenumber = req.query.phonenumber;
    const code = req.query.code;

    try {
        const log = await VerificationLog.findOne({phonenumber: phonenumber}).exec();
        if(!log){
            throw "phone number not found";
        }

        if(!(log.code === code)){
            throw "code is invalid";
        }

        await VerificationLog.findOneAndUpdate({phonenumber: phonenumber}, {$set: {verified: true}}).exec();

        responseJson = {
            signin_token: token.create(log._id + ''),
        };
        return res.responseController.send(200, "code verification done successfully", responseJson);
    }
    catch (err) {
        console.error(err);
        if(err === "code is invalid"){
            return res.responseController.error(404, "code is invalid");
        }
        if(err === "phone number not found"){
            return res.responseController.error(404, "phone number not found");
        }
        return res.responseController.error(500, "internal server error");
    }
}

module.exports = get;
