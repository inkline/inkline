export const manifest = {
    "name": "INavbar",
    "props": [
        {
            "name": "collapseOnItemClick",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Determines if the navbar should close when clicking a navbar item"
        },
        {
            "name": "collapseOnClickOutside",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Determines if the navbar should close when clicking outside"
        },
        {
            "name": "collapse",
            "type": [
                "Boolean",
                "String"
            ],
            "default": "'md'",
            "description": "Breakpoint to collapse the navbar at. If boolean value, sets to always or never collapse"
        },
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the navbar"
        },
        {
            "name": "fluid",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the inner container as fluid, spanning 100% width"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the navbar"
        },
        {
            "name": "menuAnimation",
            "type": [
                "close",
                "arrow-up",
                "arrow-down",
                "arrow-left",
                "arrow-right",
                "plus",
                "minus"
            ],
            "default": "close",
            "description": "The animation of the hamburger menu component used for collapsing"
        },
        {
            "name": "modelValue",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Used to manually control the collapsed state of the navbar"
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
            "description": "Slot for default navbar content "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--navbar--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--collapsed--margin-top",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--color",
                "value": [
                    {
                        "name": "--navbar--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--navbar--dark--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--navbar--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--navbar--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--navbar--background",
                "value": [
                    {
                        "name": "--navbar--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--navbar--dark--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--navbar--light--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--navbar--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--navbar--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--font-size",
                "value": [
                    {
                        "name": "--navbar--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--navbar--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--navbar--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--navbar--sm--font-size",
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
                        "name": "--navbar--md--font-size",
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
                        "name": "--navbar--lg--font-size",
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
                "name": "--navbar--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--item--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--item--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--item--font-size",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--item--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--background",
                "value": [
                    {
                        "name": "--navbar--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--navbar--dark--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--navbar--light--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--navbar--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--navbar--item--hover--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--item--hover--background",
                "value": [
                    {
                        "name": "--navbar--light--item--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--navbar--dark--item--hover--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--navbar--light--item--hover--background",
                        "value": [
                            {
                                "name": "--color-light-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--navbar--dark--item--hover--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--navbar--collapsed--background",
                "value": [
                    {
                        "name": "--navbar--light--collapsed--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--navbar--dark--collapsed--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--navbar--light--collapsed--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--navbar--dark--collapsed--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--navbar--collapsed--item--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--collapsed--item--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--collapsed--item--hover--color",
                "value": [],
                "variants": []
            },
            {
                "name": "--navbar--collapsed--item--hover--background",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
