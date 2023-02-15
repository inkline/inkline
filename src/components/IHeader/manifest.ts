export const manifest = {
    "name": "IHeader",
    "props": [
        {
            "name": "color",
            "type": [
                "primary",
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the header"
        },
        {
            "name": "cover",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the header background as cover, always covering the whole header width or height"
        },
        {
            "name": "fluid",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the inner content container as fluid, covering 100% of the header width"
        },
        {
            "name": "fullscreen",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Display the header as fullscreen, covering 100% screen height and 100% screen width"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the header"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for default header content "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--header--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--header--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--header--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--header--color",
                "value": [
                    {
                        "name": "--header--primary--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--header--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--header--dark--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--header--primary--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--header--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--header--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--header--background",
                "value": [
                    {
                        "name": "--header--primary--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--header--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--header--dark--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--header--primary--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--header--light--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--header--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--header--padding",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
