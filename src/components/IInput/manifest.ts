export const manifest = {
    "name": "IInput",
    "props": [
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the input"
        },
        {
            "name": "clearable",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the input as clearable"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the input"
        },
        {
            "name": "error",
            "type": [
                "Boolean",
                "Array"
            ],
            "default": "'touched', 'dirty', 'invalid'",
            "description": "The error state of the input, computed based on schema by default."
        },
        {
            "name": "id",
            "type": [
                "String"
            ],
            "default": "",
            "description": "The id of the internal input element"
        },
        {
            "name": "wrapperId",
            "type": [
                "String"
            ],
            "default": "",
            "description": "The id of the input wrapper element"
        },
        {
            "name": "modelValue",
            "type": [
                "String",
                "Number"
            ],
            "default": "''",
            "description": "Used to set the field value"
        },
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "uid()",
            "description": "The unique identifier of the input"
        },
        {
            "name": "plaintext",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the input as plaintext, disabling interaction"
        },
        {
            "name": "readonly",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The readonly state of the input"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the input"
        },
        {
            "name": "tabindex",
            "type": [
                "Number",
                "String"
            ],
            "default": "0",
            "description": "The tabindex of the input"
        },
        {
            "name": "type",
            "type": [
                "String"
            ],
            "default": "text",
            "description": "The type of the input"
        },
        {
            "name": "clearAriaLabel",
            "type": [
                "String"
            ],
            "default": "Clear",
            "description": "The aria-label of the clear button"
        },
        {
            "name": "validate",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Enable input validation using schema"
        }
    ],
    "events": [
        {
            "description": "Event emitted for setting the modelValue",
            "name": "update:modelValue"
        },
        {
            "description": "Event emitted when clearing the input element",
            "name": "clear"
        }
    ],
    "slots": [
        {
            "name": "prepend",
            "description": "Slot for the input prepend content "
        },
        {
            "name": "prefix",
            "description": "Slot for the input prefix content "
        },
        {
            "name": "clearable",
            "description": "Slot for the clearable button "
        },
        {
            "name": "suffix",
            "description": "Slot for the input suffix content "
        },
        {
            "name": "append",
            "description": "Slot for the input append content "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--input-line-height",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--prepend-append--background",
                "value": [
                    {
                        "name": "--input--light--prepend-append--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--prepend-append--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--prepend-append--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--prepend-append--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--font-size",
                "value": [
                    {
                        "name": "--input--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--sm--font-size",
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
                        "name": "--input--md--font-size",
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
                        "name": "--input--lg--font-size",
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
                "name": "--input--prepend-append--padding-left",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--prepend-append--padding-right",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--border-top-left-radius",
                "value": [
                    {
                        "name": "--input--sm--border-top-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--md--border-top-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--lg--border-top-left-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--sm--border-top-left-radius",
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
                        "name": "--input--md--border-top-left-radius",
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
                        "name": "--input--lg--border-top-left-radius",
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
                "name": "--input--border-bottom-left-radius",
                "value": [
                    {
                        "name": "--input--sm--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--md--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--lg--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--sm--border-bottom-left-radius",
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
                        "name": "--input--md--border-bottom-left-radius",
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
                        "name": "--input--lg--border-bottom-left-radius",
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
                "name": "--input--border-top-right-radius",
                "value": [
                    {
                        "name": "--input--sm--border-top-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--md--border-top-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--lg--border-top-right-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--sm--border-top-right-radius",
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
                        "name": "--input--md--border-top-right-radius",
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
                        "name": "--input--lg--border-top-right-radius",
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
                "name": "--input--border-bottom-right-radius",
                "value": [
                    {
                        "name": "--input--sm--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--md--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--lg--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--sm--border-bottom-right-radius",
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
                        "name": "--input--md--border-bottom-right-radius",
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
                        "name": "--input--lg--border-bottom-right-radius",
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
                "name": "--input--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--border-color",
                "value": [
                    {
                        "name": "--input--light--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--border-color",
                        "value": [
                            {
                                "name": "--color-light-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--border-color",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--color",
                "value": [
                    {
                        "name": "--input--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--background",
                "value": [
                    {
                        "name": "--input--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--background",
                        "value": [
                            {
                                "name": "--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--font-size",
                "value": [
                    {
                        "name": "--input--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--sm--font-size",
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
                        "name": "--input--md--font-size",
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
                        "name": "--input--lg--font-size",
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
                "name": "--input--hover--border-color",
                "value": [
                    {
                        "name": "--input--light--hover--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--hover--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--hover--border-color",
                        "value": [
                            {
                                "name": "--color-light-shade-100"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--hover--border-color",
                        "value": [
                            {
                                "name": "--color-dark-tint-100"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--focus--border-color",
                "value": [
                    {
                        "name": "--input--light--focus--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--focus--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--focus--border-color",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--focus--border-color",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--line-height",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--color",
                "value": [
                    {
                        "name": "--input--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--placeholder--color",
                "value": [
                    {
                        "name": "--input--light--placeholder--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--placeholder--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--placeholder--color",
                        "value": [
                            {
                                "name": "--color-gray-300"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--placeholder--color",
                        "value": [
                            {
                                "name": "--color-gray-600"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--border-color",
                "value": [
                    {
                        "name": "--input--light--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--border-color",
                        "value": [
                            {
                                "name": "--color-light-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--border-color",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--prefix-suffix--color",
                "value": [
                    {
                        "name": "--input--light--prefix-suffix--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--prefix-suffix--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--prefix-suffix--color",
                        "value": [
                            {
                                "name": "--color-gray-700"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--prefix-suffix--color",
                        "value": [
                            {
                                "name": "--color-dark-250"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--prefix-suffix--padding-right",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--prefix-suffix--padding-left",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--prefix--border-right-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--prefix--border-right-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--suffix--border-left-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--prefix--border-left-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--clear--size",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--clear--size",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--clear--background",
                "value": [
                    {
                        "name": "--input--light--clear--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--clear--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--clear--background",
                        "value": [
                            {
                                "value": "transparent"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--clear--background",
                        "value": [
                            {
                                "value": "#{transparent}"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--clear--color",
                "value": [
                    {
                        "name": "--input--light--clear--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--clear--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--clear--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--clear--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--clear--hover--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--clear--hover--background",
                "value": [
                    {
                        "name": "--input--light--clear--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--clear--hover--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--clear--hover--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--clear--hover--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--clear--active--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--input--clear--color",
                "value": [
                    {
                        "name": "--input--light--clear--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--clear--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--clear--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--clear--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
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
                "name": "--input--disabled--color",
                "value": [
                    {
                        "name": "--input--light--disabled--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--disabled--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--disabled--color",
                        "value": [
                            {
                                "name": "--text--color-muted"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--disabled--color",
                        "value": [
                            {
                                "name": "--text--color-muted"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--disabled--background",
                "value": [
                    {
                        "name": "--input--light--disabled--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--disabled--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--disabled--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--disabled--background",
                        "value": [
                            {
                                "name": "--color-dark-300"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--border-color",
                "value": [
                    {
                        "name": "--input--light--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--border-color",
                        "value": [
                            {
                                "name": "--color-light-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--border-color",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--disabled--color",
                "value": [
                    {
                        "name": "--input--light--disabled--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--disabled--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--disabled--color",
                        "value": [
                            {
                                "name": "--text--color-muted"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--disabled--color",
                        "value": [
                            {
                                "name": "--text--color-muted"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--input--focus--border-color",
                "value": [
                    {
                        "name": "--input--light--focus--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--input--dark--focus--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--input--light--focus--border-color",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--input--dark--focus--border-color",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
