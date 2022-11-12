/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Cron from '../models/cron.model';
import Service from './service';


/**
 * Responsible for providing cron transformation services.
 */
class CronService extends Service {

  // --------------------------------------------------------------------------
  //         Constructor
  // --------------------------------------------------------------------------
  constructor() {
    super();
  }


  // --------------------------------------------------------------------------
  //         Methods
  // --------------------------------------------------------------------------
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

export default CronService;
