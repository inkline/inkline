export const manifest = {
    "name": "IBadge",
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
            "description": "The color variant of the badge"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the badge"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for default badge content "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--badge--color",
                "value": [
                    {
                        "name": "--badge--primary--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--badge--secondary--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--badge--info--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--badge--success--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--badge--warning--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--badge--danger--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--badge--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--badge--dark--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--badge--primary--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--badge--secondary--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-secondary"
                            }
                        ]
                    },
                    {
                        "name": "--badge--info--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-info"
                            }
                        ]
                    },
                    {
                        "name": "--badge--success--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-success"
                            }
                        ]
                    },
                    {
                        "name": "--badge--warning--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-warning"
                            }
                        ]
                    },
                    {
                        "name": "--badge--danger--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-danger"
                            }
                        ]
                    },
                    {
                        "name": "--badge--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--badge--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--badge--background",
                "value": [
                    {
                        "name": "--badge--primary--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--badge--secondary--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--badge--info--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--badge--success--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--badge--warning--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--badge--danger--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--badge--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--badge--dark--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--badge--primary--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--badge--secondary--background",
                        "value": [
                            {
                                "name": "--color-secondary"
                            }
                        ]
                    },
                    {
                        "name": "--badge--info--background",
                        "value": [
                            {
                                "name": "--color-info"
                            }
                        ]
                    },
                    {
                        "name": "--badge--success--background",
                        "value": [
                            {
                                "name": "--color-success"
                            }
                        ]
                    },
                    {
                        "name": "--badge--warning--background",
                        "value": [
                            {
                                "name": "--color-warning"
                            }
                        ]
                    },
                    {
                        "name": "--badge--danger--background",
                        "value": [
                            {
                                "name": "--color-danger"
                            }
                        ]
                    },
                    {
                        "name": "--badge--light--background",
                        "value": [
                            {
                                "name": "--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--badge--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--badge--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--badge--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--badge--border-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--badge--border-radius",
                "value": [],
                "variants": []
            },
            {
                "name": "--badge--font-size",
                "value": [
                    {
                        "name": "--badge--sm--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--badge--md--font-size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--badge--lg--font-size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--badge--sm--font-size",
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
                        "name": "--badge--md--font-size",
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
                        "name": "--badge--lg--font-size",
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
                "name": "--badge--box-shadow",
                "value": [],
                "variants": []
            },
            {
                "name": "--badge--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--badge--font-weight",
                "value": [],
                "variants": []
            },
            {
                "name": "--badge--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--badge--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--badge--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--badge--link--hover--background",
                "value": [],
                "variants": []
            }
        ]
    }
};

export default manifest;
