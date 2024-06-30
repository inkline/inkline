import type { ComponentManifest } from '@inkline/inkline/types';

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
            name: 'showProgress',
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
            name: 'position',
            type: [
                'top-left',
                'top',
                'top-right',
                'right',
                'bottom-right',
                'bottom',
                'bottom-left',
                'left'
            ],
            default: 'top-right',
            description: 'Used to set the position of the toast'
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
                name: '--toast--background',
                value: [
                    {
                        name: '--toast--background-h',
                        value: [
                            {
                                name: '--color-white-h'
                            }
                        ]
                    },
                    {
                        name: '--toast--background-s',
                        value: [
                            {
                                name: '--color-white-s'
                            }
                        ]
                    },
                    {
                        name: '--toast--background-l',
                        value: [
                            {
                                name: '--color-white-l'
                            }
                        ]
                    },
                    {
                        name: '--toast--background-a',
                        value: [
                            {
                                name: '--color-white-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--toast--light--background',
                        value: [
                            {
                                name: '--toast--light--background-h',
                                value: [
                                    {
                                        name: '--color-white-h'
                                    }
                                ]
                            },
                            {
                                name: '--toast--light--background-s',
                                value: [
                                    {
                                        name: '--color-white-s'
                                    }
                                ]
                            },
                            {
                                name: '--toast--light--background-l',
                                value: [
                                    {
                                        name: '--color-white-l'
                                    }
                                ]
                            },
                            {
                                name: '--toast--light--background-a',
                                value: [
                                    {
                                        name: '--color-white-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--dark--background',
                        value: [
                            {
                                name: '--toast--dark--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--dark--progress--background',
                        value: [
                            {
                                name: '--toast--dark--progress--background-h',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--progress--background-s',
                                value: [
                                    {
                                        value: '0%'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--progress--background-l',
                                value: [
                                    {
                                        value: '100%'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--progress--background-a',
                                value: [
                                    {
                                        value: '0.05'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--dark--progress-bar--background',
                        value: [
                            {
                                name: '--toast--dark--progress-bar--background-h',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--progress-bar--background-s',
                                value: [
                                    {
                                        value: '0%'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--progress-bar--background-l',
                                value: [
                                    {
                                        value: '100%'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--progress-bar--background-a',
                                value: [
                                    {
                                        value: '0.15'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--info--background',
                        value: [
                            {
                                name: '--toast--info--background-h',
                                value: [
                                    {
                                        name: '--color-info-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--background-s',
                                value: [
                                    {
                                        name: '--color-info-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--background-l',
                                value: [
                                    {
                                        name: '--color-info-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--background-a',
                                value: [
                                    {
                                        name: '--color-info-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--success--background',
                        value: [
                            {
                                name: '--toast--success--background-h',
                                value: [
                                    {
                                        name: '--color-success-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--background-s',
                                value: [
                                    {
                                        name: '--color-success-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--background-l',
                                value: [
                                    {
                                        name: '--color-success-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--background-a',
                                value: [
                                    {
                                        name: '--color-success-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--warning--background',
                        value: [
                            {
                                name: '--toast--warning--background-h',
                                value: [
                                    {
                                        name: '--color-warning-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--background-s',
                                value: [
                                    {
                                        name: '--color-warning-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--background-l',
                                value: [
                                    {
                                        name: '--color-warning-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--background-a',
                                value: [
                                    {
                                        name: '--color-warning-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--danger--background',
                        value: [
                            {
                                name: '--toast--danger--background-h',
                                value: [
                                    {
                                        name: '--color-danger-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--background-s',
                                value: [
                                    {
                                        name: '--color-danger-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--background-l',
                                value: [
                                    {
                                        name: '--color-danger-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--background-a',
                                value: [
                                    {
                                        name: '--color-danger-100-a'
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
                        value: []
                    },
                    {
                        name: '--toast--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--toast--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--toast--border-bottom-left-radius',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--toast--sm--border-radius',
                        value: [
                            {
                                name: '--toast--sm--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--toast--sm--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--toast--sm--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--toast--sm--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius-sm'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--md--border-radius',
                        value: [
                            {
                                name: '--toast--md--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--toast--md--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--toast--md--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--toast--md--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius-md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--lg--border-radius',
                        value: [
                            {
                                name: '--toast--lg--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--toast--lg--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--toast--lg--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--toast--lg--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius-lg'
                                    }
                                ]
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
                name: '--toast--border-color',
                value: [
                    {
                        name: '--toast--border-top-color',
                        value: []
                    },
                    {
                        name: '--toast--border-right-color',
                        value: []
                    },
                    {
                        name: '--toast--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--toast--border-left-color',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--toast--light--border-color',
                        value: [
                            {
                                name: '--toast--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--dark--border-color',
                        value: [
                            {
                                name: '--toast--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
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
                                name: '--toast--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
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
                            }
                        ]
                    },
                    {
                        name: '--toast--info--border-color',
                        value: [
                            {
                                name: '--toast--info--border-top-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--border-right-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--border-left-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--success--border-color',
                        value: [
                            {
                                name: '--toast--success--border-top-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--border-right-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--border-left-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--warning--border-color',
                        value: [
                            {
                                name: '--toast--warning--border-top-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--border-right-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--border-left-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--danger--border-color',
                        value: [
                            {
                                name: '--toast--danger--border-top-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--border-right-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--border-left-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--box-shadow',
                value: []
            },
            {
                name: '--toast--color',
                value: [
                    {
                        name: '--toast--color-h',
                        value: [
                            {
                                name: '--text-contrast-color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--toast--color-s',
                        value: [
                            {
                                name: '--text-contrast-color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--toast--color-l',
                        value: [
                            {
                                name: '--text-contrast-color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--toast--color-a',
                        value: [
                            {
                                name: '--text-contrast-color-light-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--toast--light--color',
                        value: [
                            {
                                name: '--toast--light--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--toast--light--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--toast--light--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--toast--light--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--dark--color',
                        value: [
                            {
                                name: '--toast--dark--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--toast--dark--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--info--color',
                        value: [
                            {
                                name: '--toast--info--color-h',
                                value: [
                                    {
                                        name: '--color-info-800-h'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--color-s',
                                value: [
                                    {
                                        name: '--color-info-800-s'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--color-l',
                                value: [
                                    {
                                        name: '--color-info-800-l'
                                    }
                                ]
                            },
                            {
                                name: '--toast--info--color-a',
                                value: [
                                    {
                                        name: '--color-info-800-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--success--color',
                        value: [
                            {
                                name: '--toast--success--color-h',
                                value: [
                                    {
                                        name: '--color-success-800-h'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--color-s',
                                value: [
                                    {
                                        name: '--color-success-800-s'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--color-l',
                                value: [
                                    {
                                        name: '--color-success-800-l'
                                    }
                                ]
                            },
                            {
                                name: '--toast--success--color-a',
                                value: [
                                    {
                                        name: '--color-success-800-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--warning--color',
                        value: [
                            {
                                name: '--toast--warning--color-h',
                                value: [
                                    {
                                        name: '--color-warning-800-h'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--color-s',
                                value: [
                                    {
                                        name: '--color-warning-800-s'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--color-l',
                                value: [
                                    {
                                        name: '--color-warning-800-l'
                                    }
                                ]
                            },
                            {
                                name: '--toast--warning--color-a',
                                value: [
                                    {
                                        name: '--color-warning-800-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--danger--color',
                        value: [
                            {
                                name: '--toast--danger--color-h',
                                value: [
                                    {
                                        name: '--color-danger-800-h'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--color-s',
                                value: [
                                    {
                                        name: '--color-danger-800-s'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--color-l',
                                value: [
                                    {
                                        name: '--color-danger-800-l'
                                    }
                                ]
                            },
                            {
                                name: '--toast--danger--color-a',
                                value: [
                                    {
                                        name: '--color-danger-800-a'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--font-size',
                value: [],
                variants: [
                    {
                        name: '--toast--sm--font-size',
                        value: [
                            {
                                name: '--font-size-sm'
                            }
                        ]
                    },
                    {
                        name: '--toast--md--font-size',
                        value: [
                            {
                                name: '--font-size-md'
                            }
                        ]
                    },
                    {
                        name: '--toast--lg--font-size',
                        value: [
                            {
                                name: '--font-size-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--link--color',
                value: [
                    {
                        name: '--toast--link--color-h',
                        value: [
                            {
                                name: '--toast--color-h'
                            }
                        ]
                    },
                    {
                        name: '--toast--link--color-s',
                        value: [
                            {
                                name: '--toast--color-s'
                            }
                        ]
                    },
                    {
                        name: '--toast--link--color-l',
                        value: [
                            {
                                name: '--toast--color-l'
                            }
                        ]
                    },
                    {
                        name: '--toast--link--color-a',
                        value: [
                            {
                                name: '--toast--color-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--link--font-weight',
                value: [
                    {
                        name: '--font-weight-semibold'
                    }
                ]
            },
            {
                name: '--toast--link--transition',
                value: [
                    {
                        name: '--toast--link--transition-property',
                        value: [
                            {
                                value: 'color'
                            }
                        ]
                    },
                    {
                        name: '--toast--link--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--toast--link--transition-timing-function',
                        value: []
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
                        name: '--toast--link--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--toast--link--transition-timing-function',
                        value: []
                    }
                ]
            },
            {
                name: '--toast--link--hover--color',
                value: [
                    {
                        name: '--toast--link--hover--color-h',
                        value: [
                            {
                                name: '--toast--link--color-h'
                            }
                        ]
                    },
                    {
                        name: '--toast--link--hover--color-s',
                        value: [
                            {
                                name: '--toast--link--color-s'
                            }
                        ]
                    },
                    {
                        name: '--toast--link--hover--color-l',
                        value: [
                            {
                                name: '--toast--link--color-l'
                            }
                        ]
                    },
                    {
                        name: '--toast--link--hover--color-a',
                        value: [
                            {
                                name: '--toast--link--color-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--link--focus--color',
                value: []
            },
            {
                name: '--toast--code--background',
                value: [
                    {
                        name: '--toast--code--background-h',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--toast--code--background-s',
                        value: [
                            {
                                value: '0%'
                            }
                        ]
                    },
                    {
                        name: '--toast--code--background-l',
                        value: [
                            {
                                value: '0%'
                            }
                        ]
                    },
                    {
                        name: '--toast--code--background-a',
                        value: [
                            {
                                value: '0.05'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--code--color',
                value: [
                    {
                        name: '--toast--code--color-h',
                        value: [
                            {
                                name: '--toast--color-h'
                            }
                        ]
                    },
                    {
                        name: '--toast--code--color-s',
                        value: [
                            {
                                name: '--toast--color-s'
                            }
                        ]
                    },
                    {
                        name: '--toast--code--color-l',
                        value: [
                            {
                                name: '--toast--color-l'
                            }
                        ]
                    },
                    {
                        name: '--toast--code--color-a',
                        value: [
                            {
                                name: '--toast--color-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--padding',
                value: [
                    {
                        name: '--toast--padding-top',
                        value: []
                    },
                    {
                        name: '--toast--padding-right',
                        value: []
                    },
                    {
                        name: '--toast--padding-bottom',
                        value: []
                    },
                    {
                        name: '--toast--padding-left',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--toast--sm--padding',
                        value: [
                            {
                                name: '--toast--sm--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-sm'
                                    }
                                ]
                            },
                            {
                                name: '--toast--sm--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-sm'
                                    }
                                ]
                            },
                            {
                                name: '--toast--sm--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-sm'
                                    }
                                ]
                            },
                            {
                                name: '--toast--sm--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-sm'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--md--padding',
                        value: [
                            {
                                name: '--toast--md--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-md'
                                    }
                                ]
                            },
                            {
                                name: '--toast--md--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-md'
                                    }
                                ]
                            },
                            {
                                name: '--toast--md--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-md'
                                    }
                                ]
                            },
                            {
                                name: '--toast--md--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toast--lg--padding',
                        value: [
                            {
                                name: '--toast--lg--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-lg'
                                    }
                                ]
                            },
                            {
                                name: '--toast--lg--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-lg'
                                    }
                                ]
                            },
                            {
                                name: '--toast--lg--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-lg'
                                    }
                                ]
                            },
                            {
                                name: '--toast--lg--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-lg'
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
                name: '--toast--title--font-size',
                value: [
                    {
                        name: '--alert--font-size'
                    }
                ]
            },
            {
                name: '--toast--icon--margin',
                value: [
                    {
                        name: '--toast--icon--margin-top',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--toast--icon--margin-right',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--toast--icon--margin-bottom',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--toast--icon--margin-left',
                        value: [
                            {
                                name: '--toast--padding-left'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--dismiss--margin',
                value: [
                    {
                        name: '--toast--dismiss--margin-top',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--toast--dismiss--margin-right',
                        value: [
                            {
                                name: '--toast--padding-left'
                            }
                        ]
                    },
                    {
                        name: '--toast--dismiss--margin-bottom',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--toast--dismiss--margin-left',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--progress--background',
                value: [
                    {
                        name: '--toast--progress--background-h',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--toast--progress--background-s',
                        value: [
                            {
                                value: '0%'
                            }
                        ]
                    },
                    {
                        name: '--toast--progress--background-l',
                        value: [
                            {
                                value: '0%'
                            }
                        ]
                    },
                    {
                        name: '--toast--progress--background-a',
                        value: [
                            {
                                value: '0.05'
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
                name: '--toast--progress-bar--background',
                value: [
                    {
                        name: '--toast--progress-bar--background-h',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--toast--progress-bar--background-s',
                        value: [
                            {
                                value: '0%'
                            }
                        ]
                    },
                    {
                        name: '--toast--progress-bar--background-l',
                        value: [
                            {
                                value: '0%'
                            }
                        ]
                    },
                    {
                        name: '--toast--progress-bar--background-a',
                        value: [
                            {
                                value: '0.15'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toast--duration',
                value: []
            }
        ]
    }
};

export default manifest;
