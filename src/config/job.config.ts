/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Agenda from "agenda";
import isBefore from 'date-fns/isBefore';
import FlowService from "../services/flow.service";
import EdgeService from '../services/edge.service';
import NodeService from '../services/node.service';
import BoardService from "../services/board.service";
import databaseConfig from "./database.config";


class JobConfig {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private static _agenda: Agenda;


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  public run(): void {
    this.buildAgenda();
  }

  private buildAgenda() {
    JobConfig._agenda = new Agenda({ 
      db: { address: databaseConfig.url ?? '', collection: 'jobs' } 
    });
    JobConfig._agenda.start();

    JobConfig._agenda.define("CHECK_CONDITIONALS", async (job: any) => {
        console.log('Updating conditionals...')
    });

    JobConfig._agenda.define("ONLY_ONCE", async (job: any) => {
      console.log('Running only once job...');
      await this.runJob(job);
    });

    JobConfig._agenda.define("TIME_TICKER", async (job: any) => {
      console.log('Running time ticker job...');
      await this.runJob(job);
    });

    JobConfig._agenda.on("start", (job: any) => {
        console.log("Job %s starting on node %s", job.attrs.name, job.attrs.data._id);
    });

    JobConfig._agenda.on("complete", (job: any) => {
        console.log(`Job ${job.attrs.name} finished on node ${job.attrs.data._id}`);
    });
  }

  public async runJob(job: any) {
    try{
      const finishDateIsBeforeToday = isBefore(new Date(), new Date(job.attrs.endDate));
      if(finishDateIsBeforeToday || job.attrs.endDate === undefined) {
          await this.process(job.attrs.data);
      } else {
          await job.disable();
          console.log("Successfully removed job from collection");
      }
    } 
    catch (e) {
        console.log(e)
    }
  }

  private async process(node: any) {
    const flowService = new FlowService();
    const edgeService = new EdgeService();
    const nodeService = new NodeService();

    await this.handleRecursiveTreeEdges(node.id, flowService, edgeService, nodeService);
  }
  
  private async handleRecursiveTreeEdges(nodeId: any, flowService: any, edgeService: any, nodeService: any) {
    const sourceNode = await nodeService.findById(nodeId);

    if (!sourceNode) {
      return;
    }

    const edges = await edgeService.findAllBySourceId(sourceNode.id ?? '');
    if (sourceNode.type !== 'CONDITIONAL_NODE') {
      const flow = await flowService.findById(sourceNode.flow);
      const boardService = new BoardService();

      await boardService.insert({
        name: sourceNode.data.results.name,
        description: sourceNode.data.results.description,
        patientEmail: flow.userEmail,
        flow: flow.id,
        node: nodeId,
        finished: undefined
      });
    }
    for (let e of edges) {
      await this.handleRecursiveTreeEdges(e.target, flowService, edgeService, nodeService);
    }
  }
  
  get agenda(): Agenda {
    if (!JobConfig._agenda) {
      this.buildAgenda();
    }

    return JobConfig._agenda;
  }
}

export default JobConfig;
