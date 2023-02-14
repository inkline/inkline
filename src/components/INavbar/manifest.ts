export const manifest = {
    "name": "INavbar",
    "props": [
        {
            "name": "collapseOnItemClick",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Determines if the navbar should close when clicking a navbar item"
        },
        {
            "name": "collapseOnClickOutside",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Determines if the navbar should close when clicking outside"
        },
        {
            "name": "collapse",
            "type": [
                "Boolean",
                "String"
            ],
            "default": "'md'",
            "description": "Breakpoint to collapse the navbar at. If boolean value, sets to always or never collapse"
        },
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the navbar"
        },
        {
            "name": "fluid",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the inner container as fluid, spanning 100% width"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the navbar"
        },
        {
            "name": "menuAnimation",
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
            "description": "The animation of the hamburger menu component used for collapsing"
        },
        {
            "name": "modelValue",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Used to manually control the collapsed state of the navbar"
        }
    ],
    "events": [
        {
            "description": "Event emitted for setting the modelValue",
            "name": "update:modelValue"
        }
    ],
    "slots": [
        {
            "name": "default",
            "description": "Slot for default navbar content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
