export const manifest = {
    "name": "ISidebar",
    "props": [
        {
            "name": "ariaLabel",
            "type": [
                "String"
            ],
            "default": "Sidebar",
            "description": "The aria-label of the sidebar"
        },
        {
            "name": "collapse",
            "type": [
                "Boolean",
                "String"
            ],
            "default": "'md'",
            "description": "Breakpoint to collapse the sidebar at. If boolean value, sets to always or never collapse"
        },
        {
            "name": "collapseOnItemClick",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Determines if the sidebar should close when clicking a sidebar item"
        },
        {
            "name": "collapseOnClickOutside",
            "type": [
                "Boolean"
            ],
            "default": "true",
            "description": "Determines if the sidebar should close when clicking outside, on the overlay"
        },
        {
            "name": "collapsePosition",
            "type": [
                "fixed",
                "absolute",
                "relative"
            ],
            "default": "absolute",
            "description": "The collapse position of the sidebar"
        },
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the sidebar"
        },
        {
            "name": "placement",
            "type": [
                "left",
                "right"
            ],
            "default": "left",
            "description": "The placement of the sidebar"
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
            "name": "modelValue",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Used to manually control the collapsed state of the sidebar"
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
            "description": "Slot for sidebar content "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--sidebar--z-index",
                "value": [],
                "variants": []
            },
            {
                "name": "--sidebar--width",
                "value": [
                    {
                        "name": "--sidebar--sm--width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--sidebar--md--width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--sidebar--lg--width",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--sidebar--sm--width",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--sidebar--md--width",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--sidebar--lg--width",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--sidebar--color",
                "value": [
                    {
                        "name": "--sidebar--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--sidebar--dark--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--sidebar--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--sidebar--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--sidebar--background",
                "value": [
                    {
                        "name": "--sidebar--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--sidebar--dark--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--sidebar--light--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--sidebar--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--sidebar--width",
                "value": [
                    {
                        "name": "--sidebar--sm--width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--sidebar--md--width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--sidebar--lg--width",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--sidebar--sm--width",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--sidebar--md--width",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--sidebar--lg--width",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--sidebar--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--sidebar--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--sidebar--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--sidebar--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--sidebar--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--sidebar--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--sidebar--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--sidebar--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--sidebar--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--sidebar--overlay--background",
                "value": [],
                "variants": []
            },
            {
                "name": "--sidebar--border-top-left-radius",
                "value": [
                    {
                        "name": "--sidebar--sm--border-top-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--sidebar--md--border-top-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--sidebar--lg--border-top-left-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--sidebar--sm--border-top-left-radius",
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
                        "name": "--sidebar--md--border-top-left-radius",
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
                        "name": "--sidebar--lg--border-top-left-radius",
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
                "name": "--sidebar--border-bottom-left-radius",
                "value": [
                    {
                        "name": "--sidebar--sm--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--sidebar--md--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--sidebar--lg--border-bottom-left-radius",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--sidebar--sm--border-bottom-left-radius",
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
                        "name": "--sidebar--md--border-bottom-left-radius",
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
                        "name": "--sidebar--lg--border-bottom-left-radius",
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
                "name": "--sidebar--width",
                "value": [
                    {
                        "name": "--sidebar--sm--width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--sidebar--md--width",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--sidebar--lg--width",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--sidebar--sm--width",
                        "value": [
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--sidebar--md--width",
                        "value": [
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--sidebar--lg--width",
                        "value": [
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
