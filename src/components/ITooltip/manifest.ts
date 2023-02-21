export const manifest = {
    name: 'ITooltip',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the tooltip'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the tooltip'
        },
        {
            name: 'visible',
            type: ['Boolean'],
            default: 'undefined',
            description: 'Used to manually control the visibility of the tooltip'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The identifier of the tooltip'
        },
        {
            name: 'arrow',
            type: ['Boolean'],
            default: 'true',
            description: 'Displays an arrow on the tooltip pointing to the trigger element'
        },
        {
            name: 'placement',
            type: [
                'top',
                'top-start',
                'top-end',
                'bottom',
                'bottom-start',
                'bottom-end',
                'left',
                'left-start',
                'left-end',
                'right',
                'right-start',
                'right-end'
            ],
            default: 'false',
            description: 'The placement of the tooltip'
        },
        {
            name: 'events',
            type: ['hover', 'focus', 'click', 'manual'],
            default: 'hover, focus',
            description: 'The events used to trigger the tooltip'
        },
        {
            name: 'offset',
            type: ['Number'],
            default: '6',
            description: 'The offset of the tooltip relative to the trigger element'
        },
        {
            name: 'interactable',
            type: ['Boolean'],
            default: 'false',
            description:
                'Determines whether hover state should be transferred from trigger to popup'
        },
        {
            name: 'popupOptions',
            type: ['Object'],
            default: '',
            description: 'Used to override the floating-ui options used for creating the tooltip'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the tooltip'
        },
        {
            name: 'hoverHideDelay',
            type: ['Number'],
            default: '300',
            description: 'Delay in milliseconds before the tooltip is hidden on hover'
        },
        {
            name: 'animationDuration',
            type: ['Number'],
            default: '300',
            description: 'Animation duration in milliseconds'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the visible',
            name: 'update:visible'
        },
        {
            description: 'Event emitted when clicking outside the tooltip',
            name: 'click:outside'
        }
    ],
    slots: [
        {
            name: 'default',
            description: 'Slot for tooltip trigger '
        },
        {
            name: 'body',
            description: 'Slot for tooltip body content '
        }
    ],
    css: {
        selector: '.tooltip-wrapper',
        variables: [
            {
                name: '--tooltip--line-height',
                value: [
                    {
                        name: '--line-height'
                    }
                ]
            },
            {
                name: '--tooltip--border-width',
                value: [
                    {
                        name: '--tooltip--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tooltip--border-style',
                value: [
                    {
                        name: '--tooltip--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tooltip--color',
                variants: [
                    {
                        name: '--tooltip--light--color',
                        value: [
                            {
                                name: '--contrast-text--color-white'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--dark--color',
                        value: [
                            {
                                name: '--contrast-text--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tooltip--background',
                variants: [
                    {
                        name: '--tooltip--light--background',
                        value: [
                            {
                                name: '--color-white'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--dark--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tooltip--border-color',
                value: [
                    {
                        name: '--tooltip--border-top-color',
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--tooltip--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-600'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tooltip--border-right-color',
                        value: [
                            {
                                name: '--border-right-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--tooltip--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-600'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tooltip--border-bottom-color',
                        value: [
                            {
                                name: '--border-bottom-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--tooltip--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-600'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tooltip--border-left-color',
                        value: [
                            {
                                name: '--border-left-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--tooltip--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--dark--border-left-color',
                                value: [
                                    {
                                        name: '--color-dark-600'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tooltip--border-radius',
                value: [
                    {
                        name: '--tooltip--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--tooltip--sm--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius'
                                    },
                                    {
                                        name: '--size-multiplier-sm'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--md--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius'
                                    },
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--lg--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius'
                                    },
                                    {
                                        name: '--size-multiplier-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tooltip--border-top-right-radius',
                        value: [
                            {
                                name: '--border-top-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--tooltip--sm--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius'
                                    },
                                    {
                                        name: '--size-multiplier-sm'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--md--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius'
                                    },
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--lg--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius'
                                    },
                                    {
                                        name: '--size-multiplier-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tooltip--border-bottom-right-radius',
                        value: [
                            {
                                name: '--border-bottom-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--tooltip--sm--border-bottom-right-radius',
                                value: [
                                    {
                                        name: '--border-bottom-right-radius'
                                    },
                                    {
                                        name: '--size-multiplier-sm'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--md--border-bottom-right-radius',
                                value: [
                                    {
                                        name: '--border-bottom-right-radius'
                                    },
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--lg--border-bottom-right-radius',
                                value: [
                                    {
                                        name: '--border-bottom-right-radius'
                                    },
                                    {
                                        name: '--size-multiplier-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tooltip--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--tooltip--sm--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius'
                                    },
                                    {
                                        name: '--size-multiplier-sm'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--md--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius'
                                    },
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--lg--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius'
                                    },
                                    {
                                        name: '--size-multiplier-lg'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tooltip--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--tooltip--sm--font-size',
                        value: [
                            {
                                name: '--font-size'
                            },
                            {
                                name: '--size-multiplier-sm'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--md--font-size',
                        value: [
                            {
                                name: '--font-size'
                            },
                            {
                                name: '--size-multiplier-md'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--lg--font-size',
                        value: [
                            {
                                name: '--font-size'
                            },
                            {
                                name: '--size-multiplier-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tooltip--padding',
                value: [
                    {
                        name: '--tooltip--padding-top',
                        value: [
                            {
                                name: '--padding-top'
                            }
                        ],
                        variants: [
                            {
                                name: '--tooltip--sm--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    },
                                    {
                                        name: '--size-multiplier-sm'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--md--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    },
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--lg--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    },
                                    {
                                        name: '--size-multiplier-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tooltip--padding-right',
                        value: [
                            {
                                name: '--padding-right'
                            }
                        ],
                        variants: [
                            {
                                name: '--tooltip--sm--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    },
                                    {
                                        name: '--size-multiplier-sm'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--md--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    },
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--lg--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    },
                                    {
                                        name: '--size-multiplier-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tooltip--padding-bottom',
                        value: [
                            {
                                name: '--padding-bottom'
                            }
                        ],
                        variants: [
                            {
                                name: '--tooltip--sm--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    },
                                    {
                                        name: '--size-multiplier-sm'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--md--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    },
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--lg--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    },
                                    {
                                        name: '--size-multiplier-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tooltip--padding-left',
                        value: [
                            {
                                name: '--padding-left'
                            }
                        ],
                        variants: [
                            {
                                name: '--tooltip--sm--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    },
                                    {
                                        name: '--size-multiplier-sm'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--md--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    },
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--tooltip--lg--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    },
                                    {
                                        name: '--size-multiplier-lg'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tooltip--box-shadow',
                value: [
                    {
                        name: '--tooltip--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
