const express = require('express');
const connection = require('./api/tools/connection');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

const sendVerificationCodeRoute = require('./api/routes/sendVerificationCode');
const verifyCodeRoute = require('./api/routes/verifyCode');

app.use('/sendvrificationcode', sendVerificationCodeRoute);
app.use('/verifyCode', verifyCodeRoute);

app.use((req, res) => {
    const responseJson = {
        message : "wrong route or method"
    };
    res.status(404).json(responseJson);
});

module.exports = app;