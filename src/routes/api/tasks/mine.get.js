const express = require('express');
const router = express.Router();
const nodeService = require('../../../services/node.service');
const flowService = require('../../../services/flow.service');
const edgeService = require('../../../services/edge.service');

router.get('/:uid', async function(req, res, next) {
    const user = await req.user;
    const flowId = await req.params.uid;

    const flow = await flowService.findOne({user: user._id, _id: flowId});
    // const nodes = await Node.find({ flow: flow._id});
    const nodes = await nodeService.find({ flow: flow._id});
    const edges = await edgeService.findByFlowId(flow._id);

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

    const flow = await flowService.removeWithUserIdAndFlowId(user._id, flowId);
    // const nodes = await Node.deleteMany({ flow: flow._id});
    nodeService.deleteMany({ flow: flow._id});
    const edges = await edgeService.deleteManyByFlowId(flow._id);


    res.send('success');
});

module.exports = router;
