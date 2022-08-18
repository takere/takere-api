const express = require('express');
const router = express.Router();
const nodeService = require('../../../services/node.service');
const flowService = require('../../../services/flow.service');
const edgeService = require('../../../services/edge.service');

router.get('/:uid', async function(req, res, next) {
    const user = await req.user;
    const flowId = await req.params.uid;

    const flow = await flowService.findOne({user: user.id, id: flowId});
    // const nodes = await Node.find({ flow: flow.id});
    const nodes = await nodeService.find({ flow: flow.id});
    const edges = await edgeService.findByFlowId(flow.id);

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
    // const nodes = await Node.deleteMany({ flow: flow.id});
    nodeService.deleteMany({ flow: flow.id});
    const edges = await edgeService.deleteManyByFlowId(flow.id);


    res.send('success');
});

module.exports = router;
