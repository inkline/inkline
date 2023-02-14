export const manifest = {
    "name": "IPopover",
    "props": [
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the popover"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the popover"
        },
        {
            "name": "visible",
            "type": [
                "Boolean"
            ],
            "default": "undefined",
            "description": "Used to manually control the visibility of the popover"
        },
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "uid()",
            "description": "The identifier of the popover"
        },
        {
            "name": "arrow",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Displays an arrow on the popover pointing to the trigger element"
        },
        {
            "name": "placement",
            "type": [
                "top",
                "top-start",
                "top-end",
                "bottom",
                "bottom-start",
                "bottom-end",
                "left",
                "left-start",
                "left-end",
                "right",
                "right-start",
                "right-end"
            ],
            "default": "false",
            "description": "The placement of the popover"
        },
        {
            "name": "events",
            "type": [
                "hover",
                "focus",
                "click",
                "manual"
            ],
            "default": "hover, focus",
            "description": "The events used to trigger the popover"
        },
        {
            "name": "offset",
            "type": [
                "Number"
            ],
            "default": "6",
            "description": "The offset of the popover relative to the trigger element"
        },
        {
            "name": "interactable",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Determines whether hover state should be transferred from trigger to popup"
        },
        {
            "name": "popupOptions",
            "type": [
                "Object"
            ],
            "default": "",
            "description": "Used to override the floating-ui options used for creating the popover"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the popover"
        },
        {
            "name": "hoverHideDelay",
            "type": [
                "Number"
            ],
            "default": "300",
            "description": "Delay in milliseconds before the popover is hidden on hover"
        },
        {
            "name": "animationDuration",
            "type": [
                "Number"
            ],
            "default": "300",
            "description": "Animation duration in milliseconds"
        }
    ],
    "events": [
        {
            "description": "Event emitted for setting the visible",
            "name": "update:visible"
        },
        {
            "description": "Event emitted when clicking outside the popover",
            "name": "click:outside"
        }
    ],
    "slots": [
        {
            "name": "default",
            "description": "Slot for popover trigger "
        },
        {
            "name": "header",
            "description": "Slot for popover header content "
        },
        {
            "name": "body",
            "description": "Slot for popover body content "
        },
        {
            "name": "footer",
            "description": "Slot for popover footer content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
