export const manifest = {
    "name": "IListGroup",
    "props": [
        {
            "name": "border",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Display the list group border"
        },
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the list group"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the list group"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for list group items "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
