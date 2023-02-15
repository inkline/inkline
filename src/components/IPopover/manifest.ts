export const manifest = {
    "name": "IPopover",
    "props": [
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the popover"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the popover"
        },
        {
            "name": "visible",
            "type": [
                "Boolean"
            ],
            "default": "undefined",
            "description": "Used to manually control the visibility of the popover"
        },
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "uid()",
            "description": "The identifier of the popover"
        },
        {
            "name": "arrow",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Displays an arrow on the popover pointing to the trigger element"
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
            "description": "The placement of the popover"
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
            "description": "The events used to trigger the popover"
        },
        {
            "name": "offset",
            "type": [
                "Number"
            ],
            "default": "6",
            "description": "The offset of the popover relative to the trigger element"
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
            "description": "Used to override the floating-ui options used for creating the popover"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the popover"
        },
        {
            "name": "hoverHideDelay",
            "type": [
                "Number"
            ],
            "default": "300",
            "description": "Delay in milliseconds before the popover is hidden on hover"
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
            "description": "Event emitted when clicking outside the popover",
            "name": "click:outside"
        }
    ],
    "slots": [
        {
            "name": "default",
            "description": "Slot for popover trigger "
        },
        {
            "name": "header",
            "description": "Slot for popover header content "
        },
        {
            "name": "body",
            "description": "Slot for popover body content "
        },
        {
            "name": "footer",
            "description": "Slot for popover footer content "
        }
    ],
    "css": {
        "selector": "@use",
        "variables": [
            {
                "name": "--popover--line-height",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--width",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--max-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--color",
                "value": [
                    {
                        "name": "--popover--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--popover--dark--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--popover--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--popover--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--popover--font-size",
                "value": [
                    {
                        "name": "--popover--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--popover--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--popover--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--popover--sm--font-size",
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
                        "name": "--popover--md--font-size",
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
                        "name": "--popover--lg--font-size",
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
                "name": "--popover--header--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--header--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--header--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--header--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--header--background",
                "value": [
                    {
                        "name": "--popover--light--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--popover--dark--header--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--popover--light--header--background",
                        "value": [
                            {
                                "name": "--color-gray-50"
                            }
                        ]
                    },
                    {
                        "name": "--popover--dark--header--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--popover--body--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--body--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--body--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--body--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--body--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--footer--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--footer--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--footer--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--footer--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--popover--footer--background",
                "value": [
                    {
                        "name": "--popover--light--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--popover--dark--footer--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--popover--light--footer--background",
                        "value": [
                            {
                                "name": "--color-gray-50"
                            }
                        ]
                    },
                    {
                        "name": "--popover--dark--footer--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--popover--border-top-left-radius",
                "value": [
                    {
                        "name": "--popover--sm--border-top-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--popover--md--border-top-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--popover--lg--border-top-left-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--popover--sm--border-top-left-radius",
                        "value": [
                            {
                                "name": "--border-top-left-radius"
                            },
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--popover--md--border-top-left-radius",
                        "value": [
                            {
                                "name": "--border-top-left-radius"
                            },
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--popover--lg--border-top-left-radius",
                        "value": [
                            {
                                "name": "--border-top-left-radius"
                            },
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--popover--border-top-right-radius",
                "value": [
                    {
                        "name": "--popover--sm--border-top-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--popover--md--border-top-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--popover--lg--border-top-right-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--popover--sm--border-top-right-radius",
                        "value": [
                            {
                                "name": "--border-top-right-radius"
                            },
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--popover--md--border-top-right-radius",
                        "value": [
                            {
                                "name": "--border-top-right-radius"
                            },
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--popover--lg--border-top-right-radius",
                        "value": [
                            {
                                "name": "--border-top-right-radius"
                            },
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--popover--border-bottom-left-radius",
                "value": [
                    {
                        "name": "--popover--sm--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--popover--md--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--popover--lg--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--popover--sm--border-bottom-left-radius",
                        "value": [
                            {
                                "name": "--border-bottom-left-radius"
                            },
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--popover--md--border-bottom-left-radius",
                        "value": [
                            {
                                "name": "--border-bottom-left-radius"
                            },
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--popover--lg--border-bottom-left-radius",
                        "value": [
                            {
                                "name": "--border-bottom-left-radius"
                            },
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--popover--border-bottom-right-radius",
                "value": [
                    {
                        "name": "--popover--sm--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--popover--md--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--popover--lg--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--popover--sm--border-bottom-right-radius",
                        "value": [
                            {
                                "name": "--border-bottom-right-radius"
                            },
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--popover--md--border-bottom-right-radius",
                        "value": [
                            {
                                "name": "--border-bottom-right-radius"
                            },
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--popover--lg--border-bottom-right-radius",
                        "value": [
                            {
                                "name": "--border-bottom-right-radius"
                            },
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
