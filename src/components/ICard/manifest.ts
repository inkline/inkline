export const manifest = {
    "name": "ICard",
    "props": [
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
            "description": "The color variant of the card"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the card"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "header",
            "description": "Slot for card header content "
        },
        {
            "name": "image",
            "description": "Slot for card image "
        },
        {
            "name": "default",
            "description": "Slot for card header content "
        },
        {
            "name": "footer",
            "description": "Slot for card footer content "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--card--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--font-size",
                "value": [
                    {
                        "name": "--card--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--card--sm--font-size",
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
                        "name": "--card--md--font-size",
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
                        "name": "--card--lg--font-size",
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
                "name": "--card--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--header--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--header--background",
                "value": [
                    {
                        "name": "--card--primary--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--secondary--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--light--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--dark--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--info--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--success--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--warning--header--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--danger--header--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--card--primary--header--background",
                        "value": [
                            {
                                "name": "--color-primary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--card--secondary--header--background",
                        "value": [
                            {
                                "name": "--color-secondary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--card--light--header--background",
                        "value": [
                            {
                                "name": "--color-light-250"
                            }
                        ]
                    },
                    {
                        "name": "--card--dark--header--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    },
                    {
                        "name": "--card--info--header--background",
                        "value": [
                            {
                                "name": "--color-info-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--card--success--header--background",
                        "value": [
                            {
                                "name": "--color-success-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--card--warning--header--background",
                        "value": [
                            {
                                "name": "--color-warning-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--card--danger--header--background",
                        "value": [
                            {
                                "name": "--color-danger-shade-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--card--header--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--header--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--header--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--header--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--header--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--header--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--header--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--header--border-top-left-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--header--border-top-right-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--body--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--body--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--body--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--body--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--body--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--body--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--body--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--body--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--body--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--body--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--footer--background",
                "value": [
                    {
                        "name": "--card--primary--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--secondary--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--light--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--dark--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--info--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--success--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--warning--footer--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--danger--footer--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--card--primary--footer--background",
                        "value": [
                            {
                                "name": "--color-primary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--card--secondary--footer--background",
                        "value": [
                            {
                                "name": "--color-secondary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--card--light--footer--background",
                        "value": [
                            {
                                "name": "--color-light-250"
                            }
                        ]
                    },
                    {
                        "name": "--card--dark--footer--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    },
                    {
                        "name": "--card--info--footer--background",
                        "value": [
                            {
                                "name": "--color-info-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--card--success--footer--background",
                        "value": [
                            {
                                "name": "--color-success-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--card--warning--footer--background",
                        "value": [
                            {
                                "name": "--color-warning-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--card--danger--footer--background",
                        "value": [
                            {
                                "name": "--color-danger-shade-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--card--footer--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--footer--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--footer--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--footer--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--footer--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--footer--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--footer--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--footer--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--footer--border-bottom-left-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--footer--border-bottom-right-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--img--border-top-left-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--img--border-top-right-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--border-bottom-left-radius",
                "value": [
                    {
                        "name": "--card--sm--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--md--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--lg--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--card--sm--border-bottom-left-radius",
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
                        "name": "--card--md--border-bottom-left-radius",
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
                        "name": "--card--lg--border-bottom-left-radius",
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
                "name": "--card--border-bottom-right-radius",
                "value": [
                    {
                        "name": "--card--sm--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--md--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--card--lg--border-bottom-right-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--card--sm--border-bottom-right-radius",
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
                        "name": "--card--md--border-bottom-right-radius",
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
                        "name": "--card--lg--border-bottom-right-radius",
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
                "name": "--card--list-group--border-top-left-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--list-group--border-top-right-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--list-group--border-bottom-left-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--card--list-group--border-bottom-right-radius",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
