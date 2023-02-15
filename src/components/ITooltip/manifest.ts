export const manifest = {
    "name": "ITooltip",
    "props": [
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the tooltip"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the tooltip"
        },
        {
            "name": "visible",
            "type": [
                "Boolean"
            ],
            "default": "undefined",
            "description": "Used to manually control the visibility of the tooltip"
        },
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "uid()",
            "description": "The identifier of the tooltip"
        },
        {
            "name": "arrow",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Displays an arrow on the tooltip pointing to the trigger element"
        },
        {
            "name": "placement",
            "type": [
                "top",
                "top-start",
                "top-end",
                "bottom",
                "bottom-start",
                "bottom-end",
                "left",
                "left-start",
                "left-end",
                "right",
                "right-start",
                "right-end"
            ],
            "default": "false",
            "description": "The placement of the tooltip"
        },
        {
            "name": "events",
            "type": [
                "hover",
                "focus",
                "click",
                "manual"
            ],
            "default": "hover, focus",
            "description": "The events used to trigger the tooltip"
        },
        {
            "name": "offset",
            "type": [
                "Number"
            ],
            "default": "6",
            "description": "The offset of the tooltip relative to the trigger element"
        },
        {
            "name": "interactable",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Determines whether hover state should be transferred from trigger to popup"
        },
        {
            "name": "popupOptions",
            "type": [
                "Object"
            ],
            "default": "",
            "description": "Used to override the floating-ui options used for creating the tooltip"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the tooltip"
        },
        {
            "name": "hoverHideDelay",
            "type": [
                "Number"
            ],
            "default": "300",
            "description": "Delay in milliseconds before the tooltip is hidden on hover"
        },
        {
            "name": "animationDuration",
            "type": [
                "Number"
            ],
            "default": "300",
            "description": "Animation duration in milliseconds"
        }
    ],
    "events": [
        {
            "description": "Event emitted for setting the visible",
            "name": "update:visible"
        },
        {
            "description": "Event emitted when clicking outside the tooltip",
            "name": "click:outside"
        }
    ],
    "slots": [
        {
            "name": "default",
            "description": "Slot for tooltip trigger "
        },
        {
            "name": "body",
            "description": "Slot for tooltip body content "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--tooltip--line-height",
                "value": [],
                "variants": []
            },
            {
                "name": "--tooltip--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--tooltip--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--tooltip--color",
                "value": [
                    {
                        "name": "--tooltip--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--tooltip--dark--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--tooltip--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--tooltip--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--tooltip--background",
                "value": [
                    {
                        "name": "--tooltip--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--tooltip--dark--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--tooltip--light--background",
                        "value": [
                            {
                                "name": "--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--tooltip--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--tooltip--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--tooltip--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--tooltip--font-size",
                "value": [
                    {
                        "name": "--tooltip--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--tooltip--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--tooltip--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--tooltip--sm--font-size",
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
                        "name": "--tooltip--md--font-size",
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
                        "name": "--tooltip--lg--font-size",
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
                "name": "--tooltip--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--tooltip--box-shadow",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
