import LocaleService from '../../services/locale.service';

const localeService = new LocaleService();

export default {
    "slug": "begin",
    "name": localeService.translate("BEGIN_NODE_NAME"),
    "description": localeService.translate("BEGIN_NODE_DESCRIPTION"),
    "type": "BEGIN",
    "color": "#34a853",
    "icon": "schedule_send",
    "shape": "square",
    "input_list": [],
    "output_list": ["bottom"],
    "content_type": "",
    "parameters": [
        {
            "slug": "begin_date",
            "name": localeService.translate("BEGIN_DATE"),
            "description": localeService.translate("BEGIN_NODE_PARAMETER_BEGIN_DATE_DESCRIPTION"),
            "required": true,
            "type": "date"
        },
        {
            "slug": "end_date",
            "name": localeService.translate("END_DATE"),
            "description": localeService.translate("BEGIN_NODE_PARAMETER_END_DATE_DESCRIPTION"),
            "required": false,
            "type": "date"
        }
    ]
}
