import nodes from './nodes';

const express = require('express');
const router = express.Router();

router.get('/', async function(req, res, next) {

    res.send(nodes);
});

module.exports = router;
