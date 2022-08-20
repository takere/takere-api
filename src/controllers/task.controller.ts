const nodeService = require('../../../services/node.service');
const flowService = require('../../../services/flow.service');
const edgeService = require('../../../services/edge.service');
const ag =  require('../../helpers/jobQueue');

module.exports = {
    getAll: async (req: any, res: any, next: any) => {
      const user = await req.user;
      const flows = await flowService.findAllByUserId(user.id);
  
      res.send(flows);
    },
    get: async (req: any, res: any, next: any) => {
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
    },
    remove: async (req: any, res: any, next: any) => {
      const user = await req.user;
      const flowId = await req.params.uid;
  
      const flow = await flowService.removeWithUserIdAndFlowId(user.id, flowId);
      await nodeService.removeAllWithFlowId(flow.id);
      await edgeService.removeAllWithFlowId(flow.id);
  
  
      res.send('success');
    },
    create: async (req: any, res: any, next: any) => {
      const { data, name, description, userEmail } = req.body
      const user = await req.user;
  
      let timeTickers = [];
      let nodes = data.filter((d: { type: any; }) => d.type);
      let edges = data.filter((d: { source: any; }) => d.source);
  
      const flow = await flowService.insert({
          user: user.id,
          name: name,
          userEmail: userEmail,
          description: description
      });
  
      for (let n of nodes){
          console.log('STORING', n.id)
          const storedNode = await nodeService.insert({ type: n.type, position: n?.position, data: n?.data, flow: flow.id, id: n.id });
  
          edges.map((e: { target: any; source: any; }) => {
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
      for(let e of edges){
          edgeService.insert({source: e.source, target: e?.target, flow: flow.id, animated: e.animated});
      }
  
      console.log('ok');
  
  
      for(let t of timeTickers){
          
  
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
  }
};
