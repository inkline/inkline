export const manifest = {
    "name": "IButton",
    "props": [
        {
            "name": "active",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The active state of the button"
        },
        {
            "name": "block",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the button as a block, spanning the full container width"
        },
        {
            "name": "circle",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the button as a circle"
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
                "danger",
                "facebook",
                "google",
                "twitter",
                "github"
            ],
            "default": "",
            "description": "The color variant of the button"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the button"
        },
        {
            "name": "to",
            "type": [
                "String"
            ],
            "default": "undefined",
            "description": "Renders the component as an anchor link with a `href` attribute"
        },
        {
            "name": "link",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the button as a link"
        },
        {
            "name": "loading",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The loading state of the button"
        },
        {
            "name": "outline",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the button as an outline button"
        },
        {
            "name": "tag",
            "type": [
                "String"
            ],
            "default": "button",
            "description": "Set the HTML tag to be used for rendering the button"
        },
        {
            "name": "tabindex",
            "type": [
                "Number",
                "String"
            ],
            "default": "0",
            "description": "The tabindex of the button"
        },
        {
            "name": "to",
            "type": [
                "String"
            ],
            "default": "undefined",
            "description": "Renders the component as a Router Link component with a `to` attribute"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the button"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "loading",
            "description": "Slot for button loading state "
        },
        {
            "name": "default",
            "description": "Slot for default button content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
