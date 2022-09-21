import severityType from "./severity.type"
import frequencyType from "./frequency.type"

export default {
    "slug": "medication_control",
    "name": "Medication control",
    "description": "Instruct about some medication and how to use it correctly.",
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
            "name": "Name",
            "description": "Medication name.",
            "required": true,
            "type": "text"
        },
        {
            "slug": "description",
            "name": "Description",
            "description": "This medication is about...",
            "required": true,
            "type": "text"
        },
        {
            "slug": "why",
            "name": "Why",
            "description": "This medication is important because...",
            "required": true,
            "type": "text"
        },
        {
            "slug": "notes",
            "name": "Notes",
            "description": "Extra information.",
            "required": false,
            "type": "text"
        },
        {
            "slug": "dosage",
            "name": "Dosage",
            "description": "Dosage along with its unit (ml, mg...)",
            "required": true,
            "type": "text"
        },
        {
            "slug": "begin_date",
            "name": "Begin date",
            "description": "This medication should be taken from...",
            "required": true,
            "type": "date"
        },
        {
            "slug": "end_date",
            "name": "End date",
            "description": "This medication should be taken until...",
            "required": false,
            "type": "date"
        },
        {
            "slug": "severity",
            "name": "Severity",
            "description": "How important is to finish this activity?",
            "required": true,
            "type": "select",
            "options": severityType
        },
        {
            "slug": "frequency",
            "name": "Frequency",
            "description": "How often this treatment should be performed?",
            "required": true,
            "type": "select",
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
