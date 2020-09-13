const express = require('express');
const router = express.Router();

const sendtwitt = require('./sendtwitt');
const gettwitt = require('./gettwitt');
const getusertwitts = require('./getusertwitts');

router.use('/sendtwitt', sendtwitt);
router.use('/gettwitt', gettwitt);
router.use('/getusertwitts', getusertwitts);

module.exports = router;