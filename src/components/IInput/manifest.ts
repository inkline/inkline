import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IInput',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the input'
        },
        {
            name: 'clearable',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the input as clearable'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the input'
        },
        {
            name: 'error',
            type: ['Boolean', 'Array'],
            default: "'touched', 'dirty', 'invalid'",
            description: 'The error state of the input, computed based on schema by default.'
        },
        {
            name: 'id',
            type: ['String'],
            default: '',
            description: 'The id of the internal input element'
        },
        {
            name: 'wrapperId',
            type: ['String'],
            default: '',
            description: 'The id of the input wrapper element'
        },
        {
            name: 'modelValue',
            type: ['String', 'Number'],
            default: "''",
            description: 'Used to set the field value'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The unique identifier of the input'
        },
        {
            name: 'plaintext',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the input as plaintext, disabling interaction'
        },
        {
            name: 'readonly',
            type: ['Boolean'],
            default: 'false',
            description: 'The readonly state of the input'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the input'
        },
        {
            name: 'tabindex',
            type: ['Number', 'String'],
            default: '0',
            description: 'The tabindex of the input'
        },
        {
            name: 'type',
            type: ['String'],
            default: 'text',
            description: 'The type of the input'
        },
        {
            name: 'clearAriaLabel',
            type: ['String'],
            default: 'Clear',
            description: 'The aria-label of the clear button'
        },
        {
            name: 'validate',
            type: ['Boolean'],
            default: 'true',
            description: 'Enable input validation using schema'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        },
        {
            description: 'Event emitted when clearing the input element',
            name: 'clear'
        }
    ],
    slots: [
        {
            name: 'prepend',
            description: 'Slot for the input prepend content '
        },
        {
            name: 'prefix',
            description: 'Slot for the input prefix content '
        },
        {
            name: 'clearable',
            description: 'Slot for the clearable button '
        },
        {
            name: 'suffix',
            description: 'Slot for the input suffix content '
        },
        {
            name: 'append',
            description: 'Slot for the input append content '
        }
    ],
    css: {
        selector: '.input-wrapper',
        variables: [
            {
                name: '--input--border-width',
                value: [
                    {
                        name: '--input--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--input--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--input--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--input--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--border-style',
                value: [
                    {
                        name: '--input--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--input--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--input--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--input--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--border-color',
                value: [
                    {
                        name: '--input--border-top-color',
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ]
                    },
                    {
                        name: '--input--border-right-color',
                        value: [
                            {
                                name: '--border-right-color'
                            }
                        ]
                    },
                    {
                        name: '--input--border-bottom-color',
                        value: [
                            {
                                name: '--border-bottom-color'
                            }
                        ]
                    },
                    {
                        name: '--input--border-left-color',
                        value: [
                            {
                                name: '--border-left-color'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--input--light--border-color',
                        value: [
                            {
                                name: '--color-light-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--input--dark--border-color',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--border-radius',
                value: [
                    {
                        name: '--input--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--input--sm--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--input--md--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--input--lg--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--border-top-right-radius',
                        value: [
                            {
                                name: '--border-top-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--input--sm--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--input--md--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--input--lg--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--border-bottom-right-radius',
                        value: [
                            {
                                name: '--border-bottom-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--input--sm--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--input--md--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--input--lg--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--input--sm--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--input--md--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--input--lg--border-bottom-left-radius',
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
                name: '--input--box-shadow',
                value: [
                    {
                        name: '--input--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--input--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--input--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--input--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--input--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--transition-property',
                value: [
                    {
                        value: 'background-color,\n            color,\n            border-color,\n            box-shadow'
                    }
                ]
            },
            {
                name: '--input--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--input--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--input--color',
                variants: [
                    {
                        name: '--input--light--color',
                        value: [
                            {
                                name: '--contrast-text-color-white'
                            }
                        ]
                    },
                    {
                        name: '--input--dark--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--background',
                variants: [
                    {
                        name: '--input--light--background',
                        value: [
                            {
                                name: '--color-white'
                            }
                        ]
                    },
                    {
                        name: '--input--dark--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--input--sm--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--input--md--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--input--lg--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--hover--border-color',
                variants: [
                    {
                        name: '--input--light--hover--border-color',
                        value: [
                            {
                                name: '--color-light-shade-100'
                            }
                        ]
                    },
                    {
                        name: '--input--dark--hover--border-color',
                        value: [
                            {
                                name: '--color-dark-tint-100'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--focus--border-color',
                variants: [
                    {
                        name: '--input--light--focus--border-color',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--input--dark--focus--border-color',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--line-height',
                value: [
                    {
                        name: '--line-height'
                    }
                ]
            },
            {
                name: '--input--padding',
                value: [
                    {
                        name: '--input--padding-top',
                        value: [
                            {
                                name: '--padding-top'
                            }
                        ],
                        variants: [
                            {
                                name: '--input--sm--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top) * 0.5 * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--input--md--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top) * 0.5 * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--input--lg--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top) * 0.5 * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--padding-right',
                        value: [
                            {
                                name: '--padding-right'
                            }
                        ],
                        variants: [
                            {
                                name: '--input--sm--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--input--md--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--input--lg--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--padding-bottom',
                        value: [
                            {
                                name: '--padding-bottom'
                            }
                        ],
                        variants: [
                            {
                                name: '--input--sm--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom) * 0.5 * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--input--md--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom) * 0.5 * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--input--lg--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom) * 0.5 * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--padding-left',
                        value: [
                            {
                                name: '--padding-left'
                            }
                        ],
                        variants: [
                            {
                                name: '--input--sm--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--input--md--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--input--lg--padding-left',
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
                name: '--input--placeholder--color',
                variants: [
                    {
                        name: '--input--light--placeholder--color',
                        value: [
                            {
                                name: '--color-gray-300'
                            }
                        ]
                    },
                    {
                        name: '--input--dark--placeholder--color',
                        value: [
                            {
                                name: '--color-gray-600'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--prefix-suffix--color',
                variants: [
                    {
                        name: '--input--light--prefix-suffix--color',
                        value: [
                            {
                                name: '--color-gray-700'
                            }
                        ]
                    },
                    {
                        name: '--input--dark--prefix-suffix--color',
                        value: [
                            {
                                name: '--color-dark-250'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--prefix-suffix--padding-right',
                value: [
                    {
                        name: '--input--padding-right',
                        value: [
                            {
                                name: '--padding-right'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--prefix-suffix--padding-left',
                value: [
                    {
                        name: '--input--padding-left',
                        value: [
                            {
                                name: '--padding-left'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--prefix--border-right-width',
                value: [
                    {
                        name: '--input--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--prefix--border-right-style',
                value: [
                    {
                        name: '--input--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--suffix--border-left-width',
                value: [
                    {
                        name: '--input--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--prefix--border-left-style',
                value: [
                    {
                        name: '--input--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--clear--size'
            },
            {
                name: '--input--clear--background',
                variants: [
                    {
                        name: '--input--light--clear--background',
                        value: [
                            {
                                value: 'transparent'
                            }
                        ]
                    },
                    {
                        name: '--input--dark--clear--background',
                        value: [
                            {
                                value: 'transparent'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--clear--color',
                variants: [
                    {
                        name: '--input--light--clear--color',
                        value: [
                            {
                                name: '--contrast-text-color-white'
                            }
                        ]
                    },
                    {
                        name: '--input--dark--clear--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--clear--hover--color',
                value: [
                    {
                        name: '--input--clear--color'
                    }
                ]
            },
            {
                name: '--input--clear--hover--background',
                value: [
                    {
                        name: '--input--clear--background'
                    }
                ],
                variants: [
                    {
                        name: '--input--light--clear--hover--background',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    },
                    {
                        name: '--input--dark--clear--hover--background',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--clear--active--background',
                value: [
                    {
                        name: '--input--clear--background'
                    }
                ]
            },
            {
                name: '--input-line-height',
                value: [
                    {
                        name: '--line-height'
                    }
                ]
            },
            {
                name: '--input--prepend-append--background',
                variants: [
                    {
                        name: '--input--light--prepend-append--background',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    },
                    {
                        name: '--input--dark--prepend-append--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--prepend-append--padding-left',
                value: [
                    {
                        name: '--input--padding-left',
                        value: [
                            {
                                name: '--padding-left'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--prepend-append--padding-right',
                value: [
                    {
                        name: '--input--padding-right',
                        value: [
                            {
                                name: '--padding-right'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--error--border-color',
                value: [
                    {
                        name: '--color-danger'
                    }
                ]
            },
            {
                name: '--input--disabled--color',
                value: [
                    {
                        name: '--input--color'
                    }
                ],
                variants: [
                    {
                        name: '--input--light--disabled--color',
                        value: [
                            {
                                name: '--text-color-weak'
                            }
                        ]
                    },
                    {
                        name: '--input--dark--disabled--color',
                        value: [
                            {
                                name: '--text-color-weak'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--disabled--background',
                value: [
                    {
                        name: '--input--background'
                    }
                ],
                variants: [
                    {
                        name: '--input--light--disabled--background',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    },
                    {
                        name: '--input--dark--disabled--background',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
