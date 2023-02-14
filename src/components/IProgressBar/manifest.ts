export const manifest = {
    "name": "IProgressBar",
    "props": [
        {
            "name": "color",
            "type": [
                "light",
                "dark",
                "primary",
                "secondary",
                "info",
                "success",
                "warning",
                "danger"
            ],
            "default": "primary",
            "description": "The color variant of the progress bar"
        },
        {
            "name": "value",
            "type": [
                "Number"
            ],
            "default": "0",
            "description": "The value of the progress bar"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for default progress bar content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
