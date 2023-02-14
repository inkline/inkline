export const manifest = {
    "name": "IDropdown",
    "props": [
        {
            "name": "animationDuration",
            "type": [
                "Number"
            ],
            "default": "300",
            "description": "The duration of the hide and show animation"
        },
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the dropdown"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the dropdown"
        },
        {
            "name": "hideOnItemClick",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Used to hide the dropdown when clicking or selecting a dropdown item"
        },
        {
            "name": "triggerKeyBindings",
            "type": [
                "string[]"
            ],
            "default": "up, down, enter, space, tab, esc",
            "description": "The keydown events bound to the trigger element"
        },
        {
            "name": "itemKeyBindings",
            "type": [
                "string[]"
            ],
            "default": "up, down, enter, space, tab, esc",
            "description": "The keydown events bound to the dropdown item elements"
        },
        {
            "name": "visible",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Used to manually control the visibility of the dropdown"
        },
        {
            "name": "arrow",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Displays an arrow on the dropdown pointing to the trigger element"
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
            "description": "The placement of the dropdown"
        },
        {
            "name": "trigger",
            "type": [
                "hover",
                "focus",
                "click",
                "manual"
            ],
            "default": "click",
            "description": "The events used to trigger the dropdown"
        },
        {
            "name": "offset",
            "type": [
                "Number"
            ],
            "default": "6",
            "description": "The offset of the dropdown relative to the trigger element"
        },
        {
            "name": "interactable",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Determines whether hover state should be transferred from trigger to popup"
        },
        {
            "name": "popupOptions",
            "type": [
                "Object"
            ],
            "default": "",
            "description": "Used to override the floating-ui options used for creating the dropdown"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the dropdown"
        },
        {
            "name": "hoverHideDelay",
            "type": [
                "Number"
            ],
            "default": "300",
            "description": "Delay in milliseconds before the popover is hidden on hover"
        }
    ],
    "events": [
        {
            "description": "Event emitted when clicking outside the dropdown elements",
            "name": "click:outside"
        },
        {
            "description": "Event emitted for setting the visible",
            "name": "update:visible"
        }
    ],
    "slots": [
        {
            "name": "default",
            "description": "Slot for dropdown trigger "
        },
        {
            "name": "header",
            "description": "Slot for dropdown header content "
        },
        {
            "name": "body",
            "description": "Slot for dropdown body content "
        },
        {
            "name": "footer",
            "description": "Slot for dropdown footer content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
