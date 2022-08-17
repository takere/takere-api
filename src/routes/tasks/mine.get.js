const express = require('express');
const router = express.Router();
// const Node = require('../../models/Node');
const nodeService = require('../../services/node.service');
const Edge = require('../../models/Edge');
const Flow = require('../../models/Flow');

router.get('/:uid', async function(req, res, next) {
    const user = await req.user;
    const flowId = await req.params.uid;

    const flow = await Flow.findOne({user: user._id, _id: flowId});
    // const nodes = await Node.find({ flow: flow._id});
    const nodes = await nodeService.find({ flow: flow._id});
    const edges = await Edge.find({ flow: flow._id});

    res.send({
        flowId: flow._id,
        flowName: flow.name,
        flowDescription: flow.description,
        flowEmail: flow.userEmail,
        data: [
            ...nodes,
            ...edges
        ]
   });
});

router.delete('/:uid', async function(req, res, next) {
    const user = await req.user;
    const flowId = await req.params.uid;

    const flow = await Flow.findOneAndRemove({user: user._id, _id: flowId});
    // const nodes = await Node.deleteMany({ flow: flow._id});
    nodeService.deleteMany({ flow: flow._id});
    const edges = await Edge.deleteMany({ flow: flow._id});


    res.send('success');
});

module.exports = router;
