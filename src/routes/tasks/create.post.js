const express = require('express');
const router = express.Router();
// const Node = require('../../models/Node');
const nodeService = require('../../services/node.service');
const Edge = require('../../models/Edge');
const Flow = require('../../models/Flow');
// const Node = require('../../repositories').nodeCollection;
// const Edge = require('../../repositories').edgeCollection;
// const Flow = require('../../repositories').flowCollection;
const ag =  require('./../../helpers/jobQueue');


router.post('/', async function(req, res, next) {
    const { data, name, description, userEmail } = req.body
    const user = await req.user;

    let timeTickers = [];
    let nodes = data.filter(d => d.type);
    let edges = data.filter(d => d.source);

    const flow = new Flow({
        user: user._id,
        name: name,
        userEmail: userEmail,
        description: description
    });
    await flow.save();

    for (n of nodes){
        n
        console.log('STORING', n.id)
        // const dbNode = new Node({ type: n.type, position: n?.position, data: n?.data, flow: flow._id, id: n.id });
        const storedNode = await nodeService.insert({ type: n.type, position: n?.position, data: n?.data, flow: flow._id, id: n.id });
        edges.map(e => {
            if(e?.target === n.id){
                e.target = storedNode._id
            }
            if(e.source === n.id){
                e.source = storedNode._id
            }
        });

        if(storedNode.type === 'TIME_TICKER'){
            timeTickers.push(storedNode);
        }

        // dbNode.save();
    }

    for(e of edges){
        const dbEdge = new Edge({source: e.source, target: e?.target, flow: flow._id, animated: e.animated});
        dbEdge.save();
    }

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
