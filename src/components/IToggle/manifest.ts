export const manifest = {
    "name": "IToggle",
    "props": [
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the checkbox"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the checkbox"
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
            "name": "indeterminate",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The indeterminate state of the checkbox"
        },
        {
            "name": "value",
            "type": [],
            "default": "false",
            "description": "Used to set the checkbox value when used inside a checkbox group"
        },
        {
            "name": "modelValue",
            "type": [],
            "default": "false",
            "description": "Used to set the checkbox value when used by itself"
        },
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "uid()",
            "description": "The unique identifier of the checkbox"
        },
        {
            "name": "native",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Displays the native browser checkbox input indicator"
        },
        {
            "name": "readonly",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The readonly state of the checkbox"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the checkbox"
        },
        {
            "name": "tabindex",
            "type": [
                "Number",
                "String"
            ],
            "default": "0",
            "description": "The tabindex of the checkbox"
        },
        {
            "name": "validate",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Enable toggle validation using schema"
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
            "description": "Slot for default toggle label "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--toggle--checked--background",
                "value": [
                    {
                        "name": "--toggle--light--checked--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--dark--checked--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toggle--light--checked--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--toggle--dark--checked--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toggle--checked--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--toggle--checked--indicator--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--toggle--disabled--label--color",
                "value": [
                    {
                        "name": "--toggle--light--disabled--label--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--dark--disabled--label--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toggle--light--disabled--label--color",
                        "value": [
                            {
                                "name": "--text--color-muted"
                            }
                        ]
                    },
                    {
                        "name": "--toggle--dark--disabled--label--color",
                        "value": [
                            {
                                "name": "--text--color-muted"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toggle--disabled--background",
                "value": [
                    {
                        "name": "--toggle--light--disabled--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--dark--disabled--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toggle--light--disabled--background",
                        "value": [
                            {
                                "name": "--color-light-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--toggle--dark--disabled--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-100"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toggle--disabled--border-color",
                "value": [
                    {
                        "name": "--toggle--dark--disabled--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toggle--dark--disabled--border-color",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toggle--disabled--indicator--background",
                "value": [
                    {
                        "name": "--toggle--dark--disabled--indicator--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toggle--dark--disabled--indicator--background",
                        "value": [
                            {
                                "name": "--color-gray-400"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toggle--checked--disabled--background",
                "value": [
                    {
                        "name": "--toggle--light--checked--disabled--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--dark--checked--disabled--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toggle--light--checked--disabled--background",
                        "value": [
                            {
                                "name": "--color-primary-200"
                            }
                        ]
                    },
                    {
                        "name": "--toggle--dark--checked--disabled--background",
                        "value": [
                            {
                                "name": "--color-primary-800"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toggle--checked--disabled--border-color",
                "value": [
                    {
                        "name": "--toggle--light--checked--disabled--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--dark--checked--disabled--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toggle--light--checked--disabled--border-color",
                        "value": [
                            {
                                "name": "--color-primary-300"
                            }
                        ]
                    },
                    {
                        "name": "--toggle--dark--checked--disabled--border-color",
                        "value": [
                            {
                                "name": "--color-primary-900"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toggle--checked--disabled--indicator--background",
                "value": [
                    {
                        "name": "--toggle--dark--checked--disabled--indicator--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toggle--dark--checked--disabled--indicator--background",
                        "value": [
                            {
                                "name": "--color-gray-300"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toggle--label--color",
                "value": [
                    {
                        "name": "--toggle--light--label--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--dark--label--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toggle--light--label--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--toggle--dark--label--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toggle--label--font-size",
                "value": [
                    {
                        "name": "--toggle--sm--label--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--md--label--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--lg--label--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toggle--sm--label--font-size",
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
                        "name": "--toggle--md--label--font-size",
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
                        "name": "--toggle--lg--label--font-size",
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
                "name": "--toggle--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--toggle--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--toggle--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--toggle--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--toggle--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--toggle--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--toggle--margin-right",
                "value": [],
                "variants": []
            },
            {
                "name": "--toggle--background",
                "value": [
                    {
                        "name": "--toggle--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--dark--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toggle--light--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--toggle--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toggle--width",
                "value": [
                    {
                        "name": "--toggle--sm--width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--md--width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--lg--width",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toggle--sm--width",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--toggle--md--width",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--toggle--lg--width",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toggle--height",
                "value": [
                    {
                        "name": "--toggle--sm--height",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--md--height",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--lg--height",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toggle--sm--height",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--toggle--md--height",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--toggle--lg--height",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toggle--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--toggle--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--toggle--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--toggle--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--toggle--indicator--background",
                "value": [
                    {
                        "name": "--toggle--light--indicator--background",
                        "value": [
                            {
                                "name": "--toggle--disabled--light--indicator--background",
                                "value": [],
                                "variants": []
                            }
                        ],
                        "variants": [
                            {
                                "name": "--toggle--disabled--light--indicator--background",
                                "value": [
                                    {
                                        "name": "--color-gray-50"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "--toggle--light--indicator--background",
                        "value": [
                            {
                                "name": "--toggle--disabled--light--indicator--background",
                                "value": [],
                                "variants": []
                            }
                        ],
                        "variants": [
                            {
                                "name": "--toggle--disabled--light--indicator--background",
                                "value": [
                                    {
                                        "name": "--color-gray-50"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "variants": [
                    {
                        "name": "--toggle--light--indicator--background",
                        "value": [
                            {
                                "name": "--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--toggle--light--indicator--background",
                        "value": [
                            {
                                "name": "--color-white"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toggle--indicator--width",
                "value": [
                    {
                        "name": "--toggle--sm--indicator--width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--md--indicator--width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--lg--indicator--width",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toggle--sm--indicator--width",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--toggle--md--indicator--width",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--toggle--lg--indicator--width",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toggle--indicator--height",
                "value": [
                    {
                        "name": "--toggle--sm--indicator--height",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--md--indicator--height",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toggle--lg--indicator--height",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toggle--sm--indicator--height",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--toggle--md--indicator--height",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--toggle--lg--indicator--height",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toggle--indicator--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--toggle--rounded--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--toggle--rounded--indicator--border-radius",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
