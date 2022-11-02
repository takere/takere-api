import Agenda from "agenda";
import JobConfig from '../config/job.config';
import Service from './service';
import Job from '../models/job.model';
import Cron from '../models/cron.model';
import CronService from "./cron.service";
import Node from "../domain/node.domain";
import Flow from '../domain/flow.domain';
import isBefore from 'date-fns/isBefore';

class JobService extends Service {
  private readonly agenda: Agenda;
  private readonly cronService: CronService;
  
  private readonly isBefore: any;

  constructor() {
    super();
    this.isBefore = isBefore;
    this.cronService = new CronService();
    
    this.agenda = this.buildAgenda();
  }

  private buildAgenda(): Agenda {
    const jobConfig = new JobConfig();

    return jobConfig.agenda;
  }

  public createDailyJobForNode(node: Node, flow: Flow) {
    const indexBeginDate = node.parameters.findIndex(parameter => parameter.slug === 'begin_date');
    const beginDate = node.arguments ? node.arguments[indexBeginDate] : undefined;
    const indexEndDate = node.parameters.findIndex(parameter => parameter.slug === 'end_date');
    const endDate = node.arguments ? node.arguments[indexEndDate] : undefined;
    const job: Job = {
      beginDate: beginDate,
      endDate: endDate ?? undefined,
      data: node
    };
    const repeatInterval: Cron = {
      seconds: '59',
      minute: '59',
      hour: '23',
      dayOfMonth: undefined,
      month: undefined,
      dayOfWeek: undefined
    };
    
    this.createRepeatedEvent(job, repeatInterval);
  }

  public createEveryHoursJobForNode(interval: number, node: Node, flow: Flow) {
    const indexBeginDate = node.parameters.findIndex(parameter => parameter.slug === 'begin_date');
    const beginDate = node.arguments ? node.arguments[indexBeginDate] : undefined;
    const indexEndDate = node.parameters.findIndex(parameter => parameter.slug === 'end_date');
    const endDate = node.arguments ? node.arguments[indexEndDate] : undefined;
    const job: Job = {
      beginDate: beginDate,
      endDate: endDate,
      data: node
    };
    const repeatInterval: Cron = {
      seconds: '0',
      minute: `0`,
      hour: `*/${interval}`,
      dayOfMonth: undefined,
      month: undefined,
      dayOfWeek: undefined
    };
    
    this.createRepeatedEvent(job, repeatInterval);
  }

  public createEveryDaysJobForNode(interval: number, node: Node, flow: Flow) {
    const indexBeginDate = node.parameters.findIndex(parameter => parameter.slug === 'begin_date');
    const beginDate = node.arguments ? node.arguments[indexBeginDate] : undefined;
    const indexEndDate = node.parameters.findIndex(parameter => parameter.slug === 'end_date');
    const endDate = node.arguments ? node.arguments[indexEndDate] : undefined;
    const job: Job = {
      beginDate: beginDate,
      endDate: endDate,
      data: node
    };
    const repeatInterval: Cron = {
      seconds: '0',
      minute: `0`,
      hour: `0`,
      dayOfMonth: `*/${interval}`,
      month: undefined,
      dayOfWeek: undefined
    };
    
    this.createRepeatedEvent(job, repeatInterval);
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

export default JobService;
