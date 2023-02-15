export const manifest = {
    "name": "IPagination",
    "props": [
        {
            "name": "ariaLabel",
            "type": [
                "String"
            ],
            "default": "Pagination",
            "description": "The aria-label of the pagination"
        },
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the pagination"
        },
        {
            "name": "itemsPerPage",
            "type": [
                "Number"
            ],
            "default": "20",
            "description": "The number of items per page to be displayed"
        },
        {
            "name": "itemsTotal",
            "type": [
                "Number"
            ],
            "default": "0",
            "description": "The total number of items"
        },
        {
            "name": "limit",
            "type": [
                "Number",
                "Object"
            ],
            "default": "",
            "description": "The maximum number of pagination buttons to show on each breakpoint"
        },
        {
            "name": "quickLink",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the quick link buttons"
        },
        {
            "name": "modelValue",
            "type": [
                "Number"
            ],
            "default": "1",
            "description": "Used to determine the current page"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the pagination"
        },
        {
            "name": "showNavigationWhenDisabled",
            "type": [
                "boolean"
            ],
            "default": "true",
            "description": "Show or hide navigation buttons for first or last page"
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
            "name": "previous",
            "description": "Slot for previous button content "
        },
        {
            "name": "next",
            "description": "Slot for next button content "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--pagination--font-size",
                "value": [
                    {
                        "name": "--pagination--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--pagination--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--pagination--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--pagination--sm--font-size",
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
                        "name": "--pagination--md--font-size",
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
                        "name": "--pagination--lg--font-size",
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
                "name": "--pagination--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--pagination--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--pagination--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--pagination--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--pagination--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--pagination--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--pagination--min-width",
                "value": [
                    {
                        "name": "--pagination--sm--min-width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--pagination--md--min-width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--pagination--lg--min-width",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--pagination--sm--min-width",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--pagination--md--min-width",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--pagination--lg--min-width",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--pagination--color",
                "value": [
                    {
                        "name": "--pagination--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--pagination--dark--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--pagination--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--pagination--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--pagination--background",
                "value": [
                    {
                        "name": "--pagination--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--pagination--dark--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--pagination--light--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--pagination--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--pagination--margin",
                "value": [],
                "variants": []
            },
            {
                "name": "--pagination--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--pagination--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--pagination--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--pagination--hover--background",
                "value": [
                    {
                        "name": "--pagination--light--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--pagination--dark--hover--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--pagination--light--hover--background",
                        "value": [
                            {
                                "name": "--color-light-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--pagination--dark--hover--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--pagination--active--background",
                "value": [
                    {
                        "name": "--pagination--light--active--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--pagination--dark--active--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--pagination--light--active--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--pagination--dark--active--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--pagination--active--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--pagination--active--color",
                "value": [
                    {
                        "name": "--pagination--light--active--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--pagination--dark--active--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--pagination--light--active--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--pagination--dark--active--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-primary"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--pagination--active--background",
                "value": [
                    {
                        "name": "--pagination--light--active--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--pagination--dark--active--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--pagination--light--active--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--pagination--dark--active--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--pagination--disabled--color",
                "value": [
                    {
                        "name": "--pagination--light--disabled--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--pagination--dark--disabled--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--pagination--light--disabled--color",
                        "value": [
                            {
                                "name": "--text--color-muted"
                            }
                        ]
                    },
                    {
                        "name": "--pagination--dark--disabled--color",
                        "value": [
                            {
                                "name": "--text--color-muted"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--pagination--disabled--opacity",
                "value": [],
                "variants": []
            },
            {
                "name": "--pagination--quick--disabled--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--pagination--quick--disabled--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--pagination--quick--disabled--opacity",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
