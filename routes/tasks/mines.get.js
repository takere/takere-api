const express = require('express');
const router = express.Router();
const Flow = require('../../models/Flow');
router.get('/', async function(req, res, next) {
    const user = await req.user;
    const flows = await Flow.find({user: user._id});

    res.send(flows);
});

module.exports = router;
