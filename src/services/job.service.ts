import Agenda = require("agenda");
import JobConfig = require('../config/job.config');
import Service = require('./service');
import Job = require('../models/job.model');
import Cron = require('../models/cron.model');
import CronService = require("./cron.service");
import Edge = require("../domain/edge.domain");
import Node = require("../domain/node.domain");


class JobService extends Service {
  private readonly agenda: Agenda.Agenda;
  private readonly cronService: CronService;
  
  private readonly isBefore: any;

  constructor() {
    super();
    this.isBefore = require('date-fns/isBefore');
    this.cronService = new CronService();
    
    this.agenda = this.buildAgenda();
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

  public createJobForNode(storedNode: Node, nodes: Node[], edges: Edge[]) {
    // const { type, value } = storedNode.data.results.frequency;
    // const beginNode: Node = this.findRoot(storedNode, nodes, edges);

    // // TODO: Validate if received nodes contains all required fields

    // const job: Job = {
    //   beginDate: beginNode.data.results.startDate,
    //   endDate: beginNode.data.results.endDate,
    //   data: storedNode
    // };

    // if (type === 'onlyOnce') {
    //   this.createOnlyOnceEvent(job);
    // }
    // else {
    //   const repeatInterval: Cron = {
    //     seconds: (type === 'daily') ? '59' : '0',
    //     minute: (type === 'daily') ? '23' : `*/${value}`,
    //     hour: (type === 'everyDays') ? `*/${value}` : undefined,
    //     dayOfMonth: undefined,
    //     month: undefined,
    //     dayOfWeek: undefined
    //   };
    //   this.createRepeatedEvent(job, repeatInterval);
    // }
  }
  
  private findRoot(node: Node, nodes: Node[], edges: Edge[]): Node {
    const parent = this.findParent(node, nodes, edges);

    if (parent === node) {
      return parent;
    }

    return this.findRoot(parent, nodes, edges);
  }

  private findParent(node: Node, nodes: Node[], edges: Edge[]): Node {
    const parentId = edges.find(edge => edge.target === node.id)?.source ?? node.id;

    return nodes.find(n => n.id === parentId) ?? node;
  }
}

export = JobService;
