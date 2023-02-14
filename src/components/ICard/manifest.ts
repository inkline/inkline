export const manifest = {
    "name": "ICard",
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
            "description": "The color variant of the card"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the card"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "header",
            "description": "Slot for card header content "
        },
        {
            "name": "image",
            "description": "Slot for card image "
        },
        {
            "name": "default",
            "description": "Slot for card header content "
        },
        {
            "name": "footer",
            "description": "Slot for card footer content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
