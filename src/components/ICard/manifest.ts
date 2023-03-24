import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ICard',
    props: [
        {
            name: 'color',
            type: ['primary', 'success', 'light', 'dark', 'info', 'success', 'warning', 'danger'],
            default: '',
            description: 'The color variant of the card'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the card'
        }
    ],
    events: [],
    slots: [
        {
            name: 'header',
            description: 'Slot for card header content '
        },
        {
            name: 'image',
            description: 'Slot for card image '
        },
        {
            name: 'default',
            description: 'Slot for card header content '
        },
        {
            name: 'footer',
            description: 'Slot for card footer content '
        }
    ],
    css: {
        selector: '.card',
        variables: [
            {
                name: '--card--border-radius',
                value: [
                    {
                        name: '--card--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--card--sm--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--border-top-right-radius',
                        value: [
                            {
                                name: '--border-top-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--card--sm--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--border-bottom-right-radius',
                        value: [
                            {
                                name: '--border-bottom-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--card--sm--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--card--sm--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--border-bottom-left-radius',
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
                name: '--card--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--card--sm--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--card--md--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--card--lg--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--box-shadow',
                value: [
                    {
                        name: '--card--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--card--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--card--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--card--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--card--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--card--header--color',
                value: [
                    {
                        name: '--card--color',
                        variants: [
                            {
                                name: '--card--primary--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-primary'
                                    }
                                ]
                            },
                            {
                                name: '--card--secondary--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-secondary'
                                    }
                                ]
                            },
                            {
                                name: '--card--light--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-light'
                                    }
                                ]
                            },
                            {
                                name: '--card--dark--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark'
                                    }
                                ]
                            },
                            {
                                name: '--card--info--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-info'
                                    }
                                ]
                            },
                            {
                                name: '--card--success--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-success'
                                    }
                                ]
                            },
                            {
                                name: '--card--warning--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-warning'
                                    }
                                ]
                            },
                            {
                                name: '--card--danger--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-danger'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--header--background',
                value: [
                    {
                        name: '--card--background',
                        variants: [
                            {
                                name: '--card--primary--background',
                                value: [
                                    {
                                        name: '--color-primary'
                                    }
                                ]
                            },
                            {
                                name: '--card--secondary--background',
                                value: [
                                    {
                                        name: '--color-secondary'
                                    }
                                ]
                            },
                            {
                                name: '--card--light--background',
                                value: [
                                    {
                                        name: '--color-white'
                                    }
                                ]
                            },
                            {
                                name: '--card--dark--background',
                                value: [
                                    {
                                        name: '--color-dark'
                                    }
                                ]
                            },
                            {
                                name: '--card--info--background',
                                value: [
                                    {
                                        name: '--color-info'
                                    }
                                ]
                            },
                            {
                                name: '--card--success--background',
                                value: [
                                    {
                                        name: '--color-success'
                                    }
                                ]
                            },
                            {
                                name: '--card--warning--background',
                                value: [
                                    {
                                        name: '--color-warning'
                                    }
                                ]
                            },
                            {
                                name: '--card--danger--background',
                                value: [
                                    {
                                        name: '--color-danger'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--card--primary--header--background',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--card--secondary--header--background',
                        value: [
                            {
                                name: '--color-secondary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--card--light--header--background',
                        value: [
                            {
                                name: '--color-light-250'
                            }
                        ]
                    },
                    {
                        name: '--card--dark--header--background',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    },
                    {
                        name: '--card--info--header--background',
                        value: [
                            {
                                name: '--color-info-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--card--success--header--background',
                        value: [
                            {
                                name: '--color-success-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--card--warning--header--background',
                        value: [
                            {
                                name: '--color-warning-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--card--danger--header--background',
                        value: [
                            {
                                name: '--color-danger-shade-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--header--border-style',
                value: [
                    {
                        name: '--card--header--border-top-style',
                        value: [
                            {
                                name: '--card--border-top-style',
                                value: [
                                    {
                                        name: '--border-top-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--header--border-right-style',
                        value: [
                            {
                                name: '--card--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--header--border-bottom-style',
                        value: [
                            {
                                name: '--card--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--header--border-left-style',
                        value: [
                            {
                                name: '--card--border-left-style',
                                value: [
                                    {
                                        name: '--border-left-style'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--header--border-width',
                value: [
                    {
                        name: '--card--header--border-top-width',
                        value: [
                            {
                                name: '--card--border-top-width',
                                value: [
                                    {
                                        name: '--border-top-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--header--border-right-width',
                        value: [
                            {
                                name: '--card--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--header--border-bottom-width',
                        value: [
                            {
                                name: '--card--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--header--border-left-width',
                        value: [
                            {
                                name: '--card--border-left-width',
                                value: [
                                    {
                                        name: '--border-left-width'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--header--border-color',
                value: [
                    {
                        name: '--card--header--border-top-color',
                        value: [
                            {
                                name: '--card--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--card--primary--border-top-color',
                                        value: [
                                            {
                                                name: '--color-primary-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--secondary--border-top-color',
                                        value: [
                                            {
                                                name: '--color-secondary-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--light--border-top-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--dark--border-top-color',
                                        value: [
                                            {
                                                name: '--color-dark-tint-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--info--border-top-color',
                                        value: [
                                            {
                                                name: '--color-info-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--success--border-top-color',
                                        value: [
                                            {
                                                name: '--color-success-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--warning--border-top-color',
                                        value: [
                                            {
                                                name: '--color-warning-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--danger--border-top-color',
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
                        name: '--card--header--border-right-color',
                        value: [
                            {
                                name: '--card--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--card--primary--border-right-color',
                                        value: [
                                            {
                                                name: '--color-primary-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--secondary--border-right-color',
                                        value: [
                                            {
                                                name: '--color-secondary-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--light--border-right-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--dark--border-right-color',
                                        value: [
                                            {
                                                name: '--color-dark-tint-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--info--border-right-color',
                                        value: [
                                            {
                                                name: '--color-info-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--success--border-right-color',
                                        value: [
                                            {
                                                name: '--color-success-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--warning--border-right-color',
                                        value: [
                                            {
                                                name: '--color-warning-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--danger--border-right-color',
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
                        name: '--card--header--border-bottom-color',
                        value: [
                            {
                                name: '--card--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--card--primary--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-primary-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--secondary--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-secondary-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--light--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--dark--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-dark-tint-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--info--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-info-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--success--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-success-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--warning--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-warning-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--danger--border-bottom-color',
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
                        name: '--card--header--border-left-color',
                        value: [
                            {
                                name: '--card--border-left-color',
                                value: [
                                    {
                                        name: '--border-left-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--card--primary--border-left-color',
                                        value: [
                                            {
                                                name: '--color-primary-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--secondary--border-left-color',
                                        value: [
                                            {
                                                name: '--color-secondary-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--light--border-left-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--dark--border-left-color',
                                        value: [
                                            {
                                                name: '--color-dark-tint-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--info--border-left-color',
                                        value: [
                                            {
                                                name: '--color-info-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--success--border-left-color',
                                        value: [
                                            {
                                                name: '--color-success-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--warning--border-left-color',
                                        value: [
                                            {
                                                name: '--color-warning-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--danger--border-left-color',
                                        value: [
                                            {
                                                name: '--color-danger-shade-50'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--header--padding',
                value: [
                    {
                        name: '--card--header--padding-top',
                        value: [
                            {
                                name: '--card--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--card--sm--padding-top',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-top) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--md--padding-top',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-top) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--lg--padding-top',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-top) * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--card--sm--header--padding-top',
                                value: [
                                    {
                                        name: '--card--padding-top'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--header--padding-top',
                                value: [
                                    {
                                        name: '--card--padding-top'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--header--padding-top',
                                value: [
                                    {
                                        name: '--card--padding-top'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--header--padding-right',
                        value: [
                            {
                                name: '--card--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--card--sm--padding-right',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-right) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--md--padding-right',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-right) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--lg--padding-right',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-right) * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--card--sm--header--padding-right',
                                value: [
                                    {
                                        name: '--card--padding-right'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--header--padding-right',
                                value: [
                                    {
                                        name: '--card--padding-right'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--header--padding-right',
                                value: [
                                    {
                                        name: '--card--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--header--padding-bottom',
                        value: [
                            {
                                name: '--card--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--card--sm--padding-bottom',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-bottom) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--md--padding-bottom',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-bottom) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--lg--padding-bottom',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-bottom) * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--card--sm--header--padding-bottom',
                                value: [
                                    {
                                        name: '--card--padding-bottom'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--header--padding-bottom',
                                value: [
                                    {
                                        name: '--card--padding-bottom'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--header--padding-bottom',
                                value: [
                                    {
                                        name: '--card--padding-bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--header--padding-left',
                        value: [
                            {
                                name: '--card--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--card--sm--padding-left',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-left) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--md--padding-left',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-left) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--card--lg--padding-left',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-left) * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--card--sm--header--padding-left',
                                value: [
                                    {
                                        name: '--card--padding-left'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--header--padding-left',
                                value: [
                                    {
                                        name: '--card--padding-left'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--header--padding-left',
                                value: [
                                    {
                                        name: '--card--padding-left'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--header--transition-property',
                value: [
                    {
                        name: '--card--transition-property',
                        value: [
                            {
                                value: '(border-color)'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--header--transition-duration',
                value: [
                    {
                        name: '--card--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--header--transition-timing-function',
                value: [
                    {
                        name: '--card--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--header--border-top-left-radius',
                value: [
                    {
                        name: '--card--border-top-left-radius'
                    }
                ]
            },
            {
                name: '--card--header--border-top-right-radius',
                value: [
                    {
                        name: '--card--border-top-right-radius'
                    }
                ]
            },
            {
                name: '--card--body--background',
                value: [
                    {
                        name: '--card--background'
                    }
                ]
            },
            {
                name: '--card--body--border-style',
                value: [
                    {
                        name: '--card--body--border-top-style',
                        value: [
                            {
                                name: '--card--border-top-style',
                                value: [
                                    {
                                        name: '--border-top-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--body--border-right-style',
                        value: [
                            {
                                name: '--card--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--body--border-bottom-style',
                        value: [
                            {
                                name: '--card--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--body--border-left-style',
                        value: [
                            {
                                name: '--card--border-left-style',
                                value: [
                                    {
                                        name: '--border-left-style'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--body--border-width',
                value: [
                    {
                        name: '--card--body--border-top-width',
                        value: [
                            {
                                name: '--card--border-top-width',
                                value: [
                                    {
                                        name: '--border-top-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--body--border-right-width',
                        value: [
                            {
                                name: '--card--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--body--border-bottom-width',
                        value: [
                            {
                                name: '--card--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--body--border-left-width',
                        value: [
                            {
                                name: '--card--border-left-width',
                                value: [
                                    {
                                        name: '--border-left-width'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--body--border-color',
                value: [
                    {
                        name: '--card--body--border-top-color',
                        value: [
                            {
                                name: '--card--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--body--border-right-color',
                        value: [
                            {
                                name: '--card--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--body--border-bottom-color',
                        value: [
                            {
                                name: '--card--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--body--border-left-color',
                        value: [
                            {
                                name: '--card--border-left-color',
                                value: [
                                    {
                                        name: '--border-left-color'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--body--border-radius',
                value: [
                    {
                        name: '--card--body--border-top-left-radius',
                        value: [
                            {
                                name: '--card--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--body--border-top-right-radius',
                        value: [
                            {
                                name: '--card--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--body--border-bottom-right-radius',
                        value: [
                            {
                                name: '--card--border-bottom-right-radius',
                                value: [
                                    {
                                        name: '--border-bottom-right-radius'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--body--border-bottom-left-radius',
                        value: [
                            {
                                name: '--card--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--body--padding',
                value: [
                    {
                        name: '--card--body--padding-top',
                        value: [
                            {
                                name: '--card--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--card--sm--body--padding-top',
                                value: [
                                    {
                                        name: '--card--padding-top'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--body--padding-top',
                                value: [
                                    {
                                        name: '--card--padding-top'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--body--padding-top',
                                value: [
                                    {
                                        name: '--card--padding-top'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--body--padding-right',
                        value: [
                            {
                                name: '--card--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--card--sm--body--padding-right',
                                value: [
                                    {
                                        name: '--card--padding-right'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--body--padding-right',
                                value: [
                                    {
                                        name: '--card--padding-right'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--body--padding-right',
                                value: [
                                    {
                                        name: '--card--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--body--padding-bottom',
                        value: [
                            {
                                name: '--card--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--card--sm--body--padding-bottom',
                                value: [
                                    {
                                        name: '--card--padding-bottom'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--body--padding-bottom',
                                value: [
                                    {
                                        name: '--card--padding-bottom'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--body--padding-bottom',
                                value: [
                                    {
                                        name: '--card--padding-bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--body--padding-left',
                        value: [
                            {
                                name: '--card--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--card--sm--body--padding-left',
                                value: [
                                    {
                                        name: '--card--padding-left'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--body--padding-left',
                                value: [
                                    {
                                        name: '--card--padding-left'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--body--padding-left',
                                value: [
                                    {
                                        name: '--card--padding-left'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--body--color',
                value: [
                    {
                        name: '--card--color'
                    }
                ]
            },
            {
                name: '--card--body--transition-property',
                value: [
                    {
                        name: '--card--transition-property',
                        value: [
                            {
                                value: '(border-color)'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--body--transition-duration',
                value: [
                    {
                        name: '--card--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--body--transition-timing-function',
                value: [
                    {
                        name: '--card--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--footer--background',
                value: [
                    {
                        name: '--card--background'
                    }
                ],
                variants: [
                    {
                        name: '--card--primary--footer--background',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--card--secondary--footer--background',
                        value: [
                            {
                                name: '--color-secondary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--card--light--footer--background',
                        value: [
                            {
                                name: '--color-light-250'
                            }
                        ]
                    },
                    {
                        name: '--card--dark--footer--background',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    },
                    {
                        name: '--card--info--footer--background',
                        value: [
                            {
                                name: '--color-info-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--card--success--footer--background',
                        value: [
                            {
                                name: '--color-success-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--card--warning--footer--background',
                        value: [
                            {
                                name: '--color-warning-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--card--danger--footer--background',
                        value: [
                            {
                                name: '--color-danger-shade-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--footer--border-style',
                value: [
                    {
                        name: '--card--footer--border-top-style',
                        value: [
                            {
                                name: '--card--border-top-style',
                                value: [
                                    {
                                        name: '--border-top-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--footer--border-right-style',
                        value: [
                            {
                                name: '--card--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--footer--border-bottom-style',
                        value: [
                            {
                                name: '--card--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--footer--border-left-style',
                        value: [
                            {
                                name: '--card--border-left-style',
                                value: [
                                    {
                                        name: '--border-left-style'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--footer--border-width',
                value: [
                    {
                        name: '--card--footer--border-top-width',
                        value: [
                            {
                                name: '--card--border-top-width',
                                value: [
                                    {
                                        name: '--border-top-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--footer--border-right-width',
                        value: [
                            {
                                name: '--card--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--footer--border-bottom-width',
                        value: [
                            {
                                name: '--card--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--footer--border-left-width',
                        value: [
                            {
                                name: '--card--border-left-width',
                                value: [
                                    {
                                        name: '--border-left-width'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--footer--border-color',
                value: [
                    {
                        name: '--card--footer--border-top-color',
                        value: [
                            {
                                name: '--card--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--footer--border-right-color',
                        value: [
                            {
                                name: '--card--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--footer--border-bottom-color',
                        value: [
                            {
                                name: '--card--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--footer--border-left-color',
                        value: [
                            {
                                name: '--card--border-left-color',
                                value: [
                                    {
                                        name: '--border-left-color'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--footer--padding',
                value: [
                    {
                        name: '--card--footer--padding-top',
                        value: [
                            {
                                name: '--card--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--card--sm--footer--padding-top',
                                value: [
                                    {
                                        name: '--card--padding-top'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--footer--padding-top',
                                value: [
                                    {
                                        name: '--card--padding-top'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--footer--padding-top',
                                value: [
                                    {
                                        name: '--card--padding-top'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--footer--padding-right',
                        value: [
                            {
                                name: '--card--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--card--sm--footer--padding-right',
                                value: [
                                    {
                                        name: '--card--padding-right'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--footer--padding-right',
                                value: [
                                    {
                                        name: '--card--padding-right'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--footer--padding-right',
                                value: [
                                    {
                                        name: '--card--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--footer--padding-bottom',
                        value: [
                            {
                                name: '--card--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--card--sm--footer--padding-bottom',
                                value: [
                                    {
                                        name: '--card--padding-bottom'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--footer--padding-bottom',
                                value: [
                                    {
                                        name: '--card--padding-bottom'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--footer--padding-bottom',
                                value: [
                                    {
                                        name: '--card--padding-bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--footer--padding-left',
                        value: [
                            {
                                name: '--card--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--card--sm--footer--padding-left',
                                value: [
                                    {
                                        name: '--card--padding-left'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--footer--padding-left',
                                value: [
                                    {
                                        name: '--card--padding-left'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--footer--padding-left',
                                value: [
                                    {
                                        name: '--card--padding-left'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--footer--color',
                value: [
                    {
                        name: '--card--color'
                    }
                ]
            },
            {
                name: '--card--footer--transition-property',
                value: [
                    {
                        name: '--card--transition-property',
                        value: [
                            {
                                value: 'border-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--footer--transition-duration',
                value: [
                    {
                        name: '--card--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--footer--transition-timing-function',
                value: [
                    {
                        name: '--card--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--footer--border-bottom-left-radius',
                value: [
                    {
                        name: '--card--border-bottom-left-radius'
                    }
                ]
            },
            {
                name: '--card--footer--border-bottom-right-radius',
                value: [
                    {
                        name: '--card--border-bottom-right-radius'
                    }
                ]
            },
            {
                name: '--card--img--border-top-left-radius',
                value: [
                    {
                        name: '--card--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--img--border-top-right-radius',
                value: [
                    {
                        name: '--card--border-top-right-radius',
                        value: [
                            {
                                name: '--border-top-right-radius'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--list-group--border-top-left-radius',
                value: [
                    {
                        name: '--card--border-top-left-radius'
                    }
                ]
            },
            {
                name: '--card--list-group--border-top-right-radius',
                value: [
                    {
                        name: '--card--border-top-right-radius'
                    }
                ]
            },
            {
                name: '--card--list-group--border-bottom-left-radius',
                value: [
                    {
                        name: '--card--border-bottom-left-radius'
                    }
                ]
            },
            {
                name: '--card--list-group--border-bottom-right-radius',
                value: [
                    {
                        name: '--card--border-bottom-right-radius'
                    }
                ]
            }
        ]
    }
};

export default manifest;
