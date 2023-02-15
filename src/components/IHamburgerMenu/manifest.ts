export const manifest = {
    "name": "IHamburgerMenu",
    "props": [
        {
            "name": "animation",
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
            "description": "The animation of the hamburger menu"
        },
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the hamburger menu"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the hamburger menu"
        },
        {
            "name": "modelValue",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Used to set the hamburger menu as opened or closed"
        }
    ],
    "events": [
        {
            "description": "Event emitted for setting the modelValue",
            "name": "update:modelValue"
        }
    ],
    "slots": [],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--hamburger-menu--opacity",
                "value": [],
                "variants": []
            },
            {
                "name": "--hamburger-menu--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--hamburger-menu--bar--width",
                "value": [
                    {
                        "name": "--hamburger-menu--sm--bar--width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--hamburger-menu--md--bar--width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--hamburger-menu--lg--bar--width",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--hamburger-menu--sm--bar--width",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--hamburger-menu--md--bar--width",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--hamburger-menu--lg--bar--width",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--hamburger-menu--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--hamburger-menu--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--hamburger-menu--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--hamburger-menu--hover--opacity",
                "value": [],
                "variants": []
            },
            {
                "name": "--hamburger-menu--bar--width",
                "value": [
                    {
                        "name": "--hamburger-menu--sm--bar--width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--hamburger-menu--md--bar--width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--hamburger-menu--lg--bar--width",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--hamburger-menu--sm--bar--width",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--hamburger-menu--md--bar--width",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--hamburger-menu--lg--bar--width",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--hamburger-menu--bar--height",
                "value": [
                    {
                        "name": "--hamburger-menu--sm--bar--height",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--hamburger-menu--md--bar--height",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--hamburger-menu--lg--bar--height",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--hamburger-menu--sm--bar--height",
                        "value": [
                            {
                                "value": "2px"
                            }
                        ]
                    },
                    {
                        "name": "--hamburger-menu--md--bar--height",
                        "value": [
                            {
                                "value": "3px"
                            }
                        ]
                    },
                    {
                        "name": "--hamburger-menu--lg--bar--height",
                        "value": [
                            {
                                "value": "4px"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--hamburger-menu--bar--border-radius",
                "value": [
                    {
                        "name": "--hamburger-menu--sm--bar--border-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--hamburger-menu--md--bar--border-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--hamburger-menu--lg--bar--border-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--hamburger-menu--sm--bar--border-radius",
                        "value": [
                            {
                                "value": "1px"
                            }
                        ]
                    },
                    {
                        "name": "--hamburger-menu--md--bar--border-radius",
                        "value": [
                            {
                                "value": "2px"
                            }
                        ]
                    },
                    {
                        "name": "--hamburger-menu--lg--bar--border-radius",
                        "value": [
                            {
                                "value": "3px"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--hamburger-menu--background",
                "value": [
                    {
                        "name": "--hamburger-menu--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--hamburger-menu--dark--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--hamburger-menu--light--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    },
                    {
                        "name": "--hamburger-menu--dark--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--hamburger-menu--bar--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--hamburger-menu--bar--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--hamburger-menu--bar--transition-timing-function",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
