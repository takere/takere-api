const timeTickerNode = require('./nodes/timeTicker');
const reminderNode = require('./nodes/reminder');

const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {

    const data = [timeTickerNode, reminderNode]
    res.send(data)
});

module.exports = router;
