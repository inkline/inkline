export const manifest = {
    "name": "IFormLabel",
    "props": [
        {
            "name": "for",
            "type": [
                "String"
            ],
            "default": "",
            "description": "The id of the target input to be focused by the form label. If left empty, clicking the form label will focus the next sibling input"
        },
        {
            "name": "placement",
            "type": [
                "left",
                "right"
            ],
            "default": "left",
            "description": "The placement of the form label"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the form label"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for default form label content  "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--form-label--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--form-label--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--form-label--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--form-label--font-size",
                "value": [
                    {
                        "name": "--form-label--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--form-label--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--form-label--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--form-label--sm--font-size",
                        "value": [
                            {
                                "name": "--font-size"
                            },
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--form-label--md--font-size",
                        "value": [
                            {
                                "name": "--font-size"
                            },
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--form-label--lg--font-size",
                        "value": [
                            {
                                "name": "--font-size"
                            },
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--form-label--margin",
                "value": [],
                "variants": []
            },
            {
                "name": "--form-label--required--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--form-label--error--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--form-label--inline--margin-right",
                "value": [],
                "variants": []
            },
            {
                "name": "--form-label--inline--margin-left",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
