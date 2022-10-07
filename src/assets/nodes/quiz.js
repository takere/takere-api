const severityType = require("../types/severity.type")
const frequencyType = require("../types/frequency.type")
const answerType = require("../types/answer.type")

module.exports = {
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
            "type": "form",
            "options": answerType
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
            "description": "When should quiz start?",
            "required": true,
            "type": "date"
        },
        {
            "slug": "end_date",
            "name": "End date",
            "description": "When should quiz end?",
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
