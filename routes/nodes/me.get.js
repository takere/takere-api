const timeTickerNode = require('./nodes/timeTicker');
const reminderNode = require('./nodes/reminder');
const motivationalNode = require('./nodes/motivational.json');
const dataInput = require('./nodes/dataInput.json');
const externalLink = require('./nodes/externalLink.json');

const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {

    const data = [timeTickerNode, reminderNode, motivationalNode, dataInput, externalLink]
    res.send(data)
});

module.exports = router;
