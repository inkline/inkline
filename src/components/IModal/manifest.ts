import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IModal',
    props: [
        {
            name: 'closeOnPressEscape',
            type: ['Boolean'],
            default: 'true',
            description: 'Determines if the modal should close when pressing escape'
        },
        {
            name: 'closeAriaLabel',
            type: ['String'],
            default: 'Close',
            description: 'The aria-label attribute of the close button'
        },
        {
            name: 'color',
            type: ['primary', 'success', 'light', 'dark', 'info', 'success', 'warning', 'danger'],
            default: '',
            description: 'The color variant of the modal'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the modal'
        },
        {
            name: 'hideOnClickOutside',
            type: ['Boolean'],
            default: 'true',
            description: 'Determines if the modal should close when clicking the overlay'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The identifier of the modal'
        },
        {
            name: 'showClose',
            type: ['Boolean'],
            default: 'false',
            description: 'Determines if the close icon should be visible in the modal header'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the modal'
        },
        {
            name: 'modelValue',
            type: ['Boolean'],
            default: 'false',
            description: 'Used to determine if modal is visible or not'
        },
        {
            name: 'transition',
            type: [
                'fade-in-transition',
                'fade-in-linear-transition',
                'zoom-in-top-transition',
                'zoom-in-bottom-transition',
                'zoom-in-center-transition',
                'zoom-in-left-transition',
                'zoom-in-right-transition'
            ],
            default: 'zoom-in-center-transition',
            description: 'The modal opening and closing animation'
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
            name: 'footer',
            description: 'Slot for modal header content '
        },
        {
            name: 'close',
            description: 'Close icon slot '
        },
        {
            name: 'default',
            description: 'Slot for modal body content '
        },
        {
            name: 'footer',
            description: 'Slot for modal footer content '
        }
    ],
    css: {
        selector: '.modal-wrapper',
        variables: [
            {
                name: '--modal--wrapper--background',
                value: [
                    {
                        value: 'rgba(0, 0, 0, 0.75)'
                    }
                ]
            },
            {
                name: '--modal--line-height',
                value: [
                    {
                        name: '--line-height'
                    }
                ]
            },
            {
                name: '--modal--width',
                value: [
                    {
                        value: '480px'
                    }
                ],
                variants: [
                    {
                        name: '--modal--sm--width',
                        value: [
                            {
                                value: 'calc(#{480px} * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--modal--md--width',
                        value: [
                            {
                                value: 'calc(#{480px} * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--modal--lg--width',
                        value: [
                            {
                                value: 'calc(#{480px} * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--modal--border-radius',
                value: [
                    {
                        name: '--modal--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--modal--sm--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--modal--md--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--modal--lg--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--border-top-right-radius',
                        value: [
                            {
                                name: '--border-top-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--modal--sm--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--modal--md--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--modal--lg--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--border-bottom-right-radius',
                        value: [
                            {
                                name: '--border-bottom-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--modal--sm--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--modal--md--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--modal--lg--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--modal--sm--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--modal--md--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--modal--lg--border-bottom-left-radius',
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
                name: '--modal--box-shadow',
                value: [
                    {
                        name: '--modal--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--modal--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--modal--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--modal--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--modal--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--modal--header--background',
                value: [
                    {
                        name: '--modal--background',
                        variants: [
                            {
                                name: '--modal--primary--background',
                                value: [
                                    {
                                        name: '--color-primary'
                                    }
                                ]
                            },
                            {
                                name: '--modal--secondary--background',
                                value: [
                                    {
                                        name: '--color-secondary'
                                    }
                                ]
                            },
                            {
                                name: '--modal--light--background',
                                value: [
                                    {
                                        name: '--color-white'
                                    }
                                ]
                            },
                            {
                                name: '--modal--dark--background',
                                value: [
                                    {
                                        name: '--color-dark'
                                    }
                                ]
                            },
                            {
                                name: '--modal--info--background',
                                value: [
                                    {
                                        name: '--color-info'
                                    }
                                ]
                            },
                            {
                                name: '--modal--success--background',
                                value: [
                                    {
                                        name: '--color-success'
                                    }
                                ]
                            },
                            {
                                name: '--modal--warning--background',
                                value: [
                                    {
                                        name: '--color-warning'
                                    }
                                ]
                            },
                            {
                                name: '--modal--danger--background',
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
                        name: '--modal--primary--header--background',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--modal--secondary--header--background',
                        value: [
                            {
                                name: '--color-secondary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--modal--light--header--background',
                        value: [
                            {
                                name: '--color-gray-50'
                            }
                        ]
                    },
                    {
                        name: '--modal--dark--header--background',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    },
                    {
                        name: '--modal--info--header--background',
                        value: [
                            {
                                name: '--color-info-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--modal--success--header--background',
                        value: [
                            {
                                name: '--color-success-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--modal--warning--header--background',
                        value: [
                            {
                                name: '--color-warning-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--modal--danger--header--background',
                        value: [
                            {
                                name: '--color-danger-shade-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--modal--header--border-style',
                value: [
                    {
                        name: '--modal--header--border-top-style',
                        value: [
                            {
                                name: '--modal--border-top-style',
                                value: [
                                    {
                                        name: '--border-top-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--header--border-right-style',
                        value: [
                            {
                                name: '--modal--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--header--border-bottom-style',
                        value: [
                            {
                                name: '--modal--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--header--border-left-style',
                        value: [
                            {
                                name: '--modal--border-left-style',
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
                name: '--modal--header--border-width',
                value: [
                    {
                        name: '--modal--header--border-top-width',
                        value: [
                            {
                                name: '--modal--border-top-width',
                                value: [
                                    {
                                        name: '--border-top-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--header--border-right-width',
                        value: [
                            {
                                name: '--modal--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--header--border-bottom-width',
                        value: [
                            {
                                name: '--modal--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--header--border-left-width',
                        value: [
                            {
                                name: '--modal--border-left-width',
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
                name: '--modal--header--border-color',
                value: [
                    {
                        name: '--modal--header--border-top-color',
                        value: [
                            {
                                name: '--modal--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--modal--primary--border-top-color',
                                        value: [
                                            {
                                                name: '--color-primary-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--secondary--border-top-color',
                                        value: [
                                            {
                                                name: '--color-secondary-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--light--border-top-color',
                                        value: [
                                            {
                                                name: '--color-light'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--dark--border-top-color',
                                        value: [
                                            {
                                                name: '--color-dark-tint-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--info--border-top-color',
                                        value: [
                                            {
                                                name: '--color-info-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--success--border-top-color',
                                        value: [
                                            {
                                                name: '--color-success-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--warning--border-top-color',
                                        value: [
                                            {
                                                name: '--color-warning-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--danger--border-top-color',
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
                        name: '--modal--header--border-right-color',
                        value: [
                            {
                                name: '--modal--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--modal--primary--border-right-color',
                                        value: [
                                            {
                                                name: '--color-primary-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--secondary--border-right-color',
                                        value: [
                                            {
                                                name: '--color-secondary-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--light--border-right-color',
                                        value: [
                                            {
                                                name: '--color-light'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--dark--border-right-color',
                                        value: [
                                            {
                                                name: '--color-dark-tint-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--info--border-right-color',
                                        value: [
                                            {
                                                name: '--color-info-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--success--border-right-color',
                                        value: [
                                            {
                                                name: '--color-success-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--warning--border-right-color',
                                        value: [
                                            {
                                                name: '--color-warning-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--danger--border-right-color',
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
                        name: '--modal--header--border-bottom-color',
                        value: [
                            {
                                name: '--modal--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--modal--primary--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-primary-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--secondary--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-secondary-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--light--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-light'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--dark--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-dark-tint-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--info--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-info-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--success--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-success-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--warning--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-warning-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--danger--border-bottom-color',
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
                        name: '--modal--header--border-left-color',
                        value: [
                            {
                                name: '--modal--border-left-color',
                                value: [
                                    {
                                        name: '--border-left-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--modal--primary--border-left-color',
                                        value: [
                                            {
                                                name: '--color-primary-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--secondary--border-left-color',
                                        value: [
                                            {
                                                name: '--color-secondary-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--light--border-left-color',
                                        value: [
                                            {
                                                name: '--color-light'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--dark--border-left-color',
                                        value: [
                                            {
                                                name: '--color-dark-tint-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--info--border-left-color',
                                        value: [
                                            {
                                                name: '--color-info-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--success--border-left-color',
                                        value: [
                                            {
                                                name: '--color-success-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--warning--border-left-color',
                                        value: [
                                            {
                                                name: '--color-warning-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--danger--border-left-color',
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
                name: '--modal--header--padding',
                value: [
                    {
                        name: '--modal--header--padding-top',
                        value: [
                            {
                                name: '--modal--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--modal--sm--padding-top',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-top) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--md--padding-top',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-top) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--lg--padding-top',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-top) * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--header--padding-right',
                        value: [
                            {
                                name: '--modal--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--modal--sm--padding-right',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-right) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--md--padding-right',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-right) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--lg--padding-right',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-right) * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--header--padding-bottom',
                        value: [
                            {
                                name: '--modal--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--modal--sm--padding-bottom',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-bottom) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--md--padding-bottom',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-bottom) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--lg--padding-bottom',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-bottom) * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--header--padding-left',
                        value: [
                            {
                                name: '--modal--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--modal--sm--padding-left',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-left) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--md--padding-left',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-left) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--modal--lg--padding-left',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-left) * var(--size-multiplier-lg))'
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
                name: '--modal--header--color',
                value: [
                    {
                        name: '--modal--color',
                        variants: [
                            {
                                name: '--modal--primary--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-primary'
                                    }
                                ]
                            },
                            {
                                name: '--modal--secondary--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-secondary'
                                    }
                                ]
                            },
                            {
                                name: '--modal--light--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-white'
                                    }
                                ]
                            },
                            {
                                name: '--modal--dark--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark'
                                    }
                                ]
                            },
                            {
                                name: '--modal--info--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-info'
                                    }
                                ]
                            },
                            {
                                name: '--modal--success--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-success'
                                    }
                                ]
                            },
                            {
                                name: '--modal--warning--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-warning'
                                    }
                                ]
                            },
                            {
                                name: '--modal--danger--color',
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
                name: '--modal--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--modal--sm--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--modal--md--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--modal--lg--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--modal--body--background',
                value: [
                    {
                        name: '--modal--background'
                    }
                ]
            },
            {
                name: '--modal--body--color',
                value: [
                    {
                        name: '--modal--color'
                    }
                ]
            },
            {
                name: '--modal--body--border-style',
                value: [
                    {
                        name: '--modal--body--border-top-style',
                        value: [
                            {
                                name: '--modal--border-top-style',
                                value: [
                                    {
                                        name: '--border-top-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--body--border-right-style',
                        value: [
                            {
                                name: '--modal--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--body--border-bottom-style',
                        value: [
                            {
                                name: '--modal--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--body--border-left-style',
                        value: [
                            {
                                name: '--modal--border-left-style',
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
                name: '--modal--body--border-width',
                value: [
                    {
                        name: '--modal--body--border-top-width',
                        value: [
                            {
                                name: '--modal--border-top-width',
                                value: [
                                    {
                                        name: '--border-top-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--body--border-right-width',
                        value: [
                            {
                                name: '--modal--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--body--border-bottom-width',
                        value: [
                            {
                                name: '--modal--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--body--border-left-width',
                        value: [
                            {
                                name: '--modal--border-left-width',
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
                name: '--modal--body--border-color',
                value: [
                    {
                        name: '--modal--body--border-top-color',
                        value: [
                            {
                                name: '--modal--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--body--border-right-color',
                        value: [
                            {
                                name: '--modal--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--body--border-bottom-color',
                        value: [
                            {
                                name: '--modal--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--body--border-left-color',
                        value: [
                            {
                                name: '--modal--border-left-color',
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
                name: '--modal--body--padding',
                value: [
                    {
                        name: '--modal--body--padding-top',
                        value: [
                            {
                                name: '--modal--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--body--padding-right',
                        value: [
                            {
                                name: '--modal--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--body--padding-bottom',
                        value: [
                            {
                                name: '--modal--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--body--padding-left',
                        value: [
                            {
                                name: '--modal--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--modal--footer--background',
                value: [
                    {
                        name: '--modal--background'
                    }
                ],
                variants: [
                    {
                        name: '--modal--primary--footer--background',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--modal--secondary--footer--background',
                        value: [
                            {
                                name: '--color-secondary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--modal--light--footer--background',
                        value: [
                            {
                                name: '--color-gray-50'
                            }
                        ]
                    },
                    {
                        name: '--modal--dark--footer--background',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    },
                    {
                        name: '--modal--info--footer--background',
                        value: [
                            {
                                name: '--color-info-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--modal--success--footer--background',
                        value: [
                            {
                                name: '--color-success-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--modal--warning--footer--background',
                        value: [
                            {
                                name: '--color-warning-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--modal--danger--footer--background',
                        value: [
                            {
                                name: '--color-danger-shade-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--modal--footer--color',
                value: [
                    {
                        name: '--modal--color'
                    }
                ]
            },
            {
                name: '--modal--footer--border-style',
                value: [
                    {
                        name: '--modal--footer--border-top-style',
                        value: [
                            {
                                name: '--modal--border-top-style',
                                value: [
                                    {
                                        name: '--border-top-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--footer--border-right-style',
                        value: [
                            {
                                name: '--modal--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--footer--border-bottom-style',
                        value: [
                            {
                                name: '--modal--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--footer--border-left-style',
                        value: [
                            {
                                name: '--modal--border-left-style',
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
                name: '--modal--footer--border-width',
                value: [
                    {
                        name: '--modal--footer--border-top-width',
                        value: [
                            {
                                name: '--modal--border-top-width',
                                value: [
                                    {
                                        name: '--border-top-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--footer--border-right-width',
                        value: [
                            {
                                name: '--modal--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--footer--border-bottom-width',
                        value: [
                            {
                                name: '--modal--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--footer--border-left-width',
                        value: [
                            {
                                name: '--modal--border-left-width',
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
                name: '--modal--footer--border-color',
                value: [
                    {
                        name: '--modal--footer--border-top-color',
                        value: [
                            {
                                name: '--modal--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--footer--border-right-color',
                        value: [
                            {
                                name: '--modal--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--footer--border-bottom-color',
                        value: [
                            {
                                name: '--modal--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--footer--border-left-color',
                        value: [
                            {
                                name: '--modal--border-left-color',
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
                name: '--modal--footer--padding',
                value: [
                    {
                        name: '--modal--footer--padding-top',
                        value: [
                            {
                                name: '--modal--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--footer--padding-right',
                        value: [
                            {
                                name: '--modal--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--footer--padding-bottom',
                        value: [
                            {
                                name: '--modal--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--modal--footer--padding-left',
                        value: [
                            {
                                name: '--modal--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
