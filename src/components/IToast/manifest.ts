export const manifest = {
    "name": "IToast",
    "props": [
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the toast"
        },
        {
            "name": "color",
            "type": [
                "light",
                "dark",
                "info",
                "success",
                "warning",
                "danger"
            ],
            "default": "light",
            "description": "The color variant of the toast"
        },
        {
            "name": "duration",
            "type": [
                "Number"
            ],
            "default": "0",
            "description": "The duration of the toast, in milliseconds. A duration of 0 will show the toast indefinitely."
        },
        {
            "name": "duration",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Show progress bar for the duration of the toast"
        },
        {
            "name": "icon",
            "type": [
                "string",
                "VNode",
                "VNode[]"
            ],
            "default": "undefined",
            "description": "The icon to be rendered in the toast"
        },
        {
            "name": "title",
            "type": [
                "string",
                "VNode",
                "VNode[]"
            ],
            "default": "undefined",
            "description": "The title to be rendered in the toast"
        },
        {
            "name": "message",
            "type": [
                "string",
                "VNode",
                "VNode[]"
            ],
            "default": "undefined",
            "description": "The message to be rendered in the toast"
        },
        {
            "name": "modelValue",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Used to show or hide a dismissible toast"
        },
        {
            "name": "dismissible",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Shows a dismiss icon on the toast"
        },
        {
            "name": "dismissAriaLabel",
            "type": [
                "String"
            ],
            "default": "Dismiss",
            "description": "The aria-label to use for the dismiss button"
        }
    ],
    "events": [
        {
            "description": "Event emitted when the toast is dismissed",
            "name": "dismiss"
        }
    ],
    "slots": [
        {
            "name": "icon",
            "description": "Slot for toast icon "
        },
        {
            "name": "title",
            "description": "Slot for toast title "
        },
        {
            "name": "default",
            "description": "Slot for default toast content "
        },
        {
            "name": "dismiss",
            "description": "Slot for toast dismiss button "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--toast--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--font-size",
                "value": [
                    {
                        "name": "--toast--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toast--sm--font-size",
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
                        "name": "--toast--md--font-size",
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
                        "name": "--toast--lg--font-size",
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
                "name": "--toast--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--background",
                "value": [
                    {
                        "name": "--toast--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--dark--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--info--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--success--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--warning--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--danger--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toast--light--background",
                        "value": [
                            {
                                "name": "--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--toast--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    },
                    {
                        "name": "--toast--info--background",
                        "value": [
                            {
                                "name": "--color-info-100"
                            }
                        ]
                    },
                    {
                        "name": "--toast--success--background",
                        "value": [
                            {
                                "name": "--color-success-100"
                            }
                        ]
                    },
                    {
                        "name": "--toast--warning--background",
                        "value": [
                            {
                                "name": "--color-warning-100"
                            }
                        ]
                    },
                    {
                        "name": "--toast--danger--background",
                        "value": [
                            {
                                "name": "--color-danger-100"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toast--color",
                "value": [
                    {
                        "name": "--toast--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--dark--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--info--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--success--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--warning--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--danger--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toast--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--toast--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    },
                    {
                        "name": "--toast--info--color",
                        "value": [
                            {
                                "name": "--color-info-800"
                            }
                        ]
                    },
                    {
                        "name": "--toast--success--color",
                        "value": [
                            {
                                "name": "--color-success-800"
                            }
                        ]
                    },
                    {
                        "name": "--toast--warning--color",
                        "value": [
                            {
                                "name": "--color-warning-800"
                            }
                        ]
                    },
                    {
                        "name": "--toast--danger--color",
                        "value": [
                            {
                                "name": "--color-danger-800"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toast--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--link--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--link--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--link-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--code--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--code--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--title--font-weight",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--padding-left",
                "value": [
                    {
                        "name": "--toast--sm--padding-left",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--md--padding-left",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--lg--padding-left",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toast--sm--padding-left",
                        "value": [
                            {
                                "name": "--padding-left"
                            },
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--toast--md--padding-left",
                        "value": [
                            {
                                "name": "--padding-left"
                            },
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--toast--lg--padding-left",
                        "value": [
                            {
                                "name": "--padding-left"
                            },
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toast--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--padding-left",
                "value": [
                    {
                        "name": "--toast--sm--padding-left",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--md--padding-left",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--lg--padding-left",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toast--sm--padding-left",
                        "value": [
                            {
                                "name": "--padding-left"
                            },
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--toast--md--padding-left",
                        "value": [
                            {
                                "name": "--padding-left"
                            },
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--toast--lg--padding-left",
                        "value": [
                            {
                                "name": "--padding-left"
                            },
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toast--progress--height",
                "value": [],
                "variants": []
            },
            {
                "name": "--toast--progress--background",
                "value": [
                    {
                        "name": "--toast--light--progress--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--dark--progress--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--info--progress--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--success--progress--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--warning--progress--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--danger--progress--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toast--light--progress--background",
                        "value": [
                            {
                                "value": "rgba(0, 0, 0, 0.05)"
                            }
                        ]
                    },
                    {
                        "name": "--toast--dark--progress--background",
                        "value": [
                            {
                                "value": "rgba(255, 255, 255, 0.05)"
                            }
                        ]
                    },
                    {
                        "name": "--toast--info--progress--background",
                        "value": [
                            {
                                "value": "rgba(0, 0, 0, 0.05)"
                            }
                        ]
                    },
                    {
                        "name": "--toast--success--progress--background",
                        "value": [
                            {
                                "value": "rgba(0, 0, 0, 0.05)"
                            }
                        ]
                    },
                    {
                        "name": "--toast--warning--progress--background",
                        "value": [
                            {
                                "value": "rgba(0, 0, 0, 0.05)"
                            }
                        ]
                    },
                    {
                        "name": "--toast--danger--progress--background",
                        "value": [
                            {
                                "value": "rgba(0, 0, 0, 0.05)"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--toast--progress-bar--background",
                "value": [
                    {
                        "name": "--toast--light--progress-bar--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--dark--progress-bar--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--info--progress-bar--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--success--progress-bar--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--warning--progress-bar--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--toast--danger--progress-bar--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--toast--light--progress-bar--background",
                        "value": [
                            {
                                "value": "rgba(0, 0, 0, 0.15)"
                            }
                        ]
                    },
                    {
                        "name": "--toast--dark--progress-bar--background",
                        "value": [
                            {
                                "value": "rgba(255, 255, 255, 0.15)"
                            }
                        ]
                    },
                    {
                        "name": "--toast--info--progress-bar--background",
                        "value": [
                            {
                                "value": "rgba(0, 0, 0, 0.15)"
                            }
                        ]
                    },
                    {
                        "name": "--toast--success--progress-bar--background",
                        "value": [
                            {
                                "value": "rgba(0, 0, 0, 0.15)"
                            }
                        ]
                    },
                    {
                        "name": "--toast--warning--progress-bar--background",
                        "value": [
                            {
                                "value": "rgba(0, 0, 0, 0.15)"
                            }
                        ]
                    },
                    {
                        "name": "--toast--danger--progress-bar--background",
                        "value": [
                            {
                                "value": "rgba(0, 0, 0, 0.15)"
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
