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
    }
};

const Path = {
    tools:{
        connection: path.resolve('./api/tools/connectionManager.js'),
        token: path.resolve('./api/tools/token.js'),
        randomCode: path.resolve('./api/tools/randomCode.js'),
        responser: path.resolve('./api/tools/responser.js'),
        validation: path.resolve('./api/tools/validation.js'),
    },
    controllers:{
        registerRoute: path.resolve('./api/controllers/register/register'),
        signinRoute: path.resolve('./api/controllers/register/signin'),
        verifycodeRoute: path.resolve('./api/controllers/register/verifycode'),
        verifyphonenumberRoute: path.resolve('./api/controllers/register/verifyphonenumber'),
        deletetwittRoute: path.resolve('./api/controllers/twitt/deletetwitt'),
        gettwittRoute: path.resolve('./api/controllers/twitt/gettwitt'),
        getusertwittsRoute: path.resolve('./api/controllers/twitt/getusertwitts'),
        sendtwittRoute: path.resolve('./api/controllers/twitt/sendtwitt')
    },
    validations:{
        registerRoute: path.resolve('./api/validations/register/register'),
        signinRoute: path.resolve('./api/validations/register/signin'),
        verifycodeRoute: path.resolve('./api/validations/register/verifycode'),
        verifyphonenumberRoute: path.resolve('./api/validations/register/verifyphonenumber'),
        deletetwittRoute: path.resolve('./api/validations/twitt/deletetwitt'),
        gettwittRoute: path.resolve('./api/validations/twitt/gettwitt'),
        getusertwittsRoute: path.resolve('./api/validations/twitt/getusertwitts'),
        sendtwittRoute: path.resolve('./api/validations/twitt/sendtwitt')
    }
};

module.exports.path = Path;
module.exports.env = env;
