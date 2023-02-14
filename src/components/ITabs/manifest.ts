export const manifest = {
    "name": "ITabs",
    "props": [
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the tabs"
        },
        {
            "name": "modelValue",
            "type": [
                "String"
            ],
            "default": "",
            "description": "Used to set the currently active tab"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the tabs"
        },
        {
            "name": "stretch",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the tabs header as full width"
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
            "name": "header",
            "description": "Slot for tabs header "
        },
        {
            "name": "default",
            "description": "Slot for tab components "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
