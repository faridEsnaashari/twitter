const dotenv = require('dotenv');
const path = require('path');
dotenv.config();


// ENV variable
const APIKEY = process.env.APIKEY;
const SECRETKEY = process.env.SECRETKEY;

const MYSQL_PORT = process.env.MYSQL_PORT;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_HOST = process.env.MYSQL_HOST;

const JWT_KEY = process.env.JWT_KEY;

const ROOT_ENDPOINT = process.env.ROOT_ENDPOINT;
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
//

const Path = {
    tools:{
        connection: path.resolve('./api/tools/connectionManager.js'),
        token: path.resolve('./api/tools/token.js'),
        randomCode: path.resolve('./api/tools/randomCode.js'),
        responser: path.resolve('./api/tools/responser.js'),
        validation: path.resolve('./api/tools/validation.js'),
    }
};

module.exports.APIKEY = APIKEY;
module.exports.SECRETKEY = SECRETKEY;
module.exports.MYSQL_PORT = MYSQL_PORT;
module.exports.MYSQL_USER = MYSQL_USER;
module.exports.MYSQL_PASSWORD = MYSQL_PASSWORD;
module.exports.MYSQL_DATABASE = MYSQL_DATABASE;
module.exports.MYSQL_HOST = MYSQL_HOST;
module.exports.JWT_KEY = JWT_KEY;
module.exports.ROOT_ENDPOINT = ROOT_ENDPOINT;
module.exports.NODE_ENV = NODE_ENV;
module.exports.PORT = PORT;

module.exports.path = Path;
