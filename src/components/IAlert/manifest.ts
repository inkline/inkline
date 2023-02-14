export const manifest = {
    "name": "IAlert",
    "props": [
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the alert"
        },
        {
            "name": "color",
            "type": [
                "info",
                "success",
                "warning",
                "danger"
            ],
            "default": "info",
            "description": "The color variant of the alert"
        },
        {
            "name": "modelValue",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Used to show or hide a dismissible alert"
        },
        {
            "name": "dismissible",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Shows a dismiss icon on the alert"
        },
        {
            "name": "dismissAriaLabel",
            "type": [
                "String"
            ],
            "default": "Dismiss",
            "description": "The aria-label to use for the dismiss button"
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
            "name": "icon",
            "description": "Slot for alert icon "
        },
        {
            "name": "default",
            "description": "Slot for toast title "
        },
        {
            "name": "default",
            "description": "Slot for default alert content "
        },
        {
            "name": "dismiss",
            "description": "Slot for alert dismiss button "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
