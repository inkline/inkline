export const manifest = {
    "name": "IListGroupItem",
    "props": [
        {
            "name": "active",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The active state of the list group item"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the list group item"
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
            "name": "tag",
            "type": [
                "String"
            ],
            "default": "div",
            "description": "Set the HTML tag to be used for rendering the nav item"
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
            "description": "Slot for list group item content "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--list-group--border-bottom-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--border-bottom-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--border-bottom-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--active--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--active--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--active--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--border-top-left-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--border-top-right-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--border-bottom-left-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--border-bottom-right-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--disabled--color",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
