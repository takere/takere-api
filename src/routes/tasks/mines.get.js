const express = require('express');
const router = express.Router();
const flowService = require('../../services/flow.service');
router.get('/', async function(req, res, next) {
    const user = await req.user;
    const flows = await flowService.findByUserId(user._id);

    res.send(flows);
});

module.exports = router;
