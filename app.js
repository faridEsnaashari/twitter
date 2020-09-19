global.tools = require('./config').path.tools;
global.env = require('./config').env;
global.controllers = require('./config').path.v1.controllers;
global.validations = require('./config').path.v1.validations;

const express = require('express');
const bodyParser = require('body-parser');
var device = require('express-device');
const responseController = require(global.tools.responser);
const v1 = require('./api/v1/v1');

const app = express();

app.use(bodyParser.json());
app.use(device.capture());
app.use(responseController());


app.use('/v1', v1);

app.use((req, res) => {
    return res.responseController.error(404, "wrong route or method");
});

module.exports = app;