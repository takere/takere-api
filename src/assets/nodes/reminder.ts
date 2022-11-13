/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import LocaleService from '../../services/locale.service';
import notificationType from "../types/notification.type";
import severityType from "../types/severity.type";
import frequencyType from "../types/frequency.type";


const localeService = new LocaleService();

const ReminderNode = {
    "slug": "reminder",
    "name": localeService.translate("REMINDER_NODE_NAME"),
    "description": localeService.translate("REMINDER_NODE_DESCRIPTION"),
    "type": "PERIODIC",
    "color": "#f974bc",
    "icon": "textsms",
    "shape": "square",
    "input_list": ["top"],
    "output_list": ["bottom"],
    "content_type": "text",
    "parameters": [
        {
            "slug": "name",
            "name": localeService.translate("NAME"),
            "description": localeService.translate("REMINDER_NODE_PARAMETER_NAME_DESCRIPTION"),
            "required": true,
            "type": "text"
        },
        {
            "slug": "description",
            "name": localeService.translate("DESCRIPTION"),
            "description": localeService.translate("REMINDER_NODE_PARAMETER_DESCRIPTION_DESCRIPTION"),
            "required": true,
            "type": "text"
        },
        {
            "slug": "content",
            "name": localeService.translate("CONTENT"),
            "description": localeService.translate("REMINDER_NODE_PARAMETER_CONTENT_DESCRIPTION"),
            "required": true,
            "type": "text"
        },
        {
            "slug": "notification_type",
            "name": localeService.translate("BEGIN_NODE_DESCRIPTION"),
            "description": localeService.translate("REMINDER_NODE_PARAMETER_NOTIFICATION_TYPE_DESCRIPTION"),
            "required": true,
            "type": "select",
            "options": notificationType
        },
        {
            "slug": "severity",
            "name": localeService.translate("SEVERITY"),
            "description": localeService.translate("NODE_PARAMETER_SEVERITY_DESCRIPTION"),
            "required": true,
            "type": "select",
            "options": severityType
        },
        {
            "slug": "begin_date",
            "name": localeService.translate("BEGIN_DATE"),
            "description": localeService.translate("REMINDER_NODE_PARAMETER_BEGIN_DATE_DESCRIPTION"),
            "required": true,
            "type": "date"
        },
        {
            "slug": "end_date",
            "name": localeService.translate("END_DATE"),
            "description": localeService.translate("REMINDER_NODE_PARAMETER_END_DATE_DESCRIPTION"),
            "required": false,
            "type": "date"
        },
        {
            "slug": "frequency",
            "name": localeService.translate("FREQUENCY"),
            "description": localeService.translate("REMINDER_NODE_PARAMETER_FREQUENCY_DESCRIPTION"),
            "required": true,
            "type": "select&number",
            "options": frequencyType
        }
    ]
}

export default ReminderNode;
