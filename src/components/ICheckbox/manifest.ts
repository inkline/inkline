export const manifest = {
    "name": "ICheckbox",
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
            "description": "Enable checkbox validation using schema"
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
            "description": "Slot for default checkbox label "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--checkbox--margin-right",
                "value": [],
                "variants": []
            },
            {
                "name": "--checkbox--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--checkbox--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--checkbox--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--checkbox--label--color",
                "value": [
                    {
                        "name": "--checkbox--light--label--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--dark--label--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--checkbox--light--label--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--dark--label--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--checkbox--label--font-size",
                "value": [
                    {
                        "name": "--checkbox--sm--label--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--md--label--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--lg--label--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--checkbox--sm--label--font-size",
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
                        "name": "--checkbox--md--label--font-size",
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
                        "name": "--checkbox--lg--label--font-size",
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
                "name": "--checkbox--size",
                "value": [
                    {
                        "name": "--checkbox--sm--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--md--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--lg--size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--checkbox--sm--size",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--md--size",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--lg--size",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--checkbox--size",
                "value": [
                    {
                        "name": "--checkbox--sm--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--md--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--lg--size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--checkbox--sm--size",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--md--size",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--lg--size",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--checkbox--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--checkbox--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--checkbox--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--checkbox--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--checkbox--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--checkbox--margin-right",
                "value": [],
                "variants": []
            },
            {
                "name": "--checkbox--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--checkbox--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--checkbox--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--checkbox--background",
                "value": [
                    {
                        "name": "--checkbox--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--dark--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--checkbox--light--background",
                        "value": [
                            {
                                "name": "--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--checkbox--checkmark--size",
                "value": [
                    {
                        "name": "--checkbox--sm--checkmark--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--md--checkmark--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--lg--checkmark--size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--checkbox--sm--checkmark--size",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--md--checkmark--size",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--lg--checkmark--size",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--checkbox--checkmark--size",
                "value": [
                    {
                        "name": "--checkbox--sm--checkmark--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--md--checkmark--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--lg--checkmark--size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--checkbox--sm--checkmark--size",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--md--checkmark--size",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--lg--checkmark--size",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--checkbox--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--checkbox--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--checkbox--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--checkbox--color",
                "value": [
                    {
                        "name": "--checkbox--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--dark--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--checkbox--light--color",
                        "value": [
                            {
                                "name": "--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--dark--color",
                        "value": [
                            {
                                "name": "--color-white"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--checkbox--checked--border-color",
                "value": [
                    {
                        "name": "--checkbox--light--checked--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--dark--checked--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--checkbox--light--checked--border-color",
                        "value": [
                            {
                                "name": "--color-primary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--dark--checked--border-color",
                        "value": [
                            {
                                "name": "--color-primary-tint-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--checkbox--checked--background",
                "value": [
                    {
                        "name": "--checkbox--light--checked--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--dark--checked--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--checkbox--light--checked--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--dark--checked--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--checkbox--disabled--label--color",
                "value": [
                    {
                        "name": "--checkbox--light--disabled--label--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--dark--disabled--label--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--checkbox--light--disabled--label--color",
                        "value": [
                            {
                                "name": "--text--color-muted"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--dark--disabled--label--color",
                        "value": [
                            {
                                "name": "--text--color-muted"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--checkbox--disabled--border-color",
                "value": [
                    {
                        "name": "--checkbox--light--disabled--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--dark--disabled--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--checkbox--light--disabled--border-color",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--dark--disabled--border-color",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--checkbox--disabled--background",
                "value": [
                    {
                        "name": "--checkbox--light--disabled--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--dark--disabled--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--checkbox--light--disabled--background",
                        "value": [
                            {
                                "name": "--color-gray-50"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--dark--disabled--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-100"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--checkbox--checked--disabled--border-color",
                "value": [
                    {
                        "name": "--checkbox--light--checked--disabled--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--dark--checked--disabled--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--checkbox--light--checked--disabled--border-color",
                        "value": [
                            {
                                "name": "--color-primary-400"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--dark--checked--disabled--border-color",
                        "value": [
                            {
                                "name": "--color-primary-700"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--checkbox--checked--disabled--background",
                "value": [
                    {
                        "name": "--checkbox--light--checked--disabled--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--dark--checked--disabled--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--checkbox--light--checked--disabled--background",
                        "value": [
                            {
                                "name": "--color-primary-300"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--dark--checked--disabled--background",
                        "value": [
                            {
                                "name": "--color-primary-800"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--checkbox--disabled--color",
                "value": [
                    {
                        "name": "--checkbox--light--disabled--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--checkbox--dark--disabled--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--checkbox--light--disabled--color",
                        "value": [
                            {
                                "name": "--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--checkbox--dark--disabled--color",
                        "value": [
                            {
                                "name": "--color-white"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--checkbox--margin-right",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
