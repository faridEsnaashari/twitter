const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const env = {
    SMS_PANEL: {
        APIKEY: process.env.APIKEY,
        SECRETKEY: process.env.SECRETKEY
    },
    MYSQL: {
        PORT: process.env.MYSQL_PORT,
        USER: process.env.MYSQL_USER,
        PASSWORD: process.env.MYSQL_PASSWORD,
        DATABASE: process.env.MYSQL_DATABASE,
        HOST: process.env.MYSQL_HOST
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
        connection: path.resolve('./api/tools/sqlConnectionManager.js'),
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
            sendtwittRoute: path.resolve('./api/v1/controllers/twitt/sendtwitt')
        },
        validations:{
            registerRoute: path.resolve('./api/v1/validations/register/register'),
            signinRoute: path.resolve('./api/v1/validations/register/signin'),
            verifycodeRoute: path.resolve('./api/v1/validations/register/verifycode'),
            verifyphonenumberRoute: path.resolve('./api/v1/validations/register/verifyphonenumber'),
            deletetwittRoute: path.resolve('./api/v1/validations/twitt/deletetwitt'),
            gettwittRoute: path.resolve('./api/v1/validations/twitt/gettwitt'),
            getusertwittsRoute: path.resolve('./api/v1/validations/twitt/getusertwitts'),
            sendtwittRoute: path.resolve('./api/v1/validations/twitt/sendtwitt')
        }
    }
};

module.exports.path = Path;
module.exports.env = env;
