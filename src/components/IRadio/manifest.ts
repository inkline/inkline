export const manifest = {
    "name": "IRadio",
    "props": [
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the radio"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the radio"
        },
        {
            "name": "error",
            "type": [
                "Boolean",
                "Array"
            ],
            "default": "'touched', 'dirty', 'invalid'",
            "description": "The error state of the radio, computed based on schema by default."
        },
        {
            "name": "value",
            "type": [],
            "default": "false",
            "description": "Used to set the radio value when used inside a radio group"
        },
        {
            "name": "modelValue",
            "type": [],
            "default": "false",
            "description": "Used to set the radio value when used by itself"
        },
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "uid()",
            "description": "The unique identifier of the radio"
        },
        {
            "name": "native",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Displays the native browser radio input indicator"
        },
        {
            "name": "readonly",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The readonly state of the radio"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the radio"
        },
        {
            "name": "tabindex",
            "type": [
                "Number",
                "String"
            ],
            "default": "0",
            "description": "The tabindex of the radio"
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
            "name": "default",
            "description": "Slot for default radio label "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
