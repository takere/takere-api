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
    if (this.isBefore(new Date(job.endDate), new Date())) {
      return;
    }
    
    const isFutureEvent = this.isBefore(new Date(), new Date(job.beginDate));
    
    if (isFutureEvent) {
      this.agenda.schedule(new Date(job.beginDate), 'ONLY_ONCE', job.data);
    }
    else {  // begin < event < end
      this.agenda.schedule('today', 'ONLY_ONCE', job.data);
    }
  }

  public createRepeatedEvent(job: Job, repeatInterval: Cron): void {
    const newJob = this.createTimeTickerJob(job.beginDate, job.endDate);

    newJob.repeatEvery(
      this.cronService.convertCronToString(repeatInterval), 
      job.data
    );

    newJob.save();
  }

  private createTimeTickerJob(startDate: string, endDate: string) {
    return this.agenda.create("TIME_TICKER", {
      repeatInterval: '0',
      skipDays: '0',
      startDate,
      endDate
    });
  }
}

export = JobService;
