export const manifest = {
    "name": "IHeader",
    "props": [
        {
            "name": "color",
            "type": [
                "primary",
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the header"
        },
        {
            "name": "cover",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the header background as cover, always covering the whole header width or height"
        },
        {
            "name": "fluid",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the inner content container as fluid, covering 100% of the header width"
        },
        {
            "name": "fullscreen",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Display the header as fullscreen, covering 100% screen height and 100% screen width"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the header"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for default header content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
