export const manifest = {
    "name": "IProgress",
    "props": [
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the progress component"
        },
        {
            "name": "min",
            "type": [
                "Number"
            ],
            "default": "0",
            "description": "The value to consider as the 0% starting point"
        },
        {
            "name": "max",
            "type": [
                "Number"
            ],
            "default": "100",
            "description": "The value to consider as the 100% ending point"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the progress component"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for progress bars "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--progress--background",
                "value": [
                    {
                        "name": "--progress--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--progress--dark--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--progress--light--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--progress--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--progress--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--progress--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--progress--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--progress--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--progress--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--progress--height",
                "value": [
                    {
                        "name": "--progress--sm--height",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--progress--md--height",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--progress--lg--height",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--progress--sm--height",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--progress--md--height",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--progress--lg--height",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
