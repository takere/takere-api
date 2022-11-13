/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import LocaleService from '../../services/locale.service';


const localeService = new LocaleService();

export default [
  {
    "value": "daily",
    "label": localeService.translate("DAILY")
  },
  {
    "value": "onlyOnce",
    "label": localeService.translate("ONLY_ONCE")
  },
  {
    "value": "everyHours",
    "label": localeService.translate("EVERY_X_HOURS"),
    "request_input": "number"
  },
  {
    "value": "everyDays",
    "label": localeService.translate("EVERY_X_DAYS"),
    "request_input": "number"
  }
]
