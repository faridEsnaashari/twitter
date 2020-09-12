const express = require('express');
const router = express.Router();

const sendtwitt = require('./sendtwitt');
router.use('/sendtwitt', sendtwitt);

module.exports = router;