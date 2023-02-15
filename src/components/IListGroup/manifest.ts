export const manifest = {
    "name": "IListGroup",
    "props": [
        {
            "name": "border",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Display the list group border"
        },
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the list group"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the list group"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for list group items "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--list-group--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--background",
                "value": [
                    {
                        "name": "--list-group--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--list-group--dark--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--list-group--light--background",
                        "value": [
                            {
                                "name": "--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--list-group--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--list-group--color",
                "value": [
                    {
                        "name": "--list-group--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--list-group--dark--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--list-group--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--list-group--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--list-group--font-size",
                "value": [
                    {
                        "name": "--list-group--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--list-group--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--list-group--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--list-group--sm--font-size",
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
                        "name": "--list-group--md--font-size",
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
                        "name": "--list-group--lg--font-size",
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
                "name": "--list-group--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--list-group--border-color",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
