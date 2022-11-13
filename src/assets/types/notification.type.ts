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
      "value": "popup",
      "label": localeService.translate("POPUP_MESSAGE")
    },
    {
      "value": "email",
      "label": localeService.translate("EMAIL_MESSAGE")
    },
    {
      "value": "text",
      "label": localeService.translate("TEXT_MESSAGE")
    },
    {
      "value": "alarm",
      "label": localeService.translate("ALARM")
    }
  ]