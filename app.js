const express = require('express');
const {connection} = require('./api/tools/connectionManager');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

const signinRoute = require('./api/routes/signin');
const sendVerificationCodeRoute = require('./api/routes/sendVerificationCode');
const verifyCodeRoute = require('./api/routes/verifyCode');
const registerRoute = require('./api/routes/register');

app.use('/signin', signinRoute);
app.use('/sendvrificationcode', sendVerificationCodeRoute);
app.use('/verifycode', verifyCodeRoute);
app.use('/register', registerRoute);

app.use((req, res) => {
    const error = {
        status: 404,
        success: false,
        message: "wrong route or method"
    };
    return res.status(404).json(error);
});

module.exports = app;