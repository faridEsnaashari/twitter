const express = require('express');
const router = express.Router();

const sendtwitt = require('./sendtwitt');
const gettwitt = require('./gettwitt');

router.use('/sendtwitt', sendtwitt);
router.use('/gettwitt', gettwitt);

module.exports = router;