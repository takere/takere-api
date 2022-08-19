const express = require('express');
const router = express.Router();
const nodeService = require('../../../services/node.service');
const flowService = require('../../../services/flow.service');
const edgeService = require('../../../services/edge.service');

router.get('/:uid', async function(req, res, next) {
    const user = await req.user;
    const flowId = await req.params.uid;

    const flow = await flowService.findAllByUserIdAndFlowId(user.id, flowId);
    const nodes = await nodeService.findAllByFlowId(flowId);
    const edges = await edgeService.findAllByFlowId(flowId);

    res.send({
        flowId: flow.id,
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

    const flow = await flowService.removeWithUserIdAndFlowId(user.id, flowId);
    await nodeService.removeAllWithFlowId(flow.id);
    await edgeService.removeAllWithFlowId(flow.id);


    res.send('success');
});

module.exports = router;
