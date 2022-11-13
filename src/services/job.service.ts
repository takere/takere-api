/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Agenda from "agenda";
import JobConfig from '../config/job.config';
import Service from './service';
import Job from '../models/job.model';
import Cron from '../models/cron.model';
import CronService from "./cron.service";
import Node from "../domain/node.domain";
import Flow from '../domain/flow.domain';
import isBefore from 'date-fns/isBefore';


/**
 * Responsible for providing worker services.
 */
class JobService extends Service {

  // --------------------------------------------------------------------------
  //         Attributes
  // --------------------------------------------------------------------------
  private readonly agenda: Agenda;
  private readonly cronService: CronService;


  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
    this.cronService = new CronService();
    this.agenda = this.buildAgenda();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
  private buildAgenda(): Agenda {
    const jobConfig = new JobConfig();

    return jobConfig.agenda;
  }

  public createDailyJobForNode(node: Node, flow: Flow) {
    const job: Job = this.buildJob(node);
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

  private buildJob(node: Node): Job {
    const beginDate = this.extractBeginDateArgument(node);
    const endDate = this.extractEndDateArgument(node);

    return {
      beginDate: beginDate,
      endDate: endDate ?? undefined,
      data: node
    };
  }

  private extractBeginDateArgument(node: Node) {
    if (!node.arguments) {
      return null;
    }

    const indexBeginDate = this.extractIndexOfBeginDateParameter(node);
    
    return node.arguments[indexBeginDate];
  }

  private extractIndexOfBeginDateParameter(node: Node) {
    return node.parameters.findIndex(
      parameter => parameter.slug === 'begin_date'
    );
  }

  private extractEndDateArgument(node: Node) {
    if (!node.arguments) {
      return null;
    }

    const indexEndDate = this.extractIndexOfEndDateParameter(node);
    
    return node.arguments[indexEndDate];
  }

  private extractIndexOfEndDateParameter(node: Node) {
    return node.parameters.findIndex(
      parameter => parameter.slug === 'end_date'
    );
  }

  public createEveryHoursJobForNode(interval: number, node: Node, flow: Flow) {
    const job: Job = this.buildJob(node);
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
    const job: Job = this.buildJob(node);
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
