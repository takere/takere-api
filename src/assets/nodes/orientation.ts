/*
 * Copyright (c) William Niemiec.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import LocaleService from '../../services/locale.service';
import severityType from "../types/severity.type";


const localeService = new LocaleService();

const OrientationNode = {
    "slug": "orientation",
    "name": localeService.translate("ORIENTATION_NODE_NAME"),
    "description": localeService.translate("ORIENTATION_NODE_DESCRIPTION"),
    "type": "NON_PERIODIC",
    "color": "#49a9ff",
    "icon": "info",
    "shape": "square",
    "input_list": ["top"],
    "output_list": ["bottom"],
    "content_type": "text",
    "parameters": [
        {
            "slug": "name",
            "name": localeService.translate("NAME"),
            "description": localeService.translate("ORIENTATION_NODE_PARAMETER_NAME_DESCRIPTION"),
            "required": true,
            "type": "text"
        },
        {
            "slug": "description",
            "name": localeService.translate("DESCRIPTION"),
            "description": localeService.translate("ORIENTATION_NODE_PARAMETER_DESCRIPTION_DESCRIPTION"),
            "required": true,
            "type": "text"
        },
        {
            "slug": "content",
            "name": localeService.translate("CONTENT"),
            "description": localeService.translate("ORIENTATION_NODE_PARAMETER_CONTENT_DESCRIPTION"),
            "required": true,
            "type": "text"
        },
        {
            "slug": "severity",
            "name": localeService.translate("SEVERITY"),
            "description": localeService.translate("NODE_PARAMETER_SEVERITY_DESCRIPTION"),
            "required": true,
            "type": "select",
            "options": severityType
        }
    ]
}

export default OrientationNode;
