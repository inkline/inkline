export const manifest = {
    "name": "ISidebar",
    "props": [
        {
            "name": "ariaLabel",
            "type": [
                "String"
            ],
            "default": "Sidebar",
            "description": "The aria-label of the sidebar"
        },
        {
            "name": "collapse",
            "type": [
                "Boolean",
                "String"
            ],
            "default": "'md'",
            "description": "Breakpoint to collapse the sidebar at. If boolean value, sets to always or never collapse"
        },
        {
            "name": "collapseOnItemClick",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Determines if the sidebar should close when clicking a sidebar item"
        },
        {
            "name": "collapseOnClickOutside",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Determines if the sidebar should close when clicking outside, on the overlay"
        },
        {
            "name": "collapsePosition",
            "type": [
                "fixed",
                "absolute",
                "relative"
            ],
            "default": "absolute",
            "description": "The collapse position of the sidebar"
        },
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the sidebar"
        },
        {
            "name": "placement",
            "type": [
                "left",
                "right"
            ],
            "default": "left",
            "description": "The placement of the sidebar"
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
            "name": "modelValue",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Used to manually control the collapsed state of the sidebar"
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
            "description": "Slot for sidebar content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
