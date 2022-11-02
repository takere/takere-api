import LocaleService from '../../services/locale.service';

const localeService = new LocaleService();

export default {
    "slug": "conditional",
    "name": localeService.translate("CONDITIONAL_NODE_NAME"),
    "description": localeService.translate("CONDITIONAL_NODE_DESCRIPTION"),
    "type": "CONDITIONAL",
    "color": "#fbbc04",
    "icon": "fork_left",
    "shape": "diamond",
    "input_list": ["top"],
    "output_list": ["left", "right"],
    "content_type": "",
    "parameters": [
        {
            "slug": "left",
            "name": localeService.translate("LEFT"),
            "description": localeService.translate("CONDITIONAL_NODE_PARAMETER_LEFT_DESCRIPTION"),
            "required": true,
            "type": "select"
        },
        {
            "slug": "operator",
            "name": localeService.translate("OPERATOR"),
            "description": localeService.translate("CONDITIONAL_NODE_PARAMETER_OPERATOR_DESCRIPTION"),
            "required": true,
            "type": "select"
        },
        {
            "slug": "right",
            "name": localeService.translate("RIGHT"),
            "description": localeService.translate("CONDITIONAL_NODE_PARAMETER_RIGHT_DESCRIPTION"),
            "required": true,
            "type": "select|text"
        }
    ]
}
