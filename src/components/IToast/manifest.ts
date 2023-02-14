export const manifest = {
    "name": "IToast",
    "props": [
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the toast"
        },
        {
            "name": "color",
            "type": [
                "light",
                "dark",
                "info",
                "success",
                "warning",
                "danger"
            ],
            "default": "light",
            "description": "The color variant of the toast"
        },
        {
            "name": "duration",
            "type": [
                "Number"
            ],
            "default": "0",
            "description": "The duration of the toast, in milliseconds. A duration of 0 will show the toast indefinitely."
        },
        {
            "name": "duration",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Show progress bar for the duration of the toast"
        },
        {
            "name": "icon",
            "type": [
                "string",
                "VNode",
                "VNode[]"
            ],
            "default": "undefined",
            "description": "The icon to be rendered in the toast"
        },
        {
            "name": "title",
            "type": [
                "string",
                "VNode",
                "VNode[]"
            ],
            "default": "undefined",
            "description": "The title to be rendered in the toast"
        },
        {
            "name": "message",
            "type": [
                "string",
                "VNode",
                "VNode[]"
            ],
            "default": "undefined",
            "description": "The message to be rendered in the toast"
        },
        {
            "name": "modelValue",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Used to show or hide a dismissible toast"
        },
        {
            "name": "dismissible",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Shows a dismiss icon on the toast"
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
            "description": "Event emitted when the toast is dismissed",
            "name": "dismiss"
        }
    ],
    "slots": [
        {
            "name": "icon",
            "description": "Slot for toast icon "
        },
        {
            "name": "title",
            "description": "Slot for toast title "
        },
        {
            "name": "default",
            "description": "Slot for default toast content "
        },
        {
            "name": "dismiss",
            "description": "Slot for toast dismiss button "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
