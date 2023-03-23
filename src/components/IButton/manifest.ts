import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IButton',
    props: [
        {
            name: 'active',
            type: ['Boolean'],
            default: 'false',
            description: 'The active state of the button'
        },
        {
            name: 'block',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the button as a block, spanning the full container width'
        },
        {
            name: 'circle',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the button as a circle'
        },
        {
            name: 'color',
            type: ['primary', 'success', 'light', 'dark', 'info', 'success', 'warning', 'danger'],
            default: '',
            description: 'The color variant of the button'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the button'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as an anchor link with a `href` attribute'
        },
        {
            name: 'link',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the button as a link'
        },
        {
            name: 'loading',
            type: ['Boolean'],
            default: 'false',
            description: 'The loading state of the button'
        },
        {
            name: 'outline',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the button as an outline button'
        },
        {
            name: 'tag',
            type: ['String'],
            default: 'button',
            description: 'Set the HTML tag to be used for rendering the button'
        },
        {
            name: 'tabindex',
            type: ['Number', 'String'],
            default: '0',
            description: 'The tabindex of the button'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as a Router Link component with a `to` attribute'
        },
        {
            name: 'type',
            type: ['button', 'submit', 'reset', 'undefined'],
            default: '',
            description: 'The type of the button'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the button'
        }
    ],
    events: [
        {
            description: 'Emitted when the button is clicked',
            name: 'click'
        }
    ],
    slots: [
        {
            name: 'loading',
            description: 'Slot for button loading state '
        },
        {
            name: 'default',
            description: 'Slot for default button content '
        }
    ],
    css: {
        selector: '.button',
        variables: [
            {
                name: '--button--font-weight',
                value: [
                    {
                        name: '--font-weight-normal'
                    }
                ]
            },
            {
                name: '--button--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--button--sm--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--button--md--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--button--lg--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--line-height',
                value: [
                    {
                        name: '--line-height'
                    }
                ]
            },
            {
                name: '--button--color',
                variants: [
                    {
                        name: '--button--primary--color',
                        value: [
                            {
                                name: '--contrast-text-color-primary'
                            }
                        ]
                    },
                    {
                        name: '--button--secondary--color',
                        value: [
                            {
                                name: '--contrast-text-color-secondary'
                            }
                        ]
                    },
                    {
                        name: '--button--light--color',
                        value: [
                            {
                                name: '--contrast-text-color-light'
                            }
                        ]
                    },
                    {
                        name: '--button--dark--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    },
                    {
                        name: '--button--info--color',
                        value: [
                            {
                                name: '--contrast-text-color-info'
                            }
                        ]
                    },
                    {
                        name: '--button--success--color',
                        value: [
                            {
                                name: '--contrast-text-color-success'
                            }
                        ]
                    },
                    {
                        name: '--button--warning--color',
                        value: [
                            {
                                name: '--contrast-text-color-warning'
                            }
                        ]
                    },
                    {
                        name: '--button--danger--color',
                        value: [
                            {
                                name: '--contrast-text-color-danger'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--background',
                variants: [
                    {
                        name: '--button--primary--background',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--button--secondary--background',
                        value: [
                            {
                                name: '--color-secondary'
                            }
                        ]
                    },
                    {
                        name: '--button--light--background',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    },
                    {
                        name: '--button--dark--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    },
                    {
                        name: '--button--info--background',
                        value: [
                            {
                                name: '--color-info'
                            }
                        ]
                    },
                    {
                        name: '--button--success--background',
                        value: [
                            {
                                name: '--color-success'
                            }
                        ]
                    },
                    {
                        name: '--button--warning--background',
                        value: [
                            {
                                name: '--color-warning'
                            }
                        ]
                    },
                    {
                        name: '--button--danger--background',
                        value: [
                            {
                                name: '--color-danger'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--border-style',
                value: [
                    {
                        name: '--button--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--button--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--button--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--button--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--border-width',
                value: [
                    {
                        name: '--button--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--button--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--button--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--button--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--border-color',
                value: [
                    {
                        name: '--button--border-top-color',
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--button--primary--border-top-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--border-top-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--border-top-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--border-top-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--border-top-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--border-top-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--border-right-color',
                        value: [
                            {
                                name: '--border-right-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--button--primary--border-right-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--border-right-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--border-right-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--border-right-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--border-right-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--border-right-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--border-bottom-color',
                        value: [
                            {
                                name: '--border-bottom-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--button--primary--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--border-left-color',
                        value: [
                            {
                                name: '--border-left-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--button--primary--border-left-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--border-left-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--border-left-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--border-left-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--border-left-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--border-left-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--border-left-color',
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
                name: '--button--border-radius',
                value: [
                    {
                        name: '--button--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--button--sm--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--button--md--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--button--lg--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--border-top-right-radius',
                        value: [
                            {
                                name: '--border-top-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--button--sm--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--button--md--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--button--lg--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--border-bottom-right-radius',
                        value: [
                            {
                                name: '--border-bottom-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--button--sm--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--button--md--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--button--lg--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--button--sm--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--button--md--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--button--lg--border-bottom-left-radius',
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
                name: '--button--box-shadow',
                value: [
                    {
                        name: '--button--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--button--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--button--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--button--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--button--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--padding',
                value: [
                    {
                        name: '--button--padding-top',
                        value: [
                            {
                                name: '--padding-top'
                            }
                        ],
                        variants: [
                            {
                                name: '--button--sm--padding-top',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-top) * var(--size-multiplier-sm)) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--button--md--padding-top',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-top) * var(--size-multiplier-md)) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--button--lg--padding-top',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-top) * var(--size-multiplier-lg)) * 0.5)'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--padding-right',
                        value: [
                            {
                                name: '--padding-right'
                            }
                        ],
                        variants: [
                            {
                                name: '--button--sm--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--button--md--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--button--lg--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--padding-bottom',
                        value: [
                            {
                                name: '--padding-bottom'
                            }
                        ],
                        variants: [
                            {
                                name: '--button--sm--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-bottom) * var(--size-multiplier-sm)) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--button--md--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-bottom) * var(--size-multiplier-md)) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--button--lg--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-bottom) * var(--size-multiplier-lg)) * 0.5)'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--padding-left',
                        value: [
                            {
                                name: '--padding-left'
                            }
                        ],
                        variants: [
                            {
                                name: '--button--sm--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--button--md--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--button--lg--padding-left',
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
                name: '--button--transition-property',
                value: [
                    {
                        value: '(background-color, color, border-color)'
                    }
                ]
            },
            {
                name: '--button--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--button--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--button--hover--background',
                variants: [
                    {
                        name: '--button--primary--hover--background',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--button--secondary--hover--background',
                        value: [
                            {
                                name: '--color-secondary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--button--light--hover--background',
                        value: [
                            {
                                name: '--color-light-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--button--dark--hover--background',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    },
                    {
                        name: '--button--info--hover--background',
                        value: [
                            {
                                name: '--color-info-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--button--success--hover--background',
                        value: [
                            {
                                name: '--color-success-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--button--warning--hover--background',
                        value: [
                            {
                                name: '--color-warning-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--button--danger--hover--background',
                        value: [
                            {
                                name: '--color-danger-shade-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--hover--border-color'
            },
            {
                name: '--button--active--background',
                variants: [
                    {
                        name: '--button--primary--active--background',
                        value: [
                            {
                                name: '--color-primary-shade-100'
                            }
                        ]
                    },
                    {
                        name: '--button--secondary--active--background',
                        value: [
                            {
                                name: '--color-secondary-shade-100'
                            }
                        ]
                    },
                    {
                        name: '--button--light--active--background',
                        value: [
                            {
                                name: '--color-light-shade-100'
                            }
                        ]
                    },
                    {
                        name: '--button--dark--active--background',
                        value: [
                            {
                                name: '--color-dark-tint-100'
                            }
                        ]
                    },
                    {
                        name: '--button--info--active--background',
                        value: [
                            {
                                name: '--color-info-shade-100'
                            }
                        ]
                    },
                    {
                        name: '--button--success--active--background',
                        value: [
                            {
                                name: '--color-success-shade-100'
                            }
                        ]
                    },
                    {
                        name: '--button--warning--active--background',
                        value: [
                            {
                                name: '--color-warning-shade-100'
                            }
                        ]
                    },
                    {
                        name: '--button--danger--active--background',
                        value: [
                            {
                                name: '--color-danger-shade-100'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--disabled--opacity',
                value: [
                    {
                        value: '0.8'
                    }
                ]
            },
            {
                name: '--button--block--margin-top',
                value: [
                    {
                        name: '--margin-top'
                    }
                ]
            },
            {
                name: '--button--link--color',
                value: [
                    {
                        name: '--button--color'
                    }
                ],
                variants: [
                    {
                        name: '--button--primary--link--color',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--button--secondary--link--color',
                        value: [
                            {
                                name: '--color-secondary'
                            }
                        ]
                    },
                    {
                        name: '--button--light--link--color',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    },
                    {
                        name: '--button--dark--link--color',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    },
                    {
                        name: '--button--info--link--color',
                        value: [
                            {
                                name: '--color-info'
                            }
                        ]
                    },
                    {
                        name: '--button--success--link--color',
                        value: [
                            {
                                name: '--color-success'
                            }
                        ]
                    },
                    {
                        name: '--button--warning--link--color',
                        value: [
                            {
                                name: '--color-warning'
                            }
                        ]
                    },
                    {
                        name: '--button--danger--link--color',
                        value: [
                            {
                                name: '--color-danger'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--link--active--color',
                value: [
                    {
                        name: '--button--color'
                    }
                ],
                variants: [
                    {
                        name: '--button--primary--link--active--color',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--button--secondary--link--active--color',
                        value: [
                            {
                                name: '--color-secondary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--button--light--link--active--color',
                        value: [
                            {
                                name: '--color-light-shade-100'
                            }
                        ]
                    },
                    {
                        name: '--button--dark--link--active--color',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    },
                    {
                        name: '--button--info--link--active--color',
                        value: [
                            {
                                name: '--color-info-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--button--success--link--active--color',
                        value: [
                            {
                                name: '--color-success-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--button--warning--link--active--color',
                        value: [
                            {
                                name: '--color-warning-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--button--danger--link--active--color',
                        value: [
                            {
                                name: '--color-danger-shade-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--circle--size',
                variants: [
                    {
                        name: '--button--sm--circle--size',
                        value: [
                            {
                                value: 'calc(34px * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--button--md--circle--size',
                        value: [
                            {
                                value: 'calc(42px * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--button--lg--circle--size',
                        value: [
                            {
                                value: 'calc(49px * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
