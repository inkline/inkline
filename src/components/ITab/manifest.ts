export const manifest = {
    "name": "ITab",
    "props": [
        {
            "name": "title",
            "type": [
                "String"
            ],
            "default": "",
            "description": "The title of the tab"
        },
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "uid()",
            "description": "The name of the tab, used as an identifier"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for tab content "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--tabs--tab--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--tabs--tab--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--tabs--tab--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--tabs--tab--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--tabs--tab--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--tabs--tab--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--tabs--tab--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--tabs--tab--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--tabs--tab--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--tabs--tab--font-size",
                "value": [],
                "variants": []
            },
            {
                "name": "--tabs--tab--padding",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
