export const manifest = {
    "name": "ILoader",
    "props": [
        {
            "name": "color",
            "type": [
                "primary",
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the loader"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg",
                "auto"
            ],
            "default": "",
            "description": "The size variant of the loader"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for default loader content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
