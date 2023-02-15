export const manifest = {
    "name": "IDropdown",
    "props": [
        {
            "name": "animationDuration",
            "type": [
                "Number"
            ],
            "default": "300",
            "description": "The duration of the hide and show animation"
        },
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the dropdown"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the dropdown"
        },
        {
            "name": "hideOnItemClick",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Used to hide the dropdown when clicking or selecting a dropdown item"
        },
        {
            "name": "triggerKeyBindings",
            "type": [
                "string[]"
            ],
            "default": "up, down, enter, space, tab, esc",
            "description": "The keydown events bound to the trigger element"
        },
        {
            "name": "itemKeyBindings",
            "type": [
                "string[]"
            ],
            "default": "up, down, enter, space, tab, esc",
            "description": "The keydown events bound to the dropdown item elements"
        },
        {
            "name": "visible",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Used to manually control the visibility of the dropdown"
        },
        {
            "name": "arrow",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Displays an arrow on the dropdown pointing to the trigger element"
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
            "description": "The placement of the dropdown"
        },
        {
            "name": "trigger",
            "type": [
                "hover",
                "focus",
                "click",
                "manual"
            ],
            "default": "click",
            "description": "The events used to trigger the dropdown"
        },
        {
            "name": "offset",
            "type": [
                "Number"
            ],
            "default": "6",
            "description": "The offset of the dropdown relative to the trigger element"
        },
        {
            "name": "interactable",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Determines whether hover state should be transferred from trigger to popup"
        },
        {
            "name": "popupOptions",
            "type": [
                "Object"
            ],
            "default": "",
            "description": "Used to override the floating-ui options used for creating the dropdown"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the dropdown"
        },
        {
            "name": "hoverHideDelay",
            "type": [
                "Number"
            ],
            "default": "300",
            "description": "Delay in milliseconds before the popover is hidden on hover"
        }
    ],
    "events": [
        {
            "description": "Event emitted when clicking outside the dropdown elements",
            "name": "click:outside"
        },
        {
            "description": "Event emitted for setting the visible",
            "name": "update:visible"
        }
    ],
    "slots": [
        {
            "name": "default",
            "description": "Slot for dropdown trigger "
        },
        {
            "name": "header",
            "description": "Slot for dropdown header content "
        },
        {
            "name": "body",
            "description": "Slot for dropdown body content "
        },
        {
            "name": "footer",
            "description": "Slot for dropdown footer content "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--dropdown--line-height",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--font-size",
                "value": [
                    {
                        "name": "--dropdown--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--dropdown--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--dropdown--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--dropdown--sm--font-size",
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
                        "name": "--dropdown--md--font-size",
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
                        "name": "--dropdown--lg--font-size",
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
                "name": "--dropdown--min-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--max-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--color",
                "value": [
                    {
                        "name": "--dropdown--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--dropdown--dark--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--dropdown--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--dropdown--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--dropdown--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--header--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--header--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--header--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--header--background",
                "value": [
                    {
                        "name": "--dropdown--light--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--dropdown--dark--header--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--dropdown--light--header--background",
                        "value": [
                            {
                                "name": "--color-gray-50"
                            }
                        ]
                    },
                    {
                        "name": "--dropdown--dark--header--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--dropdown--header--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--header--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--header--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--header--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--body--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--body--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--body--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--body--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--body--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--body--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--body--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--body--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--footer--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--footer--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--footer--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--footer--background",
                "value": [
                    {
                        "name": "--dropdown--light--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--dropdown--dark--footer--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--dropdown--light--footer--background",
                        "value": [
                            {
                                "name": "--color-gray-50"
                            }
                        ]
                    },
                    {
                        "name": "--dropdown--dark--footer--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--dropdown--footer--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--footer--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--footer--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--footer--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--dropdown--border-top-left-radius",
                "value": [
                    {
                        "name": "--dropdown--sm--border-top-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--dropdown--md--border-top-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--dropdown--lg--border-top-left-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--dropdown--sm--border-top-left-radius",
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
                        "name": "--dropdown--md--border-top-left-radius",
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
                        "name": "--dropdown--lg--border-top-left-radius",
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
                "name": "--dropdown--border-top-right-radius",
                "value": [
                    {
                        "name": "--dropdown--sm--border-top-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--dropdown--md--border-top-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--dropdown--lg--border-top-right-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--dropdown--sm--border-top-right-radius",
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
                        "name": "--dropdown--md--border-top-right-radius",
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
                        "name": "--dropdown--lg--border-top-right-radius",
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
                "name": "--dropdown--border-bottom-left-radius",
                "value": [
                    {
                        "name": "--dropdown--sm--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--dropdown--md--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--dropdown--lg--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--dropdown--sm--border-bottom-left-radius",
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
                        "name": "--dropdown--md--border-bottom-left-radius",
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
                        "name": "--dropdown--lg--border-bottom-left-radius",
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
                "name": "--dropdown--border-bottom-right-radius",
                "value": [
                    {
                        "name": "--dropdown--sm--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--dropdown--md--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--dropdown--lg--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--dropdown--sm--border-bottom-right-radius",
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
                        "name": "--dropdown--md--border-bottom-right-radius",
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
                        "name": "--dropdown--lg--border-bottom-right-radius",
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
