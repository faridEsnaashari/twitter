const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const env = {
    SMS_PANEL: {
        APIKEY: process.env.APIKEY,
        SECRETKEY: process.env.SECRETKEY
    },
    JWT: {
        KEY: process.env.JWT_KEY
    },
    GENERAL: {
        ROOT_ENDPOINT: process.env.ROOT_ENDPOINT,
        NODE_ENV: process.env.NODE_ENV,
        SERVER_PORT: process.env.PORT
    },
    MONGOOSE:{
        MONGOOSE_URL: process.env.MONGOOSE_URL
    }
};

const Path = {
    middleware:{
        responser: path.resolve('./api/middleware/responser.js'),
        processAuthorization: path.resolve('./api/middleware/processAuthorization.js')
    },
    tools:{
        mongooseConnection: path.resolve('./api/tools/mongooseConnectionManager'),
        token: path.resolve('./api/tools/token.js'),
        randomCode: path.resolve('./api/tools/randomCode.js'),
        validation: path.resolve('./api/tools/validation.js'),
    },
    v1:{
        controllers:{
            registerRoute: path.resolve('./api/v1/controllers/register/register'),
            signinRoute: path.resolve('./api/v1/controllers/register/signin'),
            verifycodeRoute: path.resolve('./api/v1/controllers/register/verifycode'),
            verifyphonenumberRoute: path.resolve('./api/v1/controllers/register/verifyphonenumber'),
            deletetwittRoute: path.resolve('./api/v1/controllers/twitt/deletetwitt'),
            gettwittRoute: path.resolve('./api/v1/controllers/twitt/gettwitt'),
            getusertwittsRoute: path.resolve('./api/v1/controllers/twitt/getusertwitts'),
            sendtwittRoute: path.resolve('./api/v1/controllers/twitt/sendtwitt'),
            retwittRoute: path.resolve('./api/v1/controllers/twitt/retwitt')
        },
        validations:{
            registerRoute: path.resolve('./api/v1/validations/register/register'),
            signinRoute: path.resolve('./api/v1/validations/register/signin'),
            verifycodeRoute: path.resolve('./api/v1/validations/register/verifycode'),
            verifyphonenumberRoute: path.resolve('./api/v1/validations/register/verifyphonenumber'),
            deletetwittRoute: path.resolve('./api/v1/validations/twitt/deletetwitt'),
            gettwittRoute: path.resolve('./api/v1/validations/twitt/gettwitt'),
            getusertwittsRoute: path.resolve('./api/v1/validations/twitt/getusertwitts'),
            sendtwittRoute: path.resolve('./api/v1/validations/twitt/sendtwitt'),
            retwittRoute: path.resolve('./api/v1/validations/twitt/retwitt')
        },
        models: {
            twitt_model: path.resolve('./api/v1/model/twitt_model'),
            like_model: path.resolve('./api/v1/model/like_model'),
            retwitter_model: path.resolve('./api/v1/model/retwitter_model'),
            user_model: path.resolve('./api/v1/model/user_model'),
            verification_log_model: path.resolve('./api/v1/model/verification_log_model'),
        }
    }
};

module.exports.path = Path;
module.exports.env = env;
