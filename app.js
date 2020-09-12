const express = require('express');
const {connection} = require('./api/tools/connectionManager');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

const signinRoute = require('./api/routes/signin');
const sendVerificationCodeRoute = require('./api/routes/sendVerificationCode');
const verifyCodeRoute = require('./api/routes/verifyCode');
const registerRoute = require('./api/routes/register');
const twittRotue = require('./api/routes/twitt/twitt');

app.use('/signin', signinRoute);
app.use('/sendvrificationcode', sendVerificationCodeRoute);
app.use('/verifycode', verifyCodeRoute);
app.use('/register', registerRoute);
app.use('/twitt', twittRotue);

app.use((req, res) => {
    const responseJson = {
        message : "wrong route or method"
    };
    res.status(404).json(responseJson);
});

module.exports = app;