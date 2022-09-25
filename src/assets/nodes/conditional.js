module.exports = {
    "slug": "conditional",
    "name": "Conditional",
    "description": "Chooses which flow will be executed based on some condition.",
    "type": "CONDITIONAL",
    "color": "#fbbc04",
    "icon": "fork_left",
    "shape": "diamond",
    "input_list": ["top"],
    "output_list": ["left", "right"],
    "content_type": "",
    "parameters": [
        {
            "slug": "left",
            "name": "Left operand",
            "description": "Care plan begin date",
            "required": true,
            "type": "select"
        },
        {
            "slug": "operator",
            "name": "Operator",
            "description": "Operator that will be applied in the left and right operands",
            "required": true,
            "type": "select"
        },
        {
            "slug": "right",
            "name": "Right",
            "description": "Right operand",
            "required": true,
            "type": "select|text"
        }
    ]
}
