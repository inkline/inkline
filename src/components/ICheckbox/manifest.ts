import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ICheckbox',
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
            description: 'Enable checkbox validation using schema'
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
            description: 'Slot for default checkbox label '
        }
    ],
    css: {
        selector: '.checkbox',
        variables: [
            {
                name: '--checkbox--margin-right',
                value: [
                    {
                        name: '--margin-right'
                    }
                ]
            },
            {
                name: '--checkbox--transition-property',
                value: [
                    {
                        value: 'color'
                    }
                ]
            },
            {
                name: '--checkbox--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--checkbox--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--checkbox--label--color',
                variants: [
                    {
                        name: '--checkbox--light--label--color',
                        value: [
                            {
                                name: '--contrast-text--color-light'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--dark--label--color',
                        value: [
                            {
                                name: '--contrast-text--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--label--font-size',
                variants: [
                    {
                        name: '--checkbox--sm--label--font-size',
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
                        name: '--checkbox--md--label--font-size',
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
                        name: '--checkbox--lg--label--font-size',
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
                name: '--checkbox--size',
                variants: [
                    {
                        name: '--checkbox--sm--size',
                        value: [
                            {
                                name: '--size-multiplier-sm'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--md--size',
                        value: [
                            {
                                name: '--size-multiplier-md'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--lg--size',
                        value: [
                            {
                                name: '--size-multiplier-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--size',
                variants: [
                    {
                        name: '--checkbox--sm--size',
                        value: [
                            {
                                name: '--size-multiplier-sm'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--md--size',
                        value: [
                            {
                                name: '--size-multiplier-md'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--lg--size',
                        value: [
                            {
                                name: '--size-multiplier-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--border-width',
                value: [
                    {
                        name: '--checkbox--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--border-style',
                value: [
                    {
                        name: '--checkbox--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--border-color',
                value: [
                    {
                        name: '--checkbox--border-top-color',
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkbox--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkbox--border-right-color',
                        value: [
                            {
                                name: '--border-right-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkbox--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkbox--border-bottom-color',
                        value: [
                            {
                                name: '--border-bottom-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkbox--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkbox--border-left-color',
                        value: [
                            {
                                name: '--border-left-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkbox--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--dark--border-left-color',
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
                name: '--checkbox--border-radius',
                value: [
                    {
                        name: '--checkbox--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkbox--sm--border-top-left-radius',
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
                                name: '--checkbox--md--border-top-left-radius',
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
                                name: '--checkbox--lg--border-top-left-radius',
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
                        name: '--checkbox--border-top-right-radius',
                        value: [
                            {
                                name: '--border-top-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkbox--sm--border-top-right-radius',
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
                                name: '--checkbox--md--border-top-right-radius',
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
                                name: '--checkbox--lg--border-top-right-radius',
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
                        name: '--checkbox--border-bottom-right-radius',
                        value: [
                            {
                                name: '--border-bottom-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkbox--sm--border-bottom-right-radius',
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
                                name: '--checkbox--md--border-bottom-right-radius',
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
                                name: '--checkbox--lg--border-bottom-right-radius',
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
                        name: '--checkbox--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkbox--sm--border-bottom-left-radius',
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
                                name: '--checkbox--md--border-bottom-left-radius',
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
                                name: '--checkbox--lg--border-bottom-left-radius',
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
                name: '--checkbox--box-shadow',
                value: [
                    {
                        name: '--checkbox--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--margin-right',
                value: [
                    {
                        name: '--margin-right-1-2'
                    }
                ]
            },
            {
                name: '--checkbox--transition-property',
                value: [
                    {
                        value: 'background-color,\n                border-color'
                    }
                ]
            },
            {
                name: '--checkbox--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--checkbox--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--checkbox--background',
                variants: [
                    {
                        name: '--checkbox--light--background',
                        value: [
                            {
                                name: '--color-white'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--dark--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--checkmark--size',
                variants: [
                    {
                        name: '--checkbox--sm--checkmark--size',
                        value: [
                            {
                                name: '--size-multiplier-sm'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--md--checkmark--size',
                        value: [
                            {
                                name: '--size-multiplier-md'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--lg--checkmark--size',
                        value: [
                            {
                                name: '--size-multiplier-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--checkmark--size',
                variants: [
                    {
                        name: '--checkbox--sm--checkmark--size',
                        value: [
                            {
                                name: '--size-multiplier-sm'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--md--checkmark--size',
                        value: [
                            {
                                name: '--size-multiplier-md'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--lg--checkmark--size',
                        value: [
                            {
                                name: '--size-multiplier-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--transition-property',
                value: [
                    {
                        value: '(transform)'
                    }
                ]
            },
            {
                name: '--checkbox--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--checkbox--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--checkbox--color',
                variants: [
                    {
                        name: '--checkbox--light--color',
                        value: [
                            {
                                name: '--color-white'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--dark--color',
                        value: [
                            {
                                name: '--color-white'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--checked--border-color',
                value: [
                    {
                        name: '--checkbox--border-color'
                    }
                ],
                variants: [
                    {
                        name: '--checkbox--light--checked--border-color',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--dark--checked--border-color',
                        value: [
                            {
                                name: '--color-primary-tint-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--checked--background',
                value: [
                    {
                        name: '--checkbox--background',
                        variants: [
                            {
                                name: '--checkbox--light--background',
                                value: [
                                    {
                                        name: '--color-white'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--dark--background',
                                value: [
                                    {
                                        name: '--color-dark'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--checkbox--light--checked--background',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--dark--checked--background',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--disabled--label--color',
                value: [
                    {
                        name: '--checkbox--label--color',
                        variants: [
                            {
                                name: '--checkbox--light--label--color',
                                value: [
                                    {
                                        name: '--contrast-text--color-light'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--dark--label--color',
                                value: [
                                    {
                                        name: '--contrast-text--color-dark'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--checkbox--light--disabled--label--color',
                        value: [
                            {
                                name: '--text--color-muted'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--dark--disabled--label--color',
                        value: [
                            {
                                name: '--text--color-muted'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--disabled--border-color',
                value: [
                    {
                        name: '--checkbox--border-color'
                    }
                ],
                variants: [
                    {
                        name: '--checkbox--light--disabled--border-color',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--dark--disabled--border-color',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--disabled--background',
                value: [
                    {
                        name: '--checkbox--background',
                        variants: [
                            {
                                name: '--checkbox--light--background',
                                value: [
                                    {
                                        name: '--color-white'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--dark--background',
                                value: [
                                    {
                                        name: '--color-dark'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--checkbox--light--disabled--background',
                        value: [
                            {
                                name: '--color-gray-50'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--dark--disabled--background',
                        value: [
                            {
                                name: '--color-dark-tint-100'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--checked--disabled--border-color',
                value: [
                    {
                        name: '--checkbox--border-color'
                    }
                ],
                variants: [
                    {
                        name: '--checkbox--light--checked--disabled--border-color',
                        value: [
                            {
                                name: '--color-primary-400'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--dark--checked--disabled--border-color',
                        value: [
                            {
                                name: '--color-primary-700'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--checked--disabled--background',
                value: [
                    {
                        name: '--checkbox--background',
                        variants: [
                            {
                                name: '--checkbox--light--background',
                                value: [
                                    {
                                        name: '--color-white'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--dark--background',
                                value: [
                                    {
                                        name: '--color-dark'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--checkbox--light--checked--disabled--background',
                        value: [
                            {
                                name: '--color-primary-300'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--dark--checked--disabled--background',
                        value: [
                            {
                                name: '--color-primary-800'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--disabled--color',
                value: [
                    {
                        name: '--checkbox--color',
                        variants: [
                            {
                                name: '--checkbox--light--color',
                                value: [
                                    {
                                        name: '--color-white'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--dark--color',
                                value: [
                                    {
                                        name: '--color-white'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--checkbox--light--disabled--color',
                        value: [
                            {
                                name: '--color-white'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--dark--disabled--color',
                        value: [
                            {
                                name: '--color-white'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--margin-right',
                value: [
                    {
                        name: '--margin-right-1-2'
                    }
                ]
            }
        ]
    }
};

export default manifest;
