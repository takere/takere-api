import Cron = require('../models/cron.model');
import Service = require('./service');

class CronService extends Service {

  constructor() {
    super();
  }

  public convertCronToString(cron: Cron): string {
    const cronString: string[] = [];

    cronString.push(this.convertCronValueToString(cron.seconds));
    cronString.push(this.convertCronValueToString(cron.minute));
    cronString.push(this.convertCronValueToString(cron.hour));
    cronString.push(this.convertCronValueToString(cron.dayOfMonth));
    cronString.push(this.convertCronValueToString(cron.month));
    cronString.push(this.convertCronValueToString(cron.dayOfWeek));

    return cronString.join(' ');
  }

  private convertCronValueToString(value: string | undefined) {
    if (value === undefined) {
      return '*';
    }

    return value;
  }
}

export = CronService;
