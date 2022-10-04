const severityType = require("../types/severity.type")

module.exports = {
    "slug": "explanation",
    "name": "Explanation",
    "description": "Guide / e-book for explaining something.",
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
            "name": "Name",
            "description": "What's the subject",
            "required": true,
            "type": "text"
        },
        {
            "slug": "description",
            "name": "Description",
            "description": "This explanation is about...",
            "required": true,
            "type": "text"
        },
        {
            "slug": "pages",
            "name": "Pages",
            "description": "Explanation content",
            "required": true,
            "type": "book"
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
