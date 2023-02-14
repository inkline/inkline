export const manifest = {
    "name": "IModal",
    "props": [
        {
            "name": "closeOnPressEscape",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Determines if the modal should close when pressing escape"
        },
        {
            "name": "closeAriaLabel",
            "type": [
                "String"
            ],
            "default": "Close",
            "description": "The aria-label attribute of the close button"
        },
        {
            "name": "color",
            "type": [
                "primary",
                "success",
                "light",
                "dark",
                "info",
                "success",
                "warning",
                "danger"
            ],
            "default": "",
            "description": "The color variant of the modal"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the modal"
        },
        {
            "name": "hideOnClickOutside",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Determines if the modal should close when clicking the overlay"
        },
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "uid()",
            "description": "The identifier of the modal"
        },
        {
            "name": "showClose",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Determines if the close icon should be visible in the modal header"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the modal"
        },
        {
            "name": "modelValue",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Used to determine if modal is visible or not"
        },
        {
            "name": "transition",
            "type": [
                "fade-in-transition",
                "fade-in-linear-transition",
                "zoom-in-top-transition",
                "zoom-in-bottom-transition",
                "zoom-in-center-transition",
                "zoom-in-left-transition",
                "zoom-in-right-transition"
            ],
            "default": "zoom-in-center-transition",
            "description": "The modal opening and closing animation"
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
            "name": "footer",
            "description": "Slot for modal header content "
        },
        {
            "name": "close",
            "description": "Close icon slot "
        },
        {
            "name": "default",
            "description": "Slot for modal body content "
        },
        {
            "name": "footer",
            "description": "Slot for modal footer content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
