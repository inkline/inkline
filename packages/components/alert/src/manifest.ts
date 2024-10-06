import type { ComponentManifest } from '@inkline/devtools';

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
            default: 'undefined',
            description: 'Used to show or hide the alert'
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
                name: '--alert--background',
                value: [
                    {
                        name: '--alert--background-h',
                        value: [
                            {
                                name: '--color-info-100-h'
                            }
                        ]
                    },
                    {
                        name: '--alert--background-s',
                        value: [
                            {
                                name: '--color-info-100-s'
                            }
                        ]
                    },
                    {
                        name: '--alert--background-l',
                        value: [
                            {
                                name: '--color-info-100-l'
                            }
                        ]
                    },
                    {
                        name: '--alert--background-a',
                        value: [
                            {
                                name: '--color-info-100-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--alert--info--background',
                        value: [
                            {
                                name: '--alert--info--background-h',
                                value: [
                                    {
                                        name: '--color-info-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--alert--info--background-s',
                                value: [
                                    {
                                        name: '--color-info-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--alert--info--background-l',
                                value: [
                                    {
                                        name: '--color-info-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--alert--info--background-a',
                                value: [
                                    {
                                        name: '--color-info-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--success--background',
                        value: [
                            {
                                name: '--alert--success--background-h',
                                value: [
                                    {
                                        name: '--color-success-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--alert--success--background-s',
                                value: [
                                    {
                                        name: '--color-success-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--alert--success--background-l',
                                value: [
                                    {
                                        name: '--color-success-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--alert--success--background-a',
                                value: [
                                    {
                                        name: '--color-success-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--warning--background',
                        value: [
                            {
                                name: '--alert--warning--background-h',
                                value: [
                                    {
                                        name: '--color-warning-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--alert--warning--background-s',
                                value: [
                                    {
                                        name: '--color-warning-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--alert--warning--background-l',
                                value: [
                                    {
                                        name: '--color-warning-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--alert--warning--background-a',
                                value: [
                                    {
                                        name: '--color-warning-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--danger--background',
                        value: [
                            {
                                name: '--alert--danger--background-h',
                                value: [
                                    {
                                        name: '--color-danger-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--alert--danger--background-s',
                                value: [
                                    {
                                        name: '--color-danger-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--alert--danger--background-l',
                                value: [
                                    {
                                        name: '--color-danger-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--alert--danger--background-a',
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
                        value: []
                    },
                    {
                        name: '--alert--border-right-color',
                        value: []
                    },
                    {
                        name: '--alert--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--alert--border-left-color',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--alert--info--border-color',
                        value: [
                            {
                                name: '--alert--info--border-top-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--alert--info--border-right-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--alert--info--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--alert--info--border-left-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--success--border-color',
                        value: [
                            {
                                name: '--alert--success--border-top-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--alert--success--border-right-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--alert--success--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--alert--success--border-left-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--warning--border-color',
                        value: [
                            {
                                name: '--alert--warning--border-top-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--alert--warning--border-right-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--alert--warning--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--alert--warning--border-left-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--danger--border-color',
                        value: [
                            {
                                name: '--alert--danger--border-top-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--alert--danger--border-right-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--alert--danger--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--alert--danger--border-left-color',
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
                name: '--alert--border-radius',
                value: [
                    {
                        name: '--alert--border-top-left-radius',
                        value: []
                    },
                    {
                        name: '--alert--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--alert--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--alert--border-bottom-left-radius',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--alert--sm--border-radius',
                        value: [
                            {
                                name: '--alert--sm--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--alert--sm--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--alert--sm--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--alert--sm--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius-sm'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--md--border-radius',
                        value: [
                            {
                                name: '--alert--md--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--alert--md--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--alert--md--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--alert--md--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius-md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--lg--border-radius',
                        value: [
                            {
                                name: '--alert--lg--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--alert--lg--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--alert--lg--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--alert--lg--border-bottom-left-radius',
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
                name: '--alert--box-shadow',
                value: []
            },
            {
                name: '--alert--color',
                value: [
                    {
                        name: '--alert--color-h',
                        value: [
                            {
                                name: '--color-info-800-h'
                            }
                        ]
                    },
                    {
                        name: '--alert--color-s',
                        value: [
                            {
                                name: '--color-info-800-s'
                            }
                        ]
                    },
                    {
                        name: '--alert--color-l',
                        value: [
                            {
                                name: '--color-info-800-l'
                            }
                        ]
                    },
                    {
                        name: '--alert--color-a',
                        value: [
                            {
                                name: '--color-info-800-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--alert--info--color',
                        value: [
                            {
                                name: '--alert--info--color-h',
                                value: [
                                    {
                                        name: '--color-info-800-h'
                                    }
                                ]
                            },
                            {
                                name: '--alert--info--color-s',
                                value: [
                                    {
                                        name: '--color-info-800-s'
                                    }
                                ]
                            },
                            {
                                name: '--alert--info--color-l',
                                value: [
                                    {
                                        name: '--color-info-800-l'
                                    }
                                ]
                            },
                            {
                                name: '--alert--info--color-a',
                                value: [
                                    {
                                        name: '--color-info-800-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--success--color',
                        value: [
                            {
                                name: '--alert--success--color-h',
                                value: [
                                    {
                                        name: '--color-success-800-h'
                                    }
                                ]
                            },
                            {
                                name: '--alert--success--color-s',
                                value: [
                                    {
                                        name: '--color-success-800-s'
                                    }
                                ]
                            },
                            {
                                name: '--alert--success--color-l',
                                value: [
                                    {
                                        name: '--color-success-800-l'
                                    }
                                ]
                            },
                            {
                                name: '--alert--success--color-a',
                                value: [
                                    {
                                        name: '--color-success-800-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--warning--color',
                        value: [
                            {
                                name: '--alert--warning--color-h',
                                value: [
                                    {
                                        name: '--color-warning-800-h'
                                    }
                                ]
                            },
                            {
                                name: '--alert--warning--color-s',
                                value: [
                                    {
                                        name: '--color-warning-800-s'
                                    }
                                ]
                            },
                            {
                                name: '--alert--warning--color-l',
                                value: [
                                    {
                                        name: '--color-warning-800-l'
                                    }
                                ]
                            },
                            {
                                name: '--alert--warning--color-a',
                                value: [
                                    {
                                        name: '--color-warning-800-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--danger--color',
                        value: [
                            {
                                name: '--alert--danger--color-h',
                                value: [
                                    {
                                        name: '--color-danger-800-h'
                                    }
                                ]
                            },
                            {
                                name: '--alert--danger--color-s',
                                value: [
                                    {
                                        name: '--color-danger-800-s'
                                    }
                                ]
                            },
                            {
                                name: '--alert--danger--color-l',
                                value: [
                                    {
                                        name: '--color-danger-800-l'
                                    }
                                ]
                            },
                            {
                                name: '--alert--danger--color-a',
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
                name: '--alert--font-size',
                value: [],
                variants: [
                    {
                        name: '--alert--sm--font-size',
                        value: [
                            {
                                name: '--font-size-sm'
                            }
                        ]
                    },
                    {
                        name: '--alert--md--font-size',
                        value: [
                            {
                                name: '--font-size-md'
                            }
                        ]
                    },
                    {
                        name: '--alert--lg--font-size',
                        value: [
                            {
                                name: '--font-size-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--alert--font-weight',
                value: [
                    {
                        name: '--font-weight-normal'
                    }
                ]
            },
            {
                name: '--alert--transition',
                value: [
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
                    }
                ]
            },
            {
                name: '--alert--link--color',
                value: []
            },
            {
                name: '--alert--link--font-weight',
                value: [
                    {
                        name: '--font-weight-semibold'
                    }
                ]
            },
            {
                name: '--alert--link--transition',
                value: [
                    {
                        name: '--alert--link--transition-property',
                        value: [
                            {
                                value: 'color'
                            }
                        ]
                    },
                    {
                        name: '--alert--link--transition-duration'
                    },
                    {
                        name: '--alert--link--transition-timing-function'
                    },
                    {
                        name: '--alert--link--transition-property',
                        value: [
                            {
                                value: 'color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--alert--link--hover--color',
                value: []
            },
            {
                name: '--alert--link--focus--color',
                value: []
            },
            {
                name: '--alert--code--background',
                value: [
                    {
                        name: '--alert--code--background-h',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--alert--code--background-s',
                        value: [
                            {
                                value: '0%'
                            }
                        ]
                    },
                    {
                        name: '--alert--code--background-l',
                        value: [
                            {
                                value: '0%'
                            }
                        ]
                    },
                    {
                        name: '--alert--code--background-a',
                        value: [
                            {
                                value: '0.05'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--alert--code--color',
                value: []
            },
            {
                name: '--alert--padding',
                value: [
                    {
                        name: '--alert--padding-top',
                        value: []
                    },
                    {
                        name: '--alert--padding-right',
                        value: []
                    },
                    {
                        name: '--alert--padding-bottom',
                        value: []
                    },
                    {
                        name: '--alert--padding-left',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--alert--sm--padding',
                        value: [
                            {
                                name: '--alert--sm--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-sm'
                                    }
                                ]
                            },
                            {
                                name: '--alert--sm--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-sm'
                                    }
                                ]
                            },
                            {
                                name: '--alert--sm--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-sm'
                                    }
                                ]
                            },
                            {
                                name: '--alert--sm--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-sm'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--md--padding',
                        value: [
                            {
                                name: '--alert--md--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-md'
                                    }
                                ]
                            },
                            {
                                name: '--alert--md--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-md'
                                    }
                                ]
                            },
                            {
                                name: '--alert--md--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-md'
                                    }
                                ]
                            },
                            {
                                name: '--alert--md--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--alert--lg--padding',
                        value: [
                            {
                                name: '--alert--lg--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-lg'
                                    }
                                ]
                            },
                            {
                                name: '--alert--lg--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-lg'
                                    }
                                ]
                            },
                            {
                                name: '--alert--lg--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-lg'
                                    }
                                ]
                            },
                            {
                                name: '--alert--lg--padding-left',
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
                name: '--alert--title--font-size',
                value: []
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
                name: '--alert--icon--padding',
                value: [
                    {
                        name: '--alert--icon--padding-left'
                    }
                ]
            },
            {
                name: '--alert--dismiss--padding',
                value: [
                    {
                        name: '--alert--dismiss--padding-right'
                    }
                ]
            }
        ]
    }
};

export default manifest;
