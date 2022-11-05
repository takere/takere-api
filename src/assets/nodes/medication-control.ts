import LocaleService from '../../services/locale.service';;
import severityType from "../types/severity.type";
import frequencyType from "../types/frequency.type";

const localeService = new LocaleService();

const MedicationControlNode = {
    "slug": "medication_control",
    "name": localeService.translate("MEDICATION_CONTROL_NODE_NAME"),
    "description": localeService.translate("MEDICATION_CONTROL_NODE_DESCRIPTION"),
    "type": "PERIODIC",
    "color": "#db594f",
    "icon": "healing",
    "shape": "square",
    "input_list": ["top"],
    "output_list": ["bottom"],
    "content_type": "unordered_list",
    "parameters": [
        {
            "slug": "name",
            "name": localeService.translate("NAME"),
            "description": localeService.translate("MEDICATION_CONTROL_NODE_PARAMETER_NAME_DESCRIPTION"),
            "required": true,
            "type": "text"
        },
        {
            "slug": "description",
            "name": localeService.translate("DESCRIPTION"),
            "description": localeService.translate("MEDICATION_CONTROL_NODE_PARAMETER_DESCRIPTION_DESCRIPTION"),
            "required": true,
            "type": "text"
        },
        {
            "slug": "why",
            "name": localeService.translate("WHY"),
            "description": localeService.translate("MEDICATION_CONTROL_NODE_PARAMETER_WHY_DESCRIPTION"),
            "required": true,
            "type": "text"
        },
        {
            "slug": "notes",
            "name": localeService.translate("NOTES"),
            "description": localeService.translate("MEDICATION_CONTROL_NODE_PARAMETER_NOTES_DESCRIPTION"),
            "required": false,
            "type": "text"
        },
        {
            "slug": "dosage",
            "name": localeService.translate("DOSAGE"),
            "description": localeService.translate("MEDICATION_CONTROL_NODE_PARAMETER_DOSAGE_DESCRIPTION"),
            "required": true,
            "type": "text"
        },
        {
            "slug": "begin_date",
            "name": localeService.translate("BEGIN_DATE"),
            "description": localeService.translate("MEDICATION_CONTROL_NODE_PARAMETER_BEGIN_DATE_DESCRIPTION"),
            "required": true,
            "type": "date"
        },
        {
            "slug": "end_date",
            "name": localeService.translate("END_DATE"),
            "description": localeService.translate("MEDICATION_CONTROL_NODE_PARAMETER_END_DATE_DESCRIPTION"),
            "required": false,
            "type": "date"
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
            "slug": "frequency",
            "name": localeService.translate("FREQUENCY"),
            "description": localeService.translate("MEDICATION_CONTROL_NODE_PARAMETER_FREQUENCY_DESCRIPTION"),
            "required": true,
            "type": "select&number",
            "options": frequencyType
        }
    ],
    "icons": [
        "",
        "notes",
        "help",
        "comment",
        "medical-services",
        "play-arrow",
        "stop"
    ]
}

export default MedicationControlNode;
