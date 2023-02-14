export const manifest = {
    "name": "IBadge",
    "props": [
        {
            "name": "color",
            "type": [
                "primary",
                "success",
                "light",
                "dark",
                "info",
                "success",
                "warning",
                "danger"
            ],
            "default": "",
            "description": "The color variant of the badge"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the badge"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for default badge content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
