export const manifest = {
    "name": "ISelect",
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
            "name": "autocomplete",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Enable autocomplete functionality"
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
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the select"
        },
        {
            "name": "clearable",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the select as clearable"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the select"
        },
        {
            "name": "error",
            "type": [
                "Boolean",
                "Array"
            ],
            "default": "'touched', 'dirty', 'invalid'",
            "description": "The error state of the checkbox, computed based on schema by default."
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
            "name": "idField",
            "type": [
                "String"
            ],
            "default": "id",
            "description": "The field to be used for identifying the options"
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
            "description": "The keydown events bound to the select option elements"
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
            "name": "label",
            "type": [
                "String",
                "Function"
            ],
            "default": "label",
            "description": "Used to extract the label from the select option and select value"
        },
        {
            "name": "loading",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The loading state of the select"
        },
        {
            "name": "modelValue",
            "type": [
                "String,Number, Boolean"
            ],
            "default": "null",
            "description": "Used to set the field value"
        },
        {
            "name": "visible",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Used to manually control the visibility of the select dropdown"
        },
        {
            "name": "minLength",
            "type": [
                "Number"
            ],
            "default": "0",
            "description": "The minimum input length to open the select dropdown at"
        },
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "uid()",
            "description": "The unique identifier of the select"
        },
        {
            "name": "options",
            "type": [
                "Array"
            ],
            "default": "",
            "description": "The options to be displayed in the select component"
        },
        {
            "name": "placeholder",
            "type": [
                "String"
            ],
            "default": "''",
            "description": "The placeholder of the select input"
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
            "description": "The placement of the select dropdown"
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
            "name": "readonly",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The readonly state of the select"
        },
        {
            "name": "scrollTolerance",
            "type": [
                "Number"
            ],
            "default": "160",
            "description": "The number of pixels until scroll end before loading the next page"
        },
        {
            "name": "selectFirstOptionOnEnter",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Selects the first option when pressing enter"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the select"
        },
        {
            "name": "tabindex",
            "type": [
                "Number",
                "String"
            ],
            "default": "0",
            "description": "The tabindex of the select"
        },
        {
            "name": "type",
            "type": [
                "String"
            ],
            "default": "text",
            "description": "The type of the select"
        },
        {
            "name": "total",
            "type": [
                "Number"
            ],
            "default": "",
            "description": "The total number of options, used for infinite scrolling"
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
            "name": "validate",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Enable select validation using schema"
        }
    ],
    "events": [
        {
            "description": "Event emitted for setting the modelValue",
            "name": "update:modelValue"
        },
        {
            "description": "Event emitted for setting the visible",
            "name": "update:visible"
        },
        {
            "description": "Event emitted when clicking outside the select component",
            "name": "click:outside"
        },
        {
            "description": "Event emitted when input value changes",
            "name": "search"
        },
        {
            "description": "Event emitted when the next page needs to be loaded",
            "name": "pagination"
        },
        {
            "description": "Event emitted when clearing the select element",
            "name": "clear"
        }
    ],
    "slots": [
        {
            "name": "prepend",
            "description": "Slot for the select prepend content "
        },
        {
            "name": "prefix",
            "description": "Slot for the select prefix content "
        },
        {
            "name": "suffix",
            "description": "Slot for the select suffix content "
        },
        {
            "name": "append",
            "description": "Slot for the select append content "
        },
        {
            "name": "clearable",
            "description": "Slot for the select clearable button "
        },
        {
            "name": "header",
            "description": "Slot for the select header content "
        },
        {
            "name": "option",
            "description": "Slot for the select option content "
        },
        {
            "name": "footer",
            "description": "Slot for the select footer content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
