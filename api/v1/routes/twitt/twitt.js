const express = require('express');
const router = express.Router();

const sendtwitt = require('./sendtwitt');
const gettwitt = require('./gettwitt');
//const getusertwitts = require('./getusertwitts');
const deletetwitt = require('./deletetwitt');

router.use('/sendtwitt', sendtwitt);
router.use('/gettwitt', gettwitt);
//router.use('/getusertwitts', getusertwitts);
router.use('/deletetwitt', deletetwitt);

module.exports = router;
