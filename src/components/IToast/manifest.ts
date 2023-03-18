import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IToast',
    props: [
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the toast'
        },
        {
            name: 'color',
            type: ['light', 'dark', 'info', 'success', 'warning', 'danger'],
            default: 'light',
            description: 'The color variant of the toast'
        },
        {
            name: 'duration',
            type: ['Number'],
            default: '0',
            description:
                'The duration of the toast, in milliseconds. A duration of 0 will show the toast indefinitely.'
        },
        {
            name: 'duration',
            type: ['Boolean'],
            default: 'true',
            description: 'Show progress bar for the duration of the toast'
        },
        {
            name: 'icon',
            type: ['string', 'VNode', 'VNode[]'],
            default: 'undefined',
            description: 'The icon to be rendered in the toast'
        },
        {
            name: 'title',
            type: ['string', 'VNode', 'VNode[]'],
            default: 'undefined',
            description: 'The title to be rendered in the toast'
        },
        {
            name: 'message',
            type: ['string', 'VNode', 'VNode[]'],
            default: 'undefined',
            description: 'The message to be rendered in the toast'
        },
        {
            name: 'modelValue',
            type: ['Boolean'],
            default: 'true',
            description: 'Used to show or hide a dismissible toast'
        },
        {
            name: 'dismissible',
            type: ['Boolean'],
            default: 'false',
            description: 'Shows a dismiss icon on the toast'
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
            description: 'Event emitted when the toast is dismissed',
            name: 'dismiss'
        }
    ],
    slots: [
        {
            name: 'icon',
            description: 'Slot for toast icon '
        },
        {
            name: 'title',
            description: 'Slot for toast title '
        },
        {
            name: 'default',
            description: 'Slot for default toast content '
        },
        {
            name: 'dismiss',
            description: 'Slot for toast dismiss button '
        }
    ],
    css: {
        selector: '.toast',
        variables: [
            {
                name: '--toast--border-style',
                value: [
                    {
                        name: '--toast--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--toast--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--toast--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--toast--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--border-width',
                value: [
                    {
                        name: '--toast--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--toast--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--toast--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--toast--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--border-color',
                value: [
                    {
                        name: '--toast--border-top-color',
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--toast--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--border-top-color',
                                value: [
                                    {
                                        name: '--color-info-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--border-top-color',
                                value: [
                                    {
                                        name: '--color-success-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--border-top-color',
                                value: [
                                    {
                                        name: '--color-warning-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--border-top-color',
                                value: [
                                    {
                                        name: '--color-danger-500'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--border-right-color',
                        value: [
                            {
                                name: '--border-right-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--toast--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--border-right-color',
                                value: [
                                    {
                                        name: '--color-info-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--border-right-color',
                                value: [
                                    {
                                        name: '--color-success-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--border-right-color',
                                value: [
                                    {
                                        name: '--color-warning-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--border-right-color',
                                value: [
                                    {
                                        name: '--color-danger-500'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--border-bottom-color',
                        value: [
                            {
                                name: '--border-bottom-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--toast--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-info-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-success-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-warning-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-danger-500'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--border-left-color',
                        value: [
                            {
                                name: '--border-left-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--toast--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--border-left-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--border-left-color',
                                value: [
                                    {
                                        name: '--color-info-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--border-left-color',
                                value: [
                                    {
                                        name: '--color-success-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--border-left-color',
                                value: [
                                    {
                                        name: '--color-warning-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--border-left-color',
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
                name: '--toast--border-radius',
                value: [
                    {
                        name: '--toast--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--toast--sm--border-top-left-radius',
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
                                name: '--toast--md--border-top-left-radius',
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
                                name: '--toast--lg--border-top-left-radius',
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
                        name: '--toast--border-top-right-radius',
                        value: [
                            {
                                name: '--border-top-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--toast--sm--border-top-right-radius',
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
                                name: '--toast--md--border-top-right-radius',
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
                                name: '--toast--lg--border-top-right-radius',
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
                        name: '--toast--border-bottom-right-radius',
                        value: [
                            {
                                name: '--border-bottom-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--toast--sm--border-bottom-right-radius',
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
                                name: '--toast--md--border-bottom-right-radius',
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
                                name: '--toast--lg--border-bottom-right-radius',
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
                        name: '--toast--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--toast--sm--border-bottom-left-radius',
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
                                name: '--toast--md--border-bottom-left-radius',
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
                                name: '--toast--lg--border-bottom-left-radius',
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
                name: '--toast--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--toast--sm--font-size',
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
                        name: '--toast--md--font-size',
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
                        name: '--toast--lg--font-size',
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
                name: '--toast--box-shadow',
                value: [
                    {
                        name: '--toast--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--toast--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--toast--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--toast--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--toast--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--background',
                variants: [
                    {
                        name: '--toast--light--background',
                        value: [
                            {
                                name: '--color-white'
                            }
                        ]
                    },
                    {
                        name: '--toast--dark--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    },
                    {
                        name: '--toast--info--background',
                        value: [
                            {
                                name: '--color-info-100'
                            }
                        ]
                    },
                    {
                        name: '--toast--success--background',
                        value: [
                            {
                                name: '--color-success-100'
                            }
                        ]
                    },
                    {
                        name: '--toast--warning--background',
                        value: [
                            {
                                name: '--color-warning-100'
                            }
                        ]
                    },
                    {
                        name: '--toast--danger--background',
                        value: [
                            {
                                name: '--color-danger-100'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--color',
                variants: [
                    {
                        name: '--toast--light--color',
                        value: [
                            {
                                name: '--contrast-text-color-light'
                            }
                        ]
                    },
                    {
                        name: '--toast--dark--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    },
                    {
                        name: '--toast--info--color',
                        value: [
                            {
                                name: '--color-info-800'
                            }
                        ]
                    },
                    {
                        name: '--toast--success--color',
                        value: [
                            {
                                name: '--color-success-800'
                            }
                        ]
                    },
                    {
                        name: '--toast--warning--color',
                        value: [
                            {
                                name: '--color-warning-800'
                            }
                        ]
                    },
                    {
                        name: '--toast--danger--color',
                        value: [
                            {
                                name: '--color-danger-800'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--transition-property',
                value: [
                    {
                        value: '(background-color, color, border-color)'
                    }
                ]
            },
            {
                name: '--toast--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--toast--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--toast--link--color',
                value: [
                    {
                        name: '--toast--color',
                        variants: [
                            {
                                name: '--toast--light--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-light'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--color',
                                value: [
                                    {
                                        name: '--color-info-800'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--color',
                                value: [
                                    {
                                        name: '--color-success-800'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--color',
                                value: [
                                    {
                                        name: '--color-warning-800'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--color',
                                value: [
                                    {
                                        name: '--color-danger-800'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--link--transition-property',
                value: [
                    {
                        value: 'color'
                    }
                ]
            },
            {
                name: '--toast--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--toast--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--toast--link-color',
                value: [
                    {
                        name: '--color'
                    }
                ]
            },
            {
                name: '--toast--code--background'
            },
            {
                name: '--toast--code--color'
            },
            {
                name: '--toast--padding',
                value: [
                    {
                        name: '--toast--padding-top',
                        value: [
                            {
                                name: '--padding-top'
                            }
                        ],
                        variants: [
                            {
                                name: '--toast--sm--padding-top',
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
                                name: '--toast--md--padding-top',
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
                                name: '--toast--lg--padding-top',
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
                        name: '--toast--padding-right',
                        value: [
                            {
                                name: '--padding-right'
                            }
                        ],
                        variants: [
                            {
                                name: '--toast--sm--padding-right',
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
                                name: '--toast--md--padding-right',
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
                                name: '--toast--lg--padding-right',
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
                        name: '--toast--padding-bottom',
                        value: [
                            {
                                name: '--padding-bottom'
                            }
                        ],
                        variants: [
                            {
                                name: '--toast--sm--padding-bottom',
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
                                name: '--toast--md--padding-bottom',
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
                                name: '--toast--lg--padding-bottom',
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
                        name: '--toast--padding-left',
                        value: [
                            {
                                name: '--padding-left'
                            }
                        ],
                        variants: [
                            {
                                name: '--toast--sm--padding-left',
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
                                name: '--toast--md--padding-left',
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
                                name: '--toast--lg--padding-left',
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
                name: '--toast--title--font-weight',
                value: [
                    {
                        name: '--font-weight-semibold'
                    }
                ]
            },
            {
                name: '--toast--padding-left',
                value: [
                    {
                        name: '--padding-left'
                    }
                ],
                variants: [
                    {
                        name: '--toast--sm--padding-left',
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
                        name: '--toast--md--padding-left',
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
                        name: '--toast--lg--padding-left',
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
            },
            {
                name: '--toast--border-color',
                value: [
                    {
                        name: '--toast--border-top-color',
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--toast--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--border-top-color',
                                value: [
                                    {
                                        name: '--color-info-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--border-top-color',
                                value: [
                                    {
                                        name: '--color-success-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--border-top-color',
                                value: [
                                    {
                                        name: '--color-warning-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--border-top-color',
                                value: [
                                    {
                                        name: '--color-danger-500'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--border-right-color',
                        value: [
                            {
                                name: '--border-right-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--toast--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--border-right-color',
                                value: [
                                    {
                                        name: '--color-info-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--border-right-color',
                                value: [
                                    {
                                        name: '--color-success-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--border-right-color',
                                value: [
                                    {
                                        name: '--color-warning-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--border-right-color',
                                value: [
                                    {
                                        name: '--color-danger-500'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--border-bottom-color',
                        value: [
                            {
                                name: '--border-bottom-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--toast--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-info-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-success-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-warning-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-danger-500'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--border-left-color',
                        value: [
                            {
                                name: '--border-left-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--toast--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--border-left-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--border-left-color',
                                value: [
                                    {
                                        name: '--color-info-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--border-left-color',
                                value: [
                                    {
                                        name: '--color-success-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--border-left-color',
                                value: [
                                    {
                                        name: '--color-warning-500'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--border-left-color',
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
                name: '--toast--padding-left',
                value: [
                    {
                        name: '--padding-left'
                    }
                ],
                variants: [
                    {
                        name: '--toast--sm--padding-left',
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
                        name: '--toast--md--padding-left',
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
                        name: '--toast--lg--padding-left',
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
            },
            {
                name: '--toast--progress--height',
                value: [
                    {
                        value: '0.25rem'
                    }
                ]
            },
            {
                name: '--toast--progress--background',
                variants: [
                    {
                        name: '--toast--light--progress--background',
                        value: [
                            {
                                value: 'rgba(0, 0, 0, 0.05)'
                            }
                        ]
                    },
                    {
                        name: '--toast--dark--progress--background',
                        value: [
                            {
                                value: 'rgba(255, 255, 255, 0.05)'
                            }
                        ]
                    },
                    {
                        name: '--toast--info--progress--background',
                        value: [
                            {
                                value: 'rgba(0, 0, 0, 0.05)'
                            }
                        ]
                    },
                    {
                        name: '--toast--success--progress--background',
                        value: [
                            {
                                value: 'rgba(0, 0, 0, 0.05)'
                            }
                        ]
                    },
                    {
                        name: '--toast--warning--progress--background',
                        value: [
                            {
                                value: 'rgba(0, 0, 0, 0.05)'
                            }
                        ]
                    },
                    {
                        name: '--toast--danger--progress--background',
                        value: [
                            {
                                value: 'rgba(0, 0, 0, 0.05)'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--progress-bar--background',
                variants: [
                    {
                        name: '--toast--light--progress-bar--background',
                        value: [
                            {
                                value: 'rgba(0, 0, 0, 0.15)'
                            }
                        ]
                    },
                    {
                        name: '--toast--dark--progress-bar--background',
                        value: [
                            {
                                value: 'rgba(255, 255, 255, 0.15)'
                            }
                        ]
                    },
                    {
                        name: '--toast--info--progress-bar--background',
                        value: [
                            {
                                value: 'rgba(0, 0, 0, 0.15)'
                            }
                        ]
                    },
                    {
                        name: '--toast--success--progress-bar--background',
                        value: [
                            {
                                value: 'rgba(0, 0, 0, 0.15)'
                            }
                        ]
                    },
                    {
                        name: '--toast--warning--progress-bar--background',
                        value: [
                            {
                                value: 'rgba(0, 0, 0, 0.15)'
                            }
                        ]
                    },
                    {
                        name: '--toast--danger--progress-bar--background',
                        value: [
                            {
                                value: 'rgba(0, 0, 0, 0.15)'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
