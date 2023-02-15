export const manifest = {
    "name": "IButton",
    "props": [
        {
            "name": "active",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The active state of the button"
        },
        {
            "name": "block",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the button as a block, spanning the full container width"
        },
        {
            "name": "circle",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the button as a circle"
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
                "danger",
                "facebook",
                "google",
                "twitter",
                "github"
            ],
            "default": "",
            "description": "The color variant of the button"
        },
        {
            "name": "disabled",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The disabled state of the button"
        },
        {
            "name": "to",
            "type": [
                "String"
            ],
            "default": "undefined",
            "description": "Renders the component as an anchor link with a `href` attribute"
        },
        {
            "name": "link",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the button as a link"
        },
        {
            "name": "loading",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "The loading state of the button"
        },
        {
            "name": "outline",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the button as an outline button"
        },
        {
            "name": "tag",
            "type": [
                "String"
            ],
            "default": "button",
            "description": "Set the HTML tag to be used for rendering the button"
        },
        {
            "name": "tabindex",
            "type": [
                "Number",
                "String"
            ],
            "default": "0",
            "description": "The tabindex of the button"
        },
        {
            "name": "to",
            "type": [
                "String"
            ],
            "default": "undefined",
            "description": "Renders the component as a Router Link component with a `to` attribute"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the button"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "loading",
            "description": "Slot for button loading state "
        },
        {
            "name": "default",
            "description": "Slot for default button content "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--button--font-weight",
                "value": [],
                "variants": []
            },
            {
                "name": "--button--font-size",
                "value": [
                    {
                        "name": "--button--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--sm--font-size",
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
                        "name": "--button--md--font-size",
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
                        "name": "--button--lg--font-size",
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
                "name": "--button--line-height",
                "value": [],
                "variants": []
            },
            {
                "name": "--button--color",
                "value": [
                    {
                        "name": "--button--primary--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--secondary--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--dark--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--info--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--success--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--warning--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--danger--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--primary--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--button--secondary--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-secondary"
                            }
                        ]
                    },
                    {
                        "name": "--button--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--button--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    },
                    {
                        "name": "--button--info--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-info"
                            }
                        ]
                    },
                    {
                        "name": "--button--success--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-success"
                            }
                        ]
                    },
                    {
                        "name": "--button--warning--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-warning"
                            }
                        ]
                    },
                    {
                        "name": "--button--danger--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-danger"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--button--background",
                "value": [
                    {
                        "name": "--button--primary--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--secondary--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--dark--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--info--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--success--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--warning--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--danger--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--primary--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--button--secondary--background",
                        "value": [
                            {
                                "name": "--color-secondary"
                            }
                        ]
                    },
                    {
                        "name": "--button--light--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--button--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    },
                    {
                        "name": "--button--info--background",
                        "value": [
                            {
                                "name": "--color-info"
                            }
                        ]
                    },
                    {
                        "name": "--button--success--background",
                        "value": [
                            {
                                "name": "--color-success"
                            }
                        ]
                    },
                    {
                        "name": "--button--warning--background",
                        "value": [
                            {
                                "name": "--color-warning"
                            }
                        ]
                    },
                    {
                        "name": "--button--danger--background",
                        "value": [
                            {
                                "name": "--color-danger"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--button--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--button--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--button--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--button--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--button--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--button--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--button--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--button--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--button--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--button--hover--background",
                "value": [
                    {
                        "name": "--button--primary--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--secondary--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--light--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--dark--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--info--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--success--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--warning--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--danger--hover--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--primary--hover--background",
                        "value": [
                            {
                                "name": "--color-primary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--secondary--hover--background",
                        "value": [
                            {
                                "name": "--color-secondary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--light--hover--background",
                        "value": [
                            {
                                "name": "--color-light-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--dark--hover--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--info--hover--background",
                        "value": [
                            {
                                "name": "--color-info-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--success--hover--background",
                        "value": [
                            {
                                "name": "--color-success-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--warning--hover--background",
                        "value": [
                            {
                                "name": "--color-warning-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--danger--hover--background",
                        "value": [
                            {
                                "name": "--color-danger-shade-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--button--hover--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--button--color",
                "value": [
                    {
                        "name": "--button--primary--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--secondary--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--dark--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--info--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--success--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--warning--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--danger--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--primary--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--button--secondary--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-secondary"
                            }
                        ]
                    },
                    {
                        "name": "--button--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--button--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    },
                    {
                        "name": "--button--info--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-info"
                            }
                        ]
                    },
                    {
                        "name": "--button--success--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-success"
                            }
                        ]
                    },
                    {
                        "name": "--button--warning--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-warning"
                            }
                        ]
                    },
                    {
                        "name": "--button--danger--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-danger"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--button--active--background",
                "value": [
                    {
                        "name": "--button--primary--active--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--secondary--active--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--light--active--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--dark--active--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--info--active--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--success--active--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--warning--active--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--danger--active--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--primary--active--background",
                        "value": [
                            {
                                "name": "--color-primary-shade-100"
                            }
                        ]
                    },
                    {
                        "name": "--button--secondary--active--background",
                        "value": [
                            {
                                "name": "--color-secondary-shade-100"
                            }
                        ]
                    },
                    {
                        "name": "--button--light--active--background",
                        "value": [
                            {
                                "name": "--color-light-shade-100"
                            }
                        ]
                    },
                    {
                        "name": "--button--dark--active--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-100"
                            }
                        ]
                    },
                    {
                        "name": "--button--info--active--background",
                        "value": [
                            {
                                "name": "--color-info-shade-100"
                            }
                        ]
                    },
                    {
                        "name": "--button--success--active--background",
                        "value": [
                            {
                                "name": "--color-success-shade-100"
                            }
                        ]
                    },
                    {
                        "name": "--button--warning--active--background",
                        "value": [
                            {
                                "name": "--color-warning-shade-100"
                            }
                        ]
                    },
                    {
                        "name": "--button--danger--active--background",
                        "value": [
                            {
                                "name": "--color-danger-shade-100"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--button--disabled--opacity",
                "value": [],
                "variants": []
            },
            {
                "name": "--button--block--margin-top",
                "value": [],
                "variants": []
            },
            {
                "name": "--button--link--color",
                "value": [
                    {
                        "name": "--button--primary--link--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--secondary--link--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--light--link--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--dark--link--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--info--link--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--success--link--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--warning--link--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--danger--link--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--primary--link--color",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--button--secondary--link--color",
                        "value": [
                            {
                                "name": "--color-secondary"
                            }
                        ]
                    },
                    {
                        "name": "--button--light--link--color",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--button--dark--link--color",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    },
                    {
                        "name": "--button--info--link--color",
                        "value": [
                            {
                                "name": "--color-info"
                            }
                        ]
                    },
                    {
                        "name": "--button--success--link--color",
                        "value": [
                            {
                                "name": "--color-success"
                            }
                        ]
                    },
                    {
                        "name": "--button--warning--link--color",
                        "value": [
                            {
                                "name": "--color-warning"
                            }
                        ]
                    },
                    {
                        "name": "--button--danger--link--color",
                        "value": [
                            {
                                "name": "--color-danger"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--button--link--active--color",
                "value": [
                    {
                        "name": "--button--primary--link--active--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--secondary--link--active--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--light--link--active--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--dark--link--active--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--info--link--active--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--success--link--active--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--warning--link--active--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--danger--link--active--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--primary--link--active--color",
                        "value": [
                            {
                                "name": "--color-primary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--secondary--link--active--color",
                        "value": [
                            {
                                "name": "--color-secondary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--light--link--active--color",
                        "value": [
                            {
                                "name": "--color-light-shade-100"
                            }
                        ]
                    },
                    {
                        "name": "--button--dark--link--active--color",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--info--link--active--color",
                        "value": [
                            {
                                "name": "--color-info-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--success--link--active--color",
                        "value": [
                            {
                                "name": "--color-success-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--warning--link--active--color",
                        "value": [
                            {
                                "name": "--color-warning-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--danger--link--active--color",
                        "value": [
                            {
                                "name": "--color-danger-shade-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--button--background",
                "value": [
                    {
                        "name": "--button--primary--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--secondary--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--dark--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--info--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--success--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--warning--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--danger--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--primary--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--button--secondary--background",
                        "value": [
                            {
                                "name": "--color-secondary"
                            }
                        ]
                    },
                    {
                        "name": "--button--light--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--button--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    },
                    {
                        "name": "--button--info--background",
                        "value": [
                            {
                                "name": "--color-info"
                            }
                        ]
                    },
                    {
                        "name": "--button--success--background",
                        "value": [
                            {
                                "name": "--color-success"
                            }
                        ]
                    },
                    {
                        "name": "--button--warning--background",
                        "value": [
                            {
                                "name": "--color-warning"
                            }
                        ]
                    },
                    {
                        "name": "--button--danger--background",
                        "value": [
                            {
                                "name": "--color-danger"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--button--background",
                "value": [
                    {
                        "name": "--button--primary--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--secondary--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--dark--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--info--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--success--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--warning--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--danger--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--primary--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--button--secondary--background",
                        "value": [
                            {
                                "name": "--color-secondary"
                            }
                        ]
                    },
                    {
                        "name": "--button--light--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--button--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    },
                    {
                        "name": "--button--info--background",
                        "value": [
                            {
                                "name": "--color-info"
                            }
                        ]
                    },
                    {
                        "name": "--button--success--background",
                        "value": [
                            {
                                "name": "--color-success"
                            }
                        ]
                    },
                    {
                        "name": "--button--warning--background",
                        "value": [
                            {
                                "name": "--color-warning"
                            }
                        ]
                    },
                    {
                        "name": "--button--danger--background",
                        "value": [
                            {
                                "name": "--color-danger"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--button--hover--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--button--background",
                "value": [
                    {
                        "name": "--button--primary--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--secondary--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--dark--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--info--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--success--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--warning--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--danger--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--primary--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--button--secondary--background",
                        "value": [
                            {
                                "name": "--color-secondary"
                            }
                        ]
                    },
                    {
                        "name": "--button--light--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--button--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    },
                    {
                        "name": "--button--info--background",
                        "value": [
                            {
                                "name": "--color-info"
                            }
                        ]
                    },
                    {
                        "name": "--button--success--background",
                        "value": [
                            {
                                "name": "--color-success"
                            }
                        ]
                    },
                    {
                        "name": "--button--warning--background",
                        "value": [
                            {
                                "name": "--color-warning"
                            }
                        ]
                    },
                    {
                        "name": "--button--danger--background",
                        "value": [
                            {
                                "name": "--color-danger"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--button--color",
                "value": [
                    {
                        "name": "--button--primary--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--secondary--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--dark--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--info--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--success--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--warning--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--danger--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--primary--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--button--secondary--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-secondary"
                            }
                        ]
                    },
                    {
                        "name": "--button--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--button--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    },
                    {
                        "name": "--button--info--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-info"
                            }
                        ]
                    },
                    {
                        "name": "--button--success--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-success"
                            }
                        ]
                    },
                    {
                        "name": "--button--warning--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-warning"
                            }
                        ]
                    },
                    {
                        "name": "--button--danger--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-danger"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--button--circle--size",
                "value": [
                    {
                        "name": "--button--sm--circle--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--md--circle--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--lg--circle--size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--sm--circle--size",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--button--md--circle--size",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--button--lg--circle--size",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--button--circle--size",
                "value": [
                    {
                        "name": "--button--sm--circle--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--md--circle--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--lg--circle--size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--sm--circle--size",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--button--md--circle--size",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--button--lg--circle--size",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--button--font-size",
                "value": [
                    {
                        "name": "--button--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--sm--font-size",
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
                        "name": "--button--md--font-size",
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
                        "name": "--button--lg--font-size",
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
                "name": "--button--font-size",
                "value": [
                    {
                        "name": "--button--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--sm--font-size",
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
                        "name": "--button--md--font-size",
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
                        "name": "--button--lg--font-size",
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
                "name": "--button--color",
                "value": [
                    {
                        "name": "--button--primary--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--secondary--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--dark--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--info--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--success--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--warning--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--danger--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--primary--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--button--secondary--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-secondary"
                            }
                        ]
                    },
                    {
                        "name": "--button--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--button--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    },
                    {
                        "name": "--button--info--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-info"
                            }
                        ]
                    },
                    {
                        "name": "--button--success--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-success"
                            }
                        ]
                    },
                    {
                        "name": "--button--warning--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-warning"
                            }
                        ]
                    },
                    {
                        "name": "--button--danger--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-danger"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--button--hover--background",
                "value": [
                    {
                        "name": "--button--primary--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--secondary--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--light--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--dark--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--info--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--success--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--warning--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--danger--hover--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--primary--hover--background",
                        "value": [
                            {
                                "name": "--color-primary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--secondary--hover--background",
                        "value": [
                            {
                                "name": "--color-secondary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--light--hover--background",
                        "value": [
                            {
                                "name": "--color-light-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--dark--hover--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--info--hover--background",
                        "value": [
                            {
                                "name": "--color-info-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--success--hover--background",
                        "value": [
                            {
                                "name": "--color-success-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--warning--hover--background",
                        "value": [
                            {
                                "name": "--color-warning-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--danger--hover--background",
                        "value": [
                            {
                                "name": "--color-danger-shade-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--button--hover--background",
                "value": [
                    {
                        "name": "--button--primary--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--secondary--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--light--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--dark--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--info--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--success--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--warning--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--button--danger--hover--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--button--primary--hover--background",
                        "value": [
                            {
                                "name": "--color-primary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--secondary--hover--background",
                        "value": [
                            {
                                "name": "--color-secondary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--light--hover--background",
                        "value": [
                            {
                                "name": "--color-light-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--dark--hover--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--info--hover--background",
                        "value": [
                            {
                                "name": "--color-info-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--success--hover--background",
                        "value": [
                            {
                                "name": "--color-success-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--warning--hover--background",
                        "value": [
                            {
                                "name": "--color-warning-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--button--danger--hover--background",
                        "value": [
                            {
                                "name": "--color-danger-shade-50"
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
