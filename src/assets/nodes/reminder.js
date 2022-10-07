const notificationType = require("../types/notification.type")
const severityType = require("../types/severity.type")
const frequencyType = require("../types/frequency.type")

module.exports = {
    "slug": "reminder",
    "name": "Reminder",
    "description": "Remember about something.",
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
            "description": "Reminder content",
            "required": true,
            "type": "text"
        },
        {
            "slug": "notification_type",
            "name": "Notification type",
            "description": "How this reminder should be displayed?",
            "required": true,
            "type": "select",
            "options": notificationType
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
            "slug": "begin_date",
            "name": "Begin date",
            "description": "When should reminder start?",
            "required": true,
            "type": "date"
        },
        {
            "slug": "end_date",
            "name": "End date",
            "description": "When should reminder end?",
            "required": false,
            "type": "date"
        },
        {
            "slug": "frequency",
            "name": "Frequency",
            "description": "How often this treatment should be performed?",
            "required": true,
            "type": "select&number",
            "options": frequencyType
        }
    ]
}
