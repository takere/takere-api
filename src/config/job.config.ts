import Agenda = require("agenda");
import NodeProcessCore = require("../core/nodeProcessCore");

const isBefore = require('date-fns/isBefore')

class JobConfig {
  private agenda: Agenda.Agenda | null;

  constructor() {
    this.agenda = null;
  }

  public run(): void {
    this.buildAgenda();
    this.createDefaultJobs();
  }

  private buildAgenda() {
    const nodeProcess = new NodeProcessCore();
    this.agenda = new Agenda.Agenda({ db: { address: process.env.MONGODB_URI ?? '', collection: 'jobs' } });
    this.agenda.start();

    this.agenda.define("CHECK_CONDITIONALS", async (job: any) => {
        console.log('Updating conditionals...')
    });

    this.agenda.define("ONLY_ONCE", async (job: any) => {
      console.log('Running only once job...');
    });

    this.agenda.define("TIME_TICKER", async (job: any) => {
        try{
            const finishDateIsBeforeToday = isBefore(new Date(), new Date(job.attrs.endDate));
            if(finishDateIsBeforeToday) {
                await nodeProcess.process(job.attrs.data);
            } else {
                await job.disable();
                console.log("Successfully removed job from collection");
            }
        } catch (e) {
            console.log(e)
        }
    });

    this.agenda.on("start", (job: any) => {
        console.log("Job %s starting on node %s", job.attrs.name, job.attrs.data._id);
    });

    this.agenda.on("complete", (job: any) => {
        console.log(`Job ${job.attrs.name} finished on node ${job.attrs.data._id}`);
    });
  }

  private createDefaultJobs(): void {
    this.createCheckConditionalsJob();
  }

  private createCheckConditionalsJob(): void {
    const job = this.agenda?.create('CHECK_CONDITIONALS', {});

    job?.repeatAt("0:00am");

    job?.save();
  }
}

export = JobConfig;
