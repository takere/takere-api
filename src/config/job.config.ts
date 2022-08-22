class JobConfig {
  private readonly jobQueue: any;

  constructor() {
    this.jobQueue = require('../helpers/jobQueue');
  }

  public run(): void {
    this.jobQueue.jobQueue();
    this.createDefaultJobs();
  }

  private createDefaultJobs(): void {
    this.createCheckConditionalsJob();
  }

  private createCheckConditionalsJob(): void {
    const job = this.jobQueue.ag.create('CHECK_CONDITIONALS');

    job.repeatAt("0:00am");

    job.save();
  }
}

export = JobConfig;
