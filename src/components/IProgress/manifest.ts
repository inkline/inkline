export const manifest = {
    "name": "IProgress",
    "props": [
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the progress component"
        },
        {
            "name": "min",
            "type": [
                "Number"
            ],
            "default": "0",
            "description": "The value to consider as the 0% starting point"
        },
        {
            "name": "max",
            "type": [
                "Number"
            ],
            "default": "100",
            "description": "The value to consider as the 100% ending point"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the progress component"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for progress bars "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
