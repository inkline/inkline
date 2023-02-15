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
        "variables": [
            {
                "name": "--dropdown--item--margin",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--item--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--item--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--item--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--item--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--item--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--item--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--item--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--item--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--item--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--item--hover--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--item--hover--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--item--disabled--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--item--disabled--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--item--active--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--item--active--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--item--active--font-weight",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
