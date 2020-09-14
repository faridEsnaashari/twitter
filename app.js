const express = require('express');
const {connection} = require('./api/tools/connectionManager');
const bodyParser = require('body-parser');
var device = require('express-device');
const responseController = require('./api/tools/responses');

const app = express();

app.use(bodyParser.json());
app.use(device.capture());
app.use(responseController());

const signinRoute = require('./api/routes/register/signin');
const verifyCodeRoute = require('./api/routes/register/verifyCode');
const registerRoute = require('./api/routes/register/register');
const verifyphonenumberRoute = require('./api/routes/register/verifyphonenumber');
const twittRotue = require('./api/routes/twitt/twitt');

app.use('/signin', signinRoute);
app.use('/verifycode', verifyCodeRoute);
app.use('/register', registerRoute);
app.use('/verifyphonenumber', verifyphonenumberRoute);
app.use('/twitt', twittRotue);

app.use((req, res) => {
    return res.responseController.error(404, "wrong route or method");
});

module.exports = app;