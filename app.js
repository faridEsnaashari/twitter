const express = require('express');
const connection = require('./api/connection');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

const sendVerificationCodeRoute = require('./api/routes/sendVerificationCode');

app.use('/sendvrificationcode', sendVerificationCodeRoute);

app.use((req, res) => {
    const responseJson = {
        message : "wrong route or method"
    };
    res.status(404).json(responseJson);
});

module.exports = app;