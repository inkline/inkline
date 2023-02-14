export const manifest = {
    "name": "IDropdownItem",
    "props": [
        {
            "name": "active",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The active state of the dropdown item"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the dropdown item"
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
            "name": "plaintext",
            "type": [
                "String"
            ],
            "default": "div",
            "description": "Display the dropdown item as plaintext"
        },
        {
            "name": "tag",
            "type": [
                "String"
            ],
            "default": "div",
            "description": "Set the HTML tag to be used for rendering the dropdown item"
        },
        {
            "name": "tabindex",
            "type": [
                "Number",
                "String"
            ],
            "default": "0",
            "description": "The tabindex of the list group item"
        },
        {
            "name": "to",
            "type": [
                "String"
            ],
            "default": "undefined",
            "description": "Renders the component as a Router Link component with a `to` attribute"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for default dropdown item content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
