const http = require('http');
const app = require('./app');
const env = require('./config');

const server = http.createServer(app);

server.listen(env.PORT);