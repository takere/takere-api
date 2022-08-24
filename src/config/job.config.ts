import Agenda = require("agenda");
import EdgeService = require('../services/edge.service');
import NodeService = require('../services/node.service');

const isBefore = require('date-fns/isBefore')

class JobConfig {
  private static _agenda: Agenda.Agenda;

  public run(): void {
    this.buildAgenda();
  }

  private buildAgenda() {
    // const nodeProcess = new NodeProcessCore();
    JobConfig._agenda = new Agenda.Agenda({ db: { address: process.env.MONGODB_URI ?? '', collection: 'jobs' } });
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

  private async runJob(job: any) {
    try{
      // console.log(job.attrs)
      const finishDateIsBeforeToday = isBefore(new Date(), new Date(job.attrs.endDate));
      if(finishDateIsBeforeToday) {
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
    await this.handleRecursiveTreeEdges(node.id);
  }
  
  private async handleRecursiveTreeEdges(nodeId: any) {
    const edgeService = new EdgeService();
    const nodeService = new NodeService();
    const jobs = require("../jobs/handleJobs");
  
    const sourceNode = await nodeService.findById(nodeId);

    if (!sourceNode) {
      return;
    }

    const edges = await edgeService.findAllBySourceId(sourceNode.id ?? '');
    if (sourceNode.type !== 'CONDITIONAL_NODE') {
      await jobs.handleJob(
        sourceNode.type,
        sourceNode.id,
        sourceNode.data,
        sourceNode.flow
      );
    }
    for (let e of edges) {
      await this.handleRecursiveTreeEdges(e.target);
    }
  }

  get agenda(): Agenda.Agenda {
    if (!JobConfig._agenda) {
      this.buildAgenda();
    }

    return JobConfig._agenda;
  }
}

export = JobConfig;
