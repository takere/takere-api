import LocaleService from '../../services/locale.service';
import severityType from "../types/severity.type";
import frequencyType from "../types/frequency.type";
import answerType from "../types/answer.type";

const localeService = new LocaleService();

export default {
    "slug": "quiz",
    "name": localeService.translate("QUIZ_NODE_NAME"),
    "description": localeService.translate("QUIZ_NODE_DESCRIPTION"),
    "type": "PERIODIC",
    "color": "#be96fb",
    "icon": "help",
    "shape": "square",
    "input_list": ["top"],
    "output_list": ["bottom"],
    "content_type": "form",
    "parameters": [
        {
            "slug": "name",
            "name": localeService.translate("NAME"),
            "description": localeService.translate("QUIZ_NODE_PARAMETER_NAME_DESCRIPTION"),
            "required": true,
            "type": "text"
        },
        {
            "slug": "description",
            "name": localeService.translate("DESCRIPTION"),
            "description": localeService.translate("QUIZ_NODE_PARAMETER_DESCRIPTION_DESCRIPTION"),
            "required": true,
            "type": "text"
        },
        {
            "slug": "questions",
            "name": localeService.translate("QUESTIONS"),
            "description": localeService.translate("QUIZ_NODE_PARAMETER_QUESTIONS_DESCRIPTION"),
            "required": true,
            "type": "form",
            "options": answerType
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
            "description": localeService.translate("QUIZ_NODE_PARAMETER_BEGIN_DATE_DESCRIPTION"),
            "required": true,
            "type": "date"
        },
        {
            "slug": "end_date",
            "name": localeService.translate("END_DATE"),
            "description": localeService.translate("QUIZ_NODE_PARAMETER_END_DATE_DESCRIPTION"),
            "required": false,
            "type": "date"
        },
        {
            "slug": "frequency",
            "name": localeService.translate("FREQUENCY"),
            "description": localeService.translate("QUIZ_NODE_PARAMETER_FREQUENCY_DESCRIPTION"),
            "required": true,
            "type": "select&number",
            "options": frequencyType
        }
    ]
}
