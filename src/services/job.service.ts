import Agenda = require("agenda");
import Service = require('./service');
import Job = require('../models/job.model');
import Cron = require('../models/cron.model');
import CronService = require("./cron.service");

class JobService extends Service {
  private readonly agenda: Agenda.Agenda;
  private readonly cronService: CronService;
  private readonly isBefore: any;

  constructor(agenda: Agenda.Agenda) {
    super();
    this.agenda = agenda;
    this.cronService = new CronService();
    this.isBefore = require('date-fns/isBefore');
  }

  public createOnlyOnceEvent(job: Job): void {
    if (this.isBefore(new Date(job.date.end), new Date())) {
      return;
    }
    
    const isFutureEvent = this.isBefore(new Date(), new Date(job.date.begin));
    
    if (isFutureEvent) {
      this.agenda.schedule(new Date(job.date.begin), job.name, job.data);
    }
    else {  // begin < event < end
      this.agenda.schedule('today', job.name, job.data);
    }
    
  }

  public createRepeatedEvent(job: Job, repeatInterval: Cron): void {
    const newJob = this.agenda.create(job.name, {
      startDate: job.date.begin,
      endDate: job.date.end, // beginNode of this node (remember: may have multiple begin nodes)
    });

    newJob.repeatEvery(
      this.cronService.convertCronToString(repeatInterval), 
      job.data
    );

    newJob.save();
  }
}

export = JobService;
