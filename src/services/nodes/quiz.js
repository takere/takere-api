import severityType from "./severity.type"
import frequencyType from "./frequency.type"

export default {
    "slug": "quiz",
    "name": "Quiz",
    "description": "Ask about something.",
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
            "name": "Name",
            "description": "What's the subject?",
            "required": true,
            "type": "text"
        },
        {
            "slug": "description",
            "name": "Description",
            "description": "This/these questions are about...",
            "required": true,
            "type": "text"
        },
        {
            "slug": "questions",
            "name": "Questions",
            "description": "Questions to be asked",
            "required": true,
            "type": "form"
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
    ]
}
