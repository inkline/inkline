import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IToggle',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the checkbox'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the checkbox'
        },
        {
            name: 'error',
            type: ['Boolean', 'Array'],
            default: "'touched', 'dirty', 'invalid'",
            description: 'The error state of the checkbox, computed based on schema by default.'
        },
        {
            name: 'indeterminate',
            type: ['Boolean'],
            default: 'false',
            description: 'The indeterminate state of the checkbox'
        },
        {
            name: 'value',
            type: [],
            default: 'false',
            description: 'Used to set the checkbox value when used inside a checkbox group'
        },
        {
            name: 'modelValue',
            type: [],
            default: 'false',
            description: 'Used to set the checkbox value when used by itself'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The unique identifier of the checkbox'
        },
        {
            name: 'native',
            type: ['Boolean'],
            default: 'false',
            description: 'Displays the native browser checkbox input indicator'
        },
        {
            name: 'readonly',
            type: ['Boolean'],
            default: 'false',
            description: 'The readonly state of the checkbox'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the checkbox'
        },
        {
            name: 'tabindex',
            type: ['Number', 'String'],
            default: '0',
            description: 'The tabindex of the checkbox'
        },
        {
            name: 'validate',
            type: ['Boolean'],
            default: 'true',
            description: 'Enable toggle validation using schema'
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
            name: 'default',
            description: 'Slot for default toggle label '
        }
    ],
    css: {
        selector: '.toggle',
        variables: [
            {
                name: '--toggle--checked--background',
                value: [
                    {
                        name: '--color-primary'
                    }
                ],
                variants: [
                    {
                        name: '--toggle--light--checked--background',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--toggle--dark--checked--background',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--checked--border-color',
                value: [
                    {
                        name: '--toggle--checked--border-top-color',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ],
                        variants: [
                            {
                                name: '--toggle--light--checked--border-top-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--checked--border-top-color',
                                value: [
                                    {
                                        name: '--color-primary-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--border-right-color',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ],
                        variants: [
                            {
                                name: '--toggle--light--checked--border-right-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--checked--border-right-color',
                                value: [
                                    {
                                        name: '--color-primary-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--border-bottom-color',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ],
                        variants: [
                            {
                                name: '--toggle--light--checked--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--checked--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-primary-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--border-left-color',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ],
                        variants: [
                            {
                                name: '--toggle--light--checked--border-left-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--checked--border-left-color',
                                value: [
                                    {
                                        name: '--color-primary-tint-50'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--checked--indicator--background',
                value: [
                    {
                        name: '--color-white'
                    }
                ]
            },
            {
                name: '--toggle--disabled--label--color',
                variants: [
                    {
                        name: '--toggle--light--disabled--label--color',
                        value: [
                            {
                                name: '--text--color-muted'
                            }
                        ]
                    },
                    {
                        name: '--toggle--dark--disabled--label--color',
                        value: [
                            {
                                name: '--text--color-muted'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--disabled--background',
                variants: [
                    {
                        name: '--toggle--light--disabled--background',
                        value: [
                            {
                                name: '--color-light-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--toggle--dark--disabled--background',
                        value: [
                            {
                                name: '--color-dark-tint-100'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--disabled--border-color',
                value: [
                    {
                        name: '--toggle--disabled--border-top-color',
                        value: [
                            {
                                name: '--toggle--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--toggle--light--border-top-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--toggle--dark--border-top-color',
                                        value: [
                                            {
                                                name: '--color-dark-tint-50'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--toggle--light--disabled--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--disabled--border-right-color',
                        value: [
                            {
                                name: '--toggle--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--toggle--light--border-right-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--toggle--dark--border-right-color',
                                        value: [
                                            {
                                                name: '--color-dark-tint-50'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--toggle--light--disabled--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--disabled--border-bottom-color',
                        value: [
                            {
                                name: '--toggle--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--toggle--light--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--toggle--dark--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-dark-tint-50'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--toggle--light--disabled--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--disabled--border-left-color',
                        value: [
                            {
                                name: '--toggle--border-left-color',
                                value: [
                                    {
                                        name: '--border-left-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--toggle--light--border-left-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--toggle--dark--border-left-color',
                                        value: [
                                            {
                                                name: '--color-dark-tint-50'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--toggle--light--disabled--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--toggle--dark--disabled--border-color',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--disabled--indicator--background',
                variants: [
                    {
                        name: '--toggle--dark--disabled--indicator--background',
                        value: [
                            {
                                name: '--color-gray-400'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--checked--disabled--background',
                variants: [
                    {
                        name: '--toggle--light--checked--disabled--background',
                        value: [
                            {
                                name: '--color-primary-200'
                            }
                        ]
                    },
                    {
                        name: '--toggle--dark--checked--disabled--background',
                        value: [
                            {
                                name: '--color-primary-800'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--checked--disabled--border-color',
                value: [
                    {
                        name: '--toggle--checked--disabled--border-top-color',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--disabled--border-right-color',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--disabled--border-bottom-color',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--disabled--border-left-color',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--toggle--light--checked--disabled--border-color',
                        value: [
                            {
                                name: '--color-primary-300'
                            }
                        ]
                    },
                    {
                        name: '--toggle--dark--checked--disabled--border-color',
                        value: [
                            {
                                name: '--color-primary-900'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--checked--disabled--indicator--background',
                variants: [
                    {
                        name: '--toggle--dark--checked--disabled--indicator--background',
                        value: [
                            {
                                name: '--color-gray-300'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--label--color',
                value: [
                    {
                        name: '--toggle--color'
                    }
                ],
                variants: [
                    {
                        name: '--toggle--light--label--color',
                        value: [
                            {
                                name: '--contrast-text--color-white'
                            }
                        ]
                    },
                    {
                        name: '--toggle--dark--label--color',
                        value: [
                            {
                                name: '--contrast-text--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--label--font-size',
                value: [
                    {
                        name: '--toggle--font-size',
                        value: [
                            {
                                name: '--font-size'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--toggle--sm--label--font-size',
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
                        name: '--toggle--md--label--font-size',
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
                        name: '--toggle--lg--label--font-size',
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
                name: '--toggle--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--toggle--transition-property',
                value: [
                    {
                        value: 'background-color,\n                border-color,\n                transform'
                    }
                ]
            },
            {
                name: '--toggle--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--toggle--border-width',
                value: [
                    {
                        name: '--toggle--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--toggle--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--toggle--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--toggle--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--border-style',
                value: [
                    {
                        name: '--toggle--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--toggle--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--toggle--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--toggle--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--border-color',
                value: [
                    {
                        name: '--toggle--border-top-color',
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--toggle--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--border-right-color',
                        value: [
                            {
                                name: '--border-right-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--toggle--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--border-bottom-color',
                        value: [
                            {
                                name: '--border-bottom-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--toggle--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--border-left-color',
                        value: [
                            {
                                name: '--border-left-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--toggle--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--border-left-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--margin-right',
                value: [
                    {
                        name: '--margin-right'
                    }
                ]
            },
            {
                name: '--toggle--background',
                variants: [
                    {
                        name: '--toggle--light--background',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    },
                    {
                        name: '--toggle--dark--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--width',
                value: [
                    {
                        value: '40px'
                    }
                ],
                variants: [
                    {
                        name: '--toggle--sm--width',
                        value: [
                            {
                                name: '--size-multiplier-sm'
                            }
                        ]
                    },
                    {
                        name: '--toggle--md--width',
                        value: [
                            {
                                name: '--size-multiplier-md'
                            }
                        ]
                    },
                    {
                        name: '--toggle--lg--width',
                        value: [
                            {
                                name: '--size-multiplier-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--height',
                value: [
                    {
                        value: '20px'
                    }
                ],
                variants: [
                    {
                        name: '--toggle--sm--height',
                        value: [
                            {
                                name: '--size-multiplier-sm'
                            }
                        ]
                    },
                    {
                        name: '--toggle--md--height',
                        value: [
                            {
                                name: '--size-multiplier-md'
                            }
                        ]
                    },
                    {
                        name: '--toggle--lg--height',
                        value: [
                            {
                                name: '--size-multiplier-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--border-radius',
                value: [
                    {
                        name: '--toggle--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--toggle--sm--border-top-left-radius',
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
                                name: '--toggle--md--border-top-left-radius',
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
                                name: '--toggle--lg--border-top-left-radius',
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
                        name: '--toggle--border-top-right-radius',
                        value: [
                            {
                                name: '--border-top-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--toggle--sm--border-top-right-radius',
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
                                name: '--toggle--md--border-top-right-radius',
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
                                name: '--toggle--lg--border-top-right-radius',
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
                        name: '--toggle--border-bottom-right-radius',
                        value: [
                            {
                                name: '--border-bottom-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--toggle--sm--border-bottom-right-radius',
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
                                name: '--toggle--md--border-bottom-right-radius',
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
                                name: '--toggle--lg--border-bottom-right-radius',
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
                        name: '--toggle--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--toggle--sm--border-bottom-left-radius',
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
                                name: '--toggle--md--border-bottom-left-radius',
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
                                name: '--toggle--lg--border-bottom-left-radius',
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
                name: '--toggle--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--toggle--transition-property',
                value: [
                    {
                        value: 'background-color,\n                border-color,\n                transform'
                    }
                ]
            },
            {
                name: '--toggle--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--toggle--indicator--background',
                variants: [
                    {
                        name: '--toggle--light--indicator--background',
                        value: [
                            {
                                name: '--color-white'
                            }
                        ]
                    },
                    {
                        name: '--toggle--light--indicator--background',
                        value: [
                            {
                                name: '--color-white'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--indicator--width',
                value: [
                    {
                        value: '16px'
                    }
                ],
                variants: [
                    {
                        name: '--toggle--sm--indicator--width',
                        value: [
                            {
                                name: '--size-multiplier-sm'
                            }
                        ]
                    },
                    {
                        name: '--toggle--md--indicator--width',
                        value: [
                            {
                                name: '--size-multiplier-md'
                            }
                        ]
                    },
                    {
                        name: '--toggle--lg--indicator--width',
                        value: [
                            {
                                name: '--size-multiplier-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--indicator--height',
                value: [
                    {
                        value: '16px'
                    }
                ],
                variants: [
                    {
                        name: '--toggle--sm--indicator--height',
                        value: [
                            {
                                name: '--size-multiplier-sm'
                            }
                        ]
                    },
                    {
                        name: '--toggle--md--indicator--height',
                        value: [
                            {
                                name: '--size-multiplier-md'
                            }
                        ]
                    },
                    {
                        name: '--toggle--lg--indicator--height',
                        value: [
                            {
                                name: '--size-multiplier-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--indicator--border-radius',
                value: [
                    {
                        name: '--toggle--indicator--border-top-left-radius',
                        value: [
                            {
                                name: '--toggle--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--toggle--sm--border-top-left-radius',
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
                                        name: '--toggle--md--border-top-left-radius',
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
                                        name: '--toggle--lg--border-top-left-radius',
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
                            }
                        ]
                    },
                    {
                        name: '--toggle--indicator--border-top-right-radius',
                        value: [
                            {
                                name: '--toggle--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--toggle--sm--border-top-right-radius',
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
                                        name: '--toggle--md--border-top-right-radius',
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
                                        name: '--toggle--lg--border-top-right-radius',
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
                            }
                        ]
                    },
                    {
                        name: '--toggle--indicator--border-bottom-right-radius',
                        value: [
                            {
                                name: '--toggle--border-bottom-right-radius',
                                value: [
                                    {
                                        name: '--border-bottom-right-radius'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--toggle--sm--border-bottom-right-radius',
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
                                        name: '--toggle--md--border-bottom-right-radius',
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
                                        name: '--toggle--lg--border-bottom-right-radius',
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
                            }
                        ]
                    },
                    {
                        name: '--toggle--indicator--border-bottom-left-radius',
                        value: [
                            {
                                name: '--toggle--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--toggle--sm--border-bottom-left-radius',
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
                                        name: '--toggle--md--border-bottom-left-radius',
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
                                        name: '--toggle--lg--border-bottom-left-radius',
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
                    }
                ]
            },
            {
                name: '--toggle--rounded--border-radius',
                value: [
                    {
                        name: '--toggle--rounded--border-top-left-radius',
                        value: [
                            {
                                name: '--toggle--height',
                                variants: [
                                    {
                                        name: '--toggle--sm--height',
                                        value: [
                                            {
                                                name: '--size-multiplier-sm'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--toggle--md--height',
                                        value: [
                                            {
                                                name: '--size-multiplier-md'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--toggle--lg--height',
                                        value: [
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
                        name: '--toggle--rounded--border-top-right-radius',
                        value: [
                            {
                                name: '--toggle--height',
                                variants: [
                                    {
                                        name: '--toggle--sm--height',
                                        value: [
                                            {
                                                name: '--size-multiplier-sm'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--toggle--md--height',
                                        value: [
                                            {
                                                name: '--size-multiplier-md'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--toggle--lg--height',
                                        value: [
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
                        name: '--toggle--rounded--border-bottom-right-radius',
                        value: [
                            {
                                name: '--toggle--height',
                                variants: [
                                    {
                                        name: '--toggle--sm--height',
                                        value: [
                                            {
                                                name: '--size-multiplier-sm'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--toggle--md--height',
                                        value: [
                                            {
                                                name: '--size-multiplier-md'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--toggle--lg--height',
                                        value: [
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
                        name: '--toggle--rounded--border-bottom-left-radius',
                        value: [
                            {
                                name: '--toggle--height',
                                variants: [
                                    {
                                        name: '--toggle--sm--height',
                                        value: [
                                            {
                                                name: '--size-multiplier-sm'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--toggle--md--height',
                                        value: [
                                            {
                                                name: '--size-multiplier-md'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--toggle--lg--height',
                                        value: [
                                            {
                                                name: '--size-multiplier-lg'
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
                name: '--toggle--rounded--indicator--border-radius',
                value: [
                    {
                        name: '--toggle--rounded--indicator--border-top-left-radius',
                        value: [
                            {
                                value: '50%'
                            }
                        ]
                    },
                    {
                        name: '--toggle--rounded--indicator--border-top-right-radius',
                        value: [
                            {
                                value: '50%'
                            }
                        ]
                    },
                    {
                        name: '--toggle--rounded--indicator--border-bottom-right-radius',
                        value: [
                            {
                                value: '50%'
                            }
                        ]
                    },
                    {
                        name: '--toggle--rounded--indicator--border-bottom-left-radius',
                        value: [
                            {
                                value: '50%'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
