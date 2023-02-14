export const manifest = {
    "name": "INavItem",
    "props": [
        {
            "name": "active",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The active state of the nav item"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the nav item"
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
            "name": "stopPropagation",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Used to close the nearest navbar or sidebar by propagating the onClick event"
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
            "description": "Slot for default nav item content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
