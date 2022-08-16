const nodes = require('./nodes/index');

const express = require('express');
const router = express.Router();
router.get('/', async function(req, res, next) {
    console.error('@@', nodes);

    res.send(nodes);
});

module.exports = router;
