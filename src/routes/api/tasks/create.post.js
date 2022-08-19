const express = require('express');
const router = express.Router();
const nodeService = require('../../../services/node.service');
const flowService = require('../../../services/flow.service');
const edgeService = require('../../../services/edge.service');
const ag =  require('../../../helpers/jobQueue');


router.post('/', async function(req, res, next) {
    const { data, name, description, userEmail } = req.body
    const user = await req.user;

    let timeTickers = [];
    let nodes = data.filter(d => d.type);
    let edges = data.filter(d => d.source);

    const flow = await flowService.insert({
        user: user.id,
        name: name,
        userEmail: userEmail,
        description: description
    });

    for (n of nodes){
        console.log('STORING', n.id)
        const storedNode = await nodeService.insert({ type: n.type, position: n?.position, data: n?.data, flow: flow.id, id: n.id });

        edges.map(e => {
            if(e?.target === n.id){
                e.target = storedNode.id
            }
            if(e.source === n.id){
                e.source = storedNode.id
            }
        });

        if(storedNode.type === 'TIME_TICKER'){
            timeTickers.push(storedNode);
        }
    }
    console.log('inserting edges...');
    for(e of edges){
        edgeService.insert({source: e.source, target: e?.target, flow: flow.id, animated: e.animated});
    }

    console.log('ok');


    for(t of timeTickers){
        

        if (t.data.results === undefined) {
            t.data.results = {
                repeatInterval: "0",
                skipDays: "0"
            };
        }

        const agendaData = t.data.results;

        const job = ag.ag.create("TIME_TICKER", t);

        job.repeatEvery(agendaData.repeatInterval, {
            endDate: new Date(agendaData.endDate),
            skipDays: agendaData.skipDays,
            skipImmediate: agendaData.skipImmediate,
            startDate: new Date(agendaData.startDate),
        });
        job.save();
    }

    res.send('Success');
});

module.exports = router;
