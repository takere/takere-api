export default {
    "slug": "begin",
    "name": "Begin",
    "description": "Every care plan must begin from this node.",
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
            "name": "Begin date",
            "description": "Care plan begin date",
            "required": true,
            "type": "date"
        },
        {
            "slug": "end_date",
            "name": "End date",
            "description": "Care plan end date",
            "required": false,
            "type": "date"
        }
    ]
}
