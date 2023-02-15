export const manifest = {
    "name": "ITable",
    "props": [
        {
            "name": "border",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the table with borders"
        },
        {
            "name": "condensed",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the table rows as condensed"
        },
        {
            "name": "striped",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the table rows as alternating stripes"
        },
        {
            "name": "hover",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Set the table rows as hoverable"
        },
        {
            "name": "responsive",
            "type": [
                "Boolean",
                "xs",
                "sm",
                "md",
                "lg",
                "xl",
                "xxl"
            ],
            "default": "false",
            "description": "Set the table to be responsive, enabling horizontal scroll when overflowing the parent container"
        },
        {
            "name": "nowrap",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the table rows without wrapping white-space"
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
            "description": "The color variant of the table"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for table rows and data "
        }
    ],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--table--margin-bottom",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--border-color",
                "value": [
                    {
                        "name": "--table--primary--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--secondary--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--light--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--dark--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--info--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--success--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--warning--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--danger--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--table--primary--border-color",
                        "value": [
                            {
                                "name": "--color-primary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--secondary--border-color",
                        "value": [
                            {
                                "name": "--color-secondary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--light--border-color",
                        "value": [
                            {
                                "name": "--color-gray-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--dark--border-color",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--info--border-color",
                        "value": [
                            {
                                "name": "--color-info-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--success--border-color",
                        "value": [
                            {
                                "name": "--color-success-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--warning--border-color",
                        "value": [
                            {
                                "name": "--color-warning-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--danger--border-color",
                        "value": [
                            {
                                "name": "--color-danger-shade-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--table--color",
                "value": [
                    {
                        "name": "--table--primary--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--secondary--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--light--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--dark--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--info--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--success--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--warning--color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--danger--color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--table--primary--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--table--secondary--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-secondary"
                            }
                        ]
                    },
                    {
                        "name": "--table--light--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-light"
                            }
                        ]
                    },
                    {
                        "name": "--table--dark--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-dark"
                            }
                        ]
                    },
                    {
                        "name": "--table--info--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-info"
                            }
                        ]
                    },
                    {
                        "name": "--table--success--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-success"
                            }
                        ]
                    },
                    {
                        "name": "--table--warning--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-warning"
                            }
                        ]
                    },
                    {
                        "name": "--table--danger--color",
                        "value": [
                            {
                                "name": "--contrast-text--color-danger"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--table--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--border-color",
                "value": [
                    {
                        "name": "--table--primary--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--secondary--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--light--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--dark--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--info--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--success--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--warning--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--danger--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--table--primary--border-color",
                        "value": [
                            {
                                "name": "--color-primary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--secondary--border-color",
                        "value": [
                            {
                                "name": "--color-secondary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--light--border-color",
                        "value": [
                            {
                                "name": "--color-gray-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--dark--border-color",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--info--border-color",
                        "value": [
                            {
                                "name": "--color-info-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--success--border-color",
                        "value": [
                            {
                                "name": "--color-success-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--warning--border-color",
                        "value": [
                            {
                                "name": "--color-warning-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--danger--border-color",
                        "value": [
                            {
                                "name": "--color-danger-shade-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--table--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--background",
                "value": [
                    {
                        "name": "--table--primary--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--secondary--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--light--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--dark--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--info--background",
                        "value": [
                            {
                                "name": "--table--hover--info--background",
                                "value": [],
                                "variants": []
                            }
                        ],
                        "variants": [
                            {
                                "name": "--table--hover--info--background",
                                "value": [
                                    {
                                        "name": "--color-info-shade-100"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "--table--success--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--warning--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--danger--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--table--primary--background",
                        "value": [
                            {
                                "name": "--color-primary"
                            }
                        ]
                    },
                    {
                        "name": "--table--secondary--background",
                        "value": [
                            {
                                "name": "--color-secondary"
                            }
                        ]
                    },
                    {
                        "name": "--table--light--background",
                        "value": [
                            {
                                "name": "--color-white"
                            }
                        ]
                    },
                    {
                        "name": "--table--dark--background",
                        "value": [
                            {
                                "name": "--color-dark"
                            }
                        ]
                    },
                    {
                        "name": "--table--info--background",
                        "value": [
                            {
                                "name": "--color-info"
                            }
                        ]
                    },
                    {
                        "name": "--table--success--background",
                        "value": [
                            {
                                "name": "--color-success"
                            }
                        ]
                    },
                    {
                        "name": "--table--warning--background",
                        "value": [
                            {
                                "name": "--color-warning"
                            }
                        ]
                    },
                    {
                        "name": "--table--danger--background",
                        "value": [
                            {
                                "name": "--color-danger"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--table--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--thead--th--border-bottom-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--tbody--adjacent--border-top-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--tbody--adjacent--border-top-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--tbody--adjacent--border-top-color",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--border-color",
                "value": [
                    {
                        "name": "--table--primary--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--secondary--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--light--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--dark--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--info--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--success--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--warning--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--danger--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--table--primary--border-color",
                        "value": [
                            {
                                "name": "--color-primary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--secondary--border-color",
                        "value": [
                            {
                                "name": "--color-secondary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--light--border-color",
                        "value": [
                            {
                                "name": "--color-gray-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--dark--border-color",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--info--border-color",
                        "value": [
                            {
                                "name": "--color-info-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--success--border-color",
                        "value": [
                            {
                                "name": "--color-success-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--warning--border-color",
                        "value": [
                            {
                                "name": "--color-warning-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--danger--border-color",
                        "value": [
                            {
                                "name": "--color-danger-shade-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--table--condensed--padding",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--border-color",
                "value": [
                    {
                        "name": "--table--primary--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--secondary--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--light--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--dark--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--info--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--success--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--warning--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--danger--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--table--primary--border-color",
                        "value": [
                            {
                                "name": "--color-primary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--secondary--border-color",
                        "value": [
                            {
                                "name": "--color-secondary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--light--border-color",
                        "value": [
                            {
                                "name": "--color-gray-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--dark--border-color",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--info--border-color",
                        "value": [
                            {
                                "name": "--color-info-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--success--border-color",
                        "value": [
                            {
                                "name": "--color-success-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--warning--border-color",
                        "value": [
                            {
                                "name": "--color-warning-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--danger--border-color",
                        "value": [
                            {
                                "name": "--color-danger-shade-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--table--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--border-style",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--border-color",
                "value": [
                    {
                        "name": "--table--primary--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--secondary--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--light--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--dark--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--info--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--success--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--warning--border-color",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--danger--border-color",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--table--primary--border-color",
                        "value": [
                            {
                                "name": "--color-primary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--secondary--border-color",
                        "value": [
                            {
                                "name": "--color-secondary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--light--border-color",
                        "value": [
                            {
                                "name": "--color-gray-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--dark--border-color",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--info--border-color",
                        "value": [
                            {
                                "name": "--color-info-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--success--border-color",
                        "value": [
                            {
                                "name": "--color-success-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--warning--border-color",
                        "value": [
                            {
                                "name": "--color-warning-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--danger--border-color",
                        "value": [
                            {
                                "name": "--color-danger-shade-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--table--border-width",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--striped--background",
                "value": [
                    {
                        "name": "--table--primary--striped--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--secondary--striped--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--light--striped--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--dark--striped--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--info--striped--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--success--striped--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--warning--striped--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--danger--striped--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--table--primary--striped--background",
                        "value": [
                            {
                                "name": "--color-primary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--secondary--striped--background",
                        "value": [
                            {
                                "name": "--color-secondary-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--light--striped--background",
                        "value": [
                            {
                                "name": "--color-gray-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--dark--striped--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--info--striped--background",
                        "value": [
                            {
                                "name": "--color-info-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--success--striped--background",
                        "value": [
                            {
                                "name": "--color-success-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--warning--striped--background",
                        "value": [
                            {
                                "name": "--color-warning-shade-50"
                            }
                        ]
                    },
                    {
                        "name": "--table--danger--striped--background",
                        "value": [
                            {
                                "name": "--color-danger-shade-50"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "--table--transition-property",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--transition-duration",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--transition-timing-function",
                "value": [],
                "variants": []
            },
            {
                "name": "--table--hover--background",
                "value": [
                    {
                        "name": "--table--primary--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--secondary--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--light--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--dark--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--success--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--warning--hover--background",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--table--danger--hover--background",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--table--primary--hover--background",
                        "value": [
                            {
                                "name": "--color-primary-shade-100"
                            }
                        ]
                    },
                    {
                        "name": "--table--secondary--hover--background",
                        "value": [
                            {
                                "name": "--color-secondary-shade-100"
                            }
                        ]
                    },
                    {
                        "name": "--table--light--hover--background",
                        "value": [
                            {
                                "name": "--color-gray-100"
                            }
                        ]
                    },
                    {
                        "name": "--table--dark--hover--background",
                        "value": [
                            {
                                "name": "--color-dark-tint-100"
                            }
                        ]
                    },
                    {
                        "name": "--table--success--hover--background",
                        "value": [
                            {
                                "name": "--color-success-shade-100"
                            }
                        ]
                    },
                    {
                        "name": "--table--warning--hover--background",
                        "value": [
                            {
                                "name": "--color-warning-shade-100"
                            }
                        ]
                    },
                    {
                        "name": "--table--danger--hover--background",
                        "value": [
                            {
                                "name": "--color-danger-shade-100"
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
