export const manifest = {
    "name": "ISelectOption",
    "props": [
        {
            "name": "active",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The active state of the select option"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the select option"
        },
        {
            "name": "label",
            "type": [
                "String"
            ],
            "default": "''",
            "description": "The label of the select option"
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
            "name": "value",
            "type": [
                "Object",
                "String",
                "Number"
            ],
            "default": "",
            "description": "The select option"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for select option label "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--select--option--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--option--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--option--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--option--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--option--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--option--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--option--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--option--hover--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--option--hover--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--option--disabled--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--option--disabled--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--option--active--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--option--active--background",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
