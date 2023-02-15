export const manifest = {
    "name": "INavbarBrand",
    "props": [
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
            "description": "Slot for default navbar brand content "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--navbar--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--item--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--brand--font-size",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--brand--margin-right",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
