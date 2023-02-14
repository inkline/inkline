export const manifest = {
    "name": "IFormLabel",
    "props": [
        {
            "name": "for",
            "type": [
                "String"
            ],
            "default": "",
            "description": "The id of the target input to be focused by the form label. If left empty, clicking the form label will focus the next sibling input"
        },
        {
            "name": "placement",
            "type": [
                "left",
                "right"
            ],
            "default": "left",
            "description": "The placement of the form label"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the form label"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for default form label content  "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
