import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IAlert',
    props: [
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the alert'
        },
        {
            name: 'color',
            type: ['info', 'success', 'warning', 'danger'],
            default: 'info',
            description: 'The color variant of the alert'
        },
        {
            name: 'modelValue',
            type: ['Boolean'],
            default: 'true',
            description: 'Used to show or hide a dismissible alert'
        },
        {
            name: 'dismissible',
            type: ['Boolean'],
            default: 'false',
            description: 'Shows a dismiss icon on the alert'
        },
        {
            name: 'dismissAriaLabel',
            type: ['String'],
            default: 'Dismiss',
            description: 'The aria-label to use for the dismiss button'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        }
    ],
    slots: [
        {
            name: 'icon',
            description: 'Slot for alert icon '
        },
        {
            name: 'title',
            description: 'Slot for alert title '
        },
        {
            name: 'default',
            description: 'Slot for default alert content '
        },
        {
            name: 'dismiss',
            description: 'Slot for alert dismiss button '
        }
    ],
    css: {
        selector: '.alert',
        variables: [
            {
                name: '--alert--border-style',
                value: [
                    {
                        name: '--alert--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--alert--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--alert--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--alert--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--alert--border-width',
                value: [
                    {
                        name: '--alert--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--alert--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--alert--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--alert--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--alert--border-color',
                value: [
                    {
                        name: '--alert--border-top-color',
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--alert--info--border-top-color',
                                value: [
                                    {
                                        name: '--color-info-500'
                                    }
                                ]
                            },
                            {
                                name: '--alert--success--border-top-color',
                                value: [
                                    {
                                        name: '--color-success-500'
                                    }
                                ]
                            },
                            {
                                name: '--alert--warning--border-top-color',
                                value: [
                                    {
                                        name: '--color-warning-500'
                                    }
                                ]
                            },
                            {
                                name: '--alert--danger--border-top-color',
                                value: [
                                    {
                                        name: '--color-danger-500'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--border-right-color',
                        value: [
                            {
                                name: '--border-right-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--alert--info--border-right-color',
                                value: [
                                    {
                                        name: '--color-info-500'
                                    }
                                ]
                            },
                            {
                                name: '--alert--success--border-right-color',
                                value: [
                                    {
                                        name: '--color-success-500'
                                    }
                                ]
                            },
                            {
                                name: '--alert--warning--border-right-color',
                                value: [
                                    {
                                        name: '--color-warning-500'
                                    }
                                ]
                            },
                            {
                                name: '--alert--danger--border-right-color',
                                value: [
                                    {
                                        name: '--color-danger-500'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--border-bottom-color',
                        value: [
                            {
                                name: '--border-bottom-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--alert--info--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-info-500'
                                    }
                                ]
                            },
                            {
                                name: '--alert--success--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-success-500'
                                    }
                                ]
                            },
                            {
                                name: '--alert--warning--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-warning-500'
                                    }
                                ]
                            },
                            {
                                name: '--alert--danger--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-danger-500'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--border-left-color',
                        value: [
                            {
                                name: '--border-left-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--alert--info--border-left-color',
                                value: [
                                    {
                                        name: '--color-info-500'
                                    }
                                ]
                            },
                            {
                                name: '--alert--success--border-left-color',
                                value: [
                                    {
                                        name: '--color-success-500'
                                    }
                                ]
                            },
                            {
                                name: '--alert--warning--border-left-color',
                                value: [
                                    {
                                        name: '--color-warning-500'
                                    }
                                ]
                            },
                            {
                                name: '--alert--danger--border-left-color',
                                value: [
                                    {
                                        name: '--color-danger-500'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--alert--border-radius',
                value: [
                    {
                        name: '--alert--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--alert--sm--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--alert--md--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--alert--lg--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--border-top-right-radius',
                        value: [
                            {
                                name: '--border-top-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--alert--sm--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--alert--md--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--alert--lg--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--border-bottom-right-radius',
                        value: [
                            {
                                name: '--border-bottom-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--alert--sm--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--alert--md--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--alert--lg--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--alert--sm--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--alert--md--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--alert--lg--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--alert--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--alert--sm--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--alert--md--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--alert--lg--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--alert--box-shadow',
                value: [
                    {
                        name: '--alert--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--alert--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--alert--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--alert--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--alert--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--alert--background',
                variants: [
                    {
                        name: '--alert--info--background',
                        value: [
                            {
                                name: '--color-info-100'
                            }
                        ]
                    },
                    {
                        name: '--alert--success--background',
                        value: [
                            {
                                name: '--color-success-100'
                            }
                        ]
                    },
                    {
                        name: '--alert--warning--background',
                        value: [
                            {
                                name: '--color-warning-100'
                            }
                        ]
                    },
                    {
                        name: '--alert--danger--background',
                        value: [
                            {
                                name: '--color-danger-100'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--alert--color',
                variants: [
                    {
                        name: '--alert--info--color',
                        value: [
                            {
                                name: '--color-info-800'
                            }
                        ]
                    },
                    {
                        name: '--alert--success--color',
                        value: [
                            {
                                name: '--color-success-800'
                            }
                        ]
                    },
                    {
                        name: '--alert--warning--color',
                        value: [
                            {
                                name: '--color-warning-800'
                            }
                        ]
                    },
                    {
                        name: '--alert--danger--color',
                        value: [
                            {
                                name: '--color-danger-800'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--alert--transition-property',
                value: [
                    {
                        value: 'background-color, color, border-color'
                    }
                ]
            },
            {
                name: '--alert--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--alert--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--alert--link--color',
                value: [
                    {
                        name: '--alert--color'
                    }
                ]
            },
            {
                name: '--alert--link--transition-property',
                value: [
                    {
                        value: 'color'
                    }
                ]
            },
            {
                name: '--alert--link-color',
                value: [
                    {
                        name: '--color'
                    }
                ]
            },
            {
                name: '--alert--code--background'
            },
            {
                name: '--alert--code--color'
            },
            {
                name: '--alert--padding',
                value: [
                    {
                        name: '--alert--padding-top',
                        value: [
                            {
                                name: '--padding-top'
                            }
                        ],
                        variants: [
                            {
                                name: '--alert--sm--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--alert--md--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--alert--lg--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--padding-right',
                        value: [
                            {
                                name: '--padding-right'
                            }
                        ],
                        variants: [
                            {
                                name: '--alert--sm--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--alert--md--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--alert--lg--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--padding-bottom',
                        value: [
                            {
                                name: '--padding-bottom'
                            }
                        ],
                        variants: [
                            {
                                name: '--alert--sm--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--alert--md--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--alert--lg--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--padding-left',
                        value: [
                            {
                                name: '--padding-left'
                            }
                        ],
                        variants: [
                            {
                                name: '--alert--sm--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--alert--md--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--alert--lg--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--alert--title--font-weight',
                value: [
                    {
                        name: '--font-weight-semibold'
                    }
                ]
            },
            {
                name: '--alert--icon--margin-left',
                value: [
                    {
                        name: '--alert--padding-left',
                        value: [
                            {
                                name: '--padding-left'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--alert--dismiss--margin-right',
                value: [
                    {
                        name: '--alert--padding-right',
                        value: [
                            {
                                name: '--padding-right'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
