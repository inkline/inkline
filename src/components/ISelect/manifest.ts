export const manifest = {
    "name": "ISelect",
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
            "name": "autocomplete",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Enable autocomplete functionality"
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
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the select"
        },
        {
            "name": "clearable",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the select as clearable"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the select"
        },
        {
            "name": "error",
            "type": [
                "Boolean",
                "Array"
            ],
            "default": "'touched', 'dirty', 'invalid'",
            "description": "The error state of the checkbox, computed based on schema by default."
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
            "name": "idField",
            "type": [
                "String"
            ],
            "default": "id",
            "description": "The field to be used for identifying the options"
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
            "description": "The keydown events bound to the select option elements"
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
            "name": "label",
            "type": [
                "String",
                "Function"
            ],
            "default": "label",
            "description": "Used to extract the label from the select option and select value"
        },
        {
            "name": "loading",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The loading state of the select"
        },
        {
            "name": "modelValue",
            "type": [
                "String,Number, Boolean"
            ],
            "default": "null",
            "description": "Used to set the field value"
        },
        {
            "name": "visible",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Used to manually control the visibility of the select dropdown"
        },
        {
            "name": "minLength",
            "type": [
                "Number"
            ],
            "default": "0",
            "description": "The minimum input length to open the select dropdown at"
        },
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "uid()",
            "description": "The unique identifier of the select"
        },
        {
            "name": "options",
            "type": [
                "Array"
            ],
            "default": "",
            "description": "The options to be displayed in the select component"
        },
        {
            "name": "placeholder",
            "type": [
                "String"
            ],
            "default": "''",
            "description": "The placeholder of the select input"
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
            "description": "The placement of the select dropdown"
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
            "name": "readonly",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The readonly state of the select"
        },
        {
            "name": "scrollTolerance",
            "type": [
                "Number"
            ],
            "default": "160",
            "description": "The number of pixels until scroll end before loading the next page"
        },
        {
            "name": "selectFirstOptionOnEnter",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Selects the first option when pressing enter"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the select"
        },
        {
            "name": "tabindex",
            "type": [
                "Number",
                "String"
            ],
            "default": "0",
            "description": "The tabindex of the select"
        },
        {
            "name": "type",
            "type": [
                "String"
            ],
            "default": "text",
            "description": "The type of the select"
        },
        {
            "name": "total",
            "type": [
                "Number"
            ],
            "default": "",
            "description": "The total number of options, used for infinite scrolling"
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
            "name": "validate",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Enable select validation using schema"
        }
    ],
    "events": [
        {
            "description": "Event emitted for setting the modelValue",
            "name": "update:modelValue"
        },
        {
            "description": "Event emitted for setting the visible",
            "name": "update:visible"
        },
        {
            "description": "Event emitted when clicking outside the select component",
            "name": "click:outside"
        },
        {
            "description": "Event emitted when input value changes",
            "name": "search"
        },
        {
            "description": "Event emitted when the next page needs to be loaded",
            "name": "pagination"
        },
        {
            "description": "Event emitted when clearing the select element",
            "name": "clear"
        }
    ],
    "slots": [
        {
            "name": "prepend",
            "description": "Slot for the select prepend content "
        },
        {
            "name": "prefix",
            "description": "Slot for the select prefix content "
        },
        {
            "name": "suffix",
            "description": "Slot for the select suffix content "
        },
        {
            "name": "append",
            "description": "Slot for the select append content "
        },
        {
            "name": "clearable",
            "description": "Slot for the select clearable button "
        },
        {
            "name": "header",
            "description": "Slot for the select header content "
        },
        {
            "name": "option",
            "description": "Slot for the select option content "
        },
        {
            "name": "footer",
            "description": "Slot for the select footer content "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--select-line-height",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--min-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--max-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--color",
                "value": [
                    {
                        "name": "--select--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--dark--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--select--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--select--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--select--font-size",
                "value": [
                    {
                        "name": "--select--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--select--sm--font-size",
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
                        "name": "--select--md--font-size",
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
                        "name": "--select--lg--font-size",
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
                "name": "--select--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--header--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--header--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--header--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--header--background",
                "value": [
                    {
                        "name": "--select--light--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--dark--header--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--select--light--header--background",
                        "value": [
                            {
                                "name": "--color-gray-50"
                            }
                        ]
                    },
                    {
                        "name": "--select--dark--header--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--select--header--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--body--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--body--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--body--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--body--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--body--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--max-height",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--divider--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--footer--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--footer--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--footer--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--footer--background",
                "value": [
                    {
                        "name": "--select--light--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--dark--footer--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--select--light--footer--background",
                        "value": [
                            {
                                "name": "--color-gray-50"
                            }
                        ]
                    },
                    {
                        "name": "--select--dark--footer--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--select--footer--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--border-top-left-radius",
                "value": [
                    {
                        "name": "--select--sm--border-top-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--md--border-top-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--lg--border-top-left-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--select--sm--border-top-left-radius",
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
                        "name": "--select--md--border-top-left-radius",
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
                        "name": "--select--lg--border-top-left-radius",
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
                "name": "--select--border-top-right-radius",
                "value": [
                    {
                        "name": "--select--sm--border-top-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--md--border-top-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--lg--border-top-right-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--select--sm--border-top-right-radius",
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
                        "name": "--select--md--border-top-right-radius",
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
                        "name": "--select--lg--border-top-right-radius",
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
                "name": "--select--border-bottom-left-radius",
                "value": [
                    {
                        "name": "--select--sm--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--md--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--lg--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--select--sm--border-bottom-left-radius",
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
                        "name": "--select--md--border-bottom-left-radius",
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
                        "name": "--select--lg--border-bottom-left-radius",
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
                "name": "--select--border-bottom-right-radius",
                "value": [
                    {
                        "name": "--select--sm--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--md--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--lg--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--select--sm--border-bottom-right-radius",
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
                        "name": "--select--md--border-bottom-right-radius",
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
                        "name": "--select--lg--border-bottom-right-radius",
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
            },
            {
                "name": "--input--error--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--margin-left",
                "value": [],
                "variants": []
            },
            {
                "name": "--select--color",
                "value": [
                    {
                        "name": "--select--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--dark--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--select--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--select--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--select--font-size",
                "value": [
                    {
                        "name": "--select--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--select--sm--font-size",
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
                        "name": "--select--md--font-size",
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
                        "name": "--select--lg--font-size",
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
                "name": "--select--font-size",
                "value": [
                    {
                        "name": "--select--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--select--sm--font-size",
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
                        "name": "--select--md--font-size",
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
                        "name": "--select--lg--font-size",
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
                "name": "--select--font-size",
                "value": [
                    {
                        "name": "--select--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--select--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--select--sm--font-size",
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
                        "name": "--select--md--font-size",
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
                        "name": "--select--lg--font-size",
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
            }
        ]
    }
};

export default manifest;
