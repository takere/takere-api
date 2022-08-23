import Service = require('./service');
import Job = require('../models/job.model');
import Agenda = require("agenda");

class JobService extends Service {
  private readonly agenda: Agenda.Agenda;

  constructor(agenda: Agenda.Agenda) {
    super();
    this.agenda = agenda;
  }

  public createOnlyOnceEvent(job: Job): void {
    this.agenda.schedule('today', job.name, job.data);
  }

  public createRepeatedEvent(job: Job): void {
    const newJob = this.agenda.create(jobName, {});

    newJob.repeatEvery(repeatInterval, jobData);

    newJob.save();
  }
}

export = JobService;
