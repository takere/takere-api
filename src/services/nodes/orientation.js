import severityType from "./severity.type"

export default {
    "slug": "orientation",
    "name": "Orientation",
    "description": "Instruct about something.",
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
            "name": "Name",
            "description": "What's the subject?",
            "required": true,
            "type": "text"
        },
        {
            "slug": "description",
            "name": "Description",
            "description": "This orientation is about...",
            "required": true,
            "type": "text"
        },
        {
            "slug": "content",
            "name": "Content",
            "description": "Orientation content",
            "required": true,
            "type": "text"
        },
        {
            "slug": "severity",
            "name": "Severity",
            "description": "How important is to finish this activity?",
            "required": true,
            "type": "select",
            "options": severityType
        }
    ]
}
