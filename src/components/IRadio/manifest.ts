export const manifest = {
    "name": "IRadio",
    "props": [
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the radio"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the radio"
        },
        {
            "name": "error",
            "type": [
                "Boolean",
                "Array"
            ],
            "default": "'touched', 'dirty', 'invalid'",
            "description": "The error state of the radio, computed based on schema by default."
        },
        {
            "name": "value",
            "type": [],
            "default": "false",
            "description": "Used to set the radio value when used inside a radio group"
        },
        {
            "name": "modelValue",
            "type": [],
            "default": "false",
            "description": "Used to set the radio value when used by itself"
        },
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "uid()",
            "description": "The unique identifier of the radio"
        },
        {
            "name": "native",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Displays the native browser radio input indicator"
        },
        {
            "name": "readonly",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The readonly state of the radio"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the radio"
        },
        {
            "name": "tabindex",
            "type": [
                "Number",
                "String"
            ],
            "default": "0",
            "description": "The tabindex of the radio"
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
            "description": "Slot for default radio label "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--radio--margin-right",
                "value": [],
                "variants": []
            },
            {
                "name": "--radio--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--radio--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--radio--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--radio--label--color",
                "value": [
                    {
                        "name": "--radio--light--label--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--dark--label--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--radio--light--label--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--radio--dark--label--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--radio--label--font-size",
                "value": [
                    {
                        "name": "--radio--sm--label--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--md--label--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--lg--label--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--radio--sm--label--font-size",
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
                        "name": "--radio--md--label--font-size",
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
                        "name": "--radio--lg--label--font-size",
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
                "name": "--radio--size",
                "value": [
                    {
                        "name": "--radio--sm--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--md--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--lg--size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--radio--sm--size",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--radio--md--size",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--radio--lg--size",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--radio--size",
                "value": [
                    {
                        "name": "--radio--sm--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--md--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--lg--size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--radio--sm--size",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--radio--md--size",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--radio--lg--size",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--radio--border-color",
                "value": [
                    {
                        "name": "--radio--light--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--dark--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--radio--light--border-color",
                        "value": [
                            {
                                "name": "--color-light-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--radio--dark--border-color",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--radio--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--radio--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--radio--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--radio--margin-right",
                "value": [],
                "variants": []
            },
            {
                "name": "--radio--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--radio--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--radio--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--radio--background",
                "value": [
                    {
                        "name": "--radio--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--dark--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--radio--light--background",
                        "value": [
                            {
                                "name": "--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--radio--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--radio--color",
                "value": [
                    {
                        "name": "--radio--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--light--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--radio--light--color",
                        "value": [
                            {
                                "name": "--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--radio--light--color",
                        "value": [
                            {
                                "name": "--color-white"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--radio--checkmark--size",
                "value": [
                    {
                        "name": "--radio--sm--checkmark--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--md--checkmark--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--lg--checkmark--size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--radio--sm--checkmark--size",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--radio--md--checkmark--size",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--radio--lg--checkmark--size",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--radio--checkmark--size",
                "value": [
                    {
                        "name": "--radio--sm--checkmark--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--md--checkmark--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--lg--checkmark--size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--radio--sm--checkmark--size",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--radio--md--checkmark--size",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--radio--lg--checkmark--size",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--radio--checked--border-color",
                "value": [
                    {
                        "name": "--radio--light--checked--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--dark--checked--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--radio--light--checked--border-color",
                        "value": [
                            {
                                "name": "--color-primary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--radio--dark--checked--border-color",
                        "value": [
                            {
                                "name": "--color-primary-lighten-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--radio--checked--background",
                "value": [
                    {
                        "name": "--radio--light--checked--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--dark--checked--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--radio--light--checked--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--radio--dark--checked--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--radio--disabled--label--color",
                "value": [
                    {
                        "name": "--radio--light--disabled--label--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--dark--disabled--label--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--radio--light--disabled--label--color",
                        "value": [
                            {
                                "name": "--color-light-700"
                            }
                        ]
                    },
                    {
                        "name": "--radio--dark--disabled--label--color",
                        "value": [
                            {
                                "name": "--color-dark-300"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--radio--checked--disabled--border-color",
                "value": [
                    {
                        "name": "--radio--light--checked--disabled--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--dark--checked--disabled--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--radio--light--checked--disabled--border-color",
                        "value": [
                            {
                                "name": "--color-primary-300"
                            }
                        ]
                    },
                    {
                        "name": "--radio--dark--checked--disabled--border-color",
                        "value": [
                            {
                                "name": "--color-primary-700"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--radio--checked--disabled--background",
                "value": [
                    {
                        "name": "--radio--light--checked--disabled--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--dark--checked--disabled--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--radio--light--checked--disabled--background",
                        "value": [
                            {
                                "name": "--color-primary-200"
                            }
                        ]
                    },
                    {
                        "name": "--radio--dark--checked--disabled--background",
                        "value": [
                            {
                                "name": "--color-primary-700"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--radio--disabled--color",
                "value": [
                    {
                        "name": "--radio--light--disabled--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--radio--dark--disabled--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--radio--light--disabled--color",
                        "value": [
                            {
                                "name": "--color-light-200"
                            }
                        ]
                    },
                    {
                        "name": "--radio--dark--disabled--color",
                        "value": [
                            {
                                "name": "--color-dark-200"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--radio--margin-right",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
