const express = require('express');
const router = express.Router();

const sendtwitt = require('./sendtwitt');
const gettwitt = require('./gettwitt');
//const getusertwitts = require('./getusertwitts');
const deletetwitt = require('./deletetwitt');
const retwitt = require('./retwitt');
const like = require('./like');

router.use('/sendtwitt', sendtwitt);
router.use('/gettwitt', gettwitt);
//router.use('/getusertwitts', getusertwitts);
router.use('/deletetwitt', deletetwitt);
router.use('/retwitt', retwitt);
router.use('/like', like);

module.exports = router;
