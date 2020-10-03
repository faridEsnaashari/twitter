const express = require('express');
const router = express.Router();

const signinRoute = require('./routes/register/signin');
const verifyCodeRoute = require('./routes/register/verifyCode');
const registerRoute = require('./routes/register/register');
const verifyphonenumberRoute = require('./routes/register/verifyphonenumber');
const twittRotue = require('./routes/twitt/twitt');
const payRoute = require('./routes/pay/pay');

router.use('/signin', signinRoute);
router.use('/verifycode', verifyCodeRoute);
router.use('/register', registerRoute);
router.use('/verifyphonenumber', verifyphonenumberRoute);
router.use('/twitt', twittRotue);
router.use('/pay', payRoute);

module.exports = router;
