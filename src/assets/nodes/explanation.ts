import LocaleService from '../../services/locale.service';
import severityType from "../types/severity.type";

const localeService = new LocaleService();

export default {
    "slug": "explanation",
    "name": localeService.translate("EXPLANATION_NODE_NAME"),
    "description": localeService.translate("EXPLANATION_NODE_DESCRIPTION"),
    "type": "NON_PERIODIC",
    "color": "#46bdc6",
    "icon": "school",
    "shape": "square",
    "input_list": ["top"],
    "output_list": ["bottom"],
    "content_type": "book",
    "parameters": [
        {
            "slug": "name",
            "name": localeService.translate("NAME"),
            "description": localeService.translate("EXPLANATION_NODE_PARAMETER_NAME_DESCRIPTION"),
            "required": true,
            "type": "text"
        },
        {
            "slug": "description",
            "name": localeService.translate("DESCRIPTION"),
            "description": localeService.translate("EXPLANATION_NODE_PARAMETER_DESCRIPTION_DESCRIPTION"),
            "required": true,
            "type": "text"
        },
        {
            "slug": "pages",
            "name": localeService.translate("PAGES"),
            "description": localeService.translate("EXPLANATION_NODE_PARAMETER_PAGES_DESCRIPTION"),
            "required": true,
            "type": "book"
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
