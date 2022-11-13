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
    "value": "1",
    "label": localeService.translate("VERY_LOW")
  },
  {
    "value": "2",
    "label": localeService.translate("LOW")
  },
  {
    "value": "3",
    "label": localeService.translate("MEDIUM")
  },
  {
    "value": "4",
    "label": localeService.translate("CRITICAL")
  },
  {
    "value": "5",
    "label": localeService.translate("VERY_CRITICAL")
  }
]
