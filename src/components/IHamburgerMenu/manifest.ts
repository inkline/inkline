export const manifest = {
    "name": "IHamburgerMenu",
    "props": [
        {
            "name": "animation",
            "type": [
                "close",
                "arrow-up",
                "arrow-down",
                "arrow-left",
                "arrow-right",
                "plus",
                "minus"
            ],
            "default": "close",
            "description": "The animation of the hamburger menu"
        },
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the hamburger menu"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the hamburger menu"
        },
        {
            "name": "modelValue",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Used to set the hamburger menu as opened or closed"
        }
    ],
    "events": [
        {
            "description": "Event emitted for setting the modelValue",
            "name": "update:modelValue"
        }
    ],
    "slots": [],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
