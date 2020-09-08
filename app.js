const express = require('express');
const connection = require('./api/connection');

const sendVerificationCodeRoute = require('./api/routes/sendVerificationCode');

const app = express();

app.use('/sendvrificationcode', sendVerificationCodeRoute);

app.use((req, res) => {
    const responseJson = {
        message : "wrong route or method"
    };
    res.status(404).json(responseJson);
});

module.exports = app;