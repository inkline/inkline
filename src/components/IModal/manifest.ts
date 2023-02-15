export const manifest = {
    "name": "IModal",
    "props": [
        {
            "name": "closeOnPressEscape",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Determines if the modal should close when pressing escape"
        },
        {
            "name": "closeAriaLabel",
            "type": [
                "String"
            ],
            "default": "Close",
            "description": "The aria-label attribute of the close button"
        },
        {
            "name": "color",
            "type": [
                "primary",
                "success",
                "light",
                "dark",
                "info",
                "success",
                "warning",
                "danger"
            ],
            "default": "",
            "description": "The color variant of the modal"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the modal"
        },
        {
            "name": "hideOnClickOutside",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Determines if the modal should close when clicking the overlay"
        },
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "uid()",
            "description": "The identifier of the modal"
        },
        {
            "name": "showClose",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Determines if the close icon should be visible in the modal header"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the modal"
        },
        {
            "name": "modelValue",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Used to determine if modal is visible or not"
        },
        {
            "name": "transition",
            "type": [
                "fade-in-transition",
                "fade-in-linear-transition",
                "zoom-in-top-transition",
                "zoom-in-bottom-transition",
                "zoom-in-center-transition",
                "zoom-in-left-transition",
                "zoom-in-right-transition"
            ],
            "default": "zoom-in-center-transition",
            "description": "The modal opening and closing animation"
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
            "name": "footer",
            "description": "Slot for modal header content "
        },
        {
            "name": "close",
            "description": "Close icon slot "
        },
        {
            "name": "default",
            "description": "Slot for modal body content "
        },
        {
            "name": "footer",
            "description": "Slot for modal footer content "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--modal--wrapper--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--line-height",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--width",
                "value": [
                    {
                        "name": "--modal--sm--width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--md--width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--lg--width",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--modal--sm--width",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--modal--md--width",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--modal--lg--width",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--modal--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--header--background",
                "value": [
                    {
                        "name": "--modal--primary--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--secondary--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--light--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--dark--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--info--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--success--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--warning--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--danger--header--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--modal--primary--header--background",
                        "value": [
                            {
                                "name": "--color-primary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--modal--secondary--header--background",
                        "value": [
                            {
                                "name": "--color-secondary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--modal--light--header--background",
                        "value": [
                            {
                                "name": "--color-gray-50"
                            }
                        ]
                    },
                    {
                        "name": "--modal--dark--header--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    },
                    {
                        "name": "--modal--info--header--background",
                        "value": [
                            {
                                "name": "--color-info-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--modal--success--header--background",
                        "value": [
                            {
                                "name": "--color-success-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--modal--warning--header--background",
                        "value": [
                            {
                                "name": "--color-warning-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--modal--danger--header--background",
                        "value": [
                            {
                                "name": "--color-danger-shade-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--modal--header--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--header--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--header--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--header--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--border-top-left-radius",
                "value": [
                    {
                        "name": "--modal--sm--border-top-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--md--border-top-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--lg--border-top-left-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--modal--sm--border-top-left-radius",
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
                        "name": "--modal--md--border-top-left-radius",
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
                        "name": "--modal--lg--border-top-left-radius",
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
                "name": "--modal--border-top-right-radius",
                "value": [
                    {
                        "name": "--modal--sm--border-top-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--md--border-top-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--lg--border-top-right-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--modal--sm--border-top-right-radius",
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
                        "name": "--modal--md--border-top-right-radius",
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
                        "name": "--modal--lg--border-top-right-radius",
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
                "name": "--modal--header--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--header--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--font-size",
                "value": [
                    {
                        "name": "--modal--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--modal--sm--font-size",
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
                        "name": "--modal--md--font-size",
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
                        "name": "--modal--lg--font-size",
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
                "name": "--modal--font-size",
                "value": [
                    {
                        "name": "--modal--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--modal--sm--font-size",
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
                        "name": "--modal--md--font-size",
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
                        "name": "--modal--lg--font-size",
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
                "name": "--modal--body--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--body--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--body--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--body--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--body--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--body--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--footer--background",
                "value": [
                    {
                        "name": "--modal--primary--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--secondary--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--light--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--dark--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--info--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--success--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--warning--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--danger--footer--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--modal--primary--footer--background",
                        "value": [
                            {
                                "name": "--color-primary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--modal--secondary--footer--background",
                        "value": [
                            {
                                "name": "--color-secondary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--modal--light--footer--background",
                        "value": [
                            {
                                "name": "--color-gray-50"
                            }
                        ]
                    },
                    {
                        "name": "--modal--dark--footer--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    },
                    {
                        "name": "--modal--info--footer--background",
                        "value": [
                            {
                                "name": "--color-info-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--modal--success--footer--background",
                        "value": [
                            {
                                "name": "--color-success-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--modal--warning--footer--background",
                        "value": [
                            {
                                "name": "--color-warning-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--modal--danger--footer--background",
                        "value": [
                            {
                                "name": "--color-danger-shade-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--modal--border-bottom-left-radius",
                "value": [
                    {
                        "name": "--modal--sm--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--md--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--lg--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--modal--sm--border-bottom-left-radius",
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
                        "name": "--modal--md--border-bottom-left-radius",
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
                        "name": "--modal--lg--border-bottom-left-radius",
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
                "name": "--modal--border-bottom-right-radius",
                "value": [
                    {
                        "name": "--modal--sm--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--md--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--modal--lg--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--modal--sm--border-bottom-right-radius",
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
                        "name": "--modal--md--border-bottom-right-radius",
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
                        "name": "--modal--lg--border-bottom-right-radius",
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
                "name": "--modal--footer--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--footer--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--footer--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--footer--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--modal--footer--padding",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
