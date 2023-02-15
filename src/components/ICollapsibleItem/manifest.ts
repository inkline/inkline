export const manifest = {
    "name": "ICollapsibleItem",
    "props": [
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "uid()",
            "description": "The unique identifier of the collapsible item, used for determining if the item is open or not"
        },
        {
            "name": "title",
            "type": [
                "String"
            ],
            "default": "",
            "description": "The title of the collapsible item"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "header",
            "description": "Slot for collapsible item header content "
        },
        {
            "name": "default",
            "description": "Slot for default collapsible item content "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--collapsible--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--header--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--header--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--header--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--header--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--header--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--header--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--icon--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--icon--size",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--icon--size",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--icon--size",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--body--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--body--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--body--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--body--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--body--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--body--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--header--border-top-left-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--header--border-top-right-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--header--border-bottom-left-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--header--border-bottom-right-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--body--border-bottom-left-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--collapsible--body--border-bottom-right-radius",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
