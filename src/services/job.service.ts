import Agenda = require("agenda");
import JobConfig = require('../config/job.config');
import Service = require('./service');
import Job = require('../models/job.model');
import Cron = require('../models/cron.model');
import CronService = require("./cron.service");

class JobService extends Service {
  private readonly agenda: Agenda.Agenda;
  private readonly cronService: CronService;
  private readonly isBefore: any;

  constructor() {
    super();
    this.isBefore = require('date-fns/isBefore');
    this.cronService = new CronService();
    this.agenda = this.buildAgenda();;
  }

  private buildAgenda(): Agenda.Agenda {
    const jobConfig = new JobConfig();

    return jobConfig.agenda;
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

  public createCheckConditionalsEvent(job: Job): void {
    const newJob = this.createCheckConditionalsJob(job.beginDate, job.endDate);

    newJob.repeatEvery('0 0 * * *', job.data);
    newJob.save();
  }

  public createCheckConditionalsJob(startDate: string, endDate: string) {
    return this.agenda.create('CHECK_CONDITIONALS', {
      repeatInterval: '0',
      skipDays: '0',
      startDate,
      endDate
    });
  }
}

export = JobService;
