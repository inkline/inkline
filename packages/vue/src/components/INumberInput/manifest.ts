import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'INumberInput',
    props: [
        {
            name: 'modelValue',
            type: ['String', 'Number'],
            default: '',
            description: 'Used to set the field value'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The unique identifier of the input'
        },
        {
            name: 'min',
            type: ['Number'],
            default: '-Infinity',
            description: 'The minimum allowed input value'
        },
        {
            name: 'max',
            type: ['Number'],
            default: '+Infinity',
            description: 'The maximum allowed input value'
        },
        {
            name: 'precision',
            type: ['Number'],
            default: '0',
            description: 'The precision of the input value, for floating point numbers'
        },
        {
            name: 'step',
            type: ['Number'],
            default: '1',
            description: 'The increment step to increase or decrease the value by'
        },
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
            name: 'validateSchema',
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
        selector: '.input',
        variables: [
            {
                name: '--input--background',
                value: [
                    {
                        name: '--input--background-h',
                        value: [
                            {
                                name: '--color-white-h'
                            }
                        ]
                    },
                    {
                        name: '--input--background-s',
                        value: [
                            {
                                name: '--color-white-s'
                            }
                        ]
                    },
                    {
                        name: '--input--background-l',
                        value: [
                            {
                                name: '--color-white-l'
                            }
                        ]
                    },
                    {
                        name: '--input--background-a',
                        value: [
                            {
                                name: '--color-white-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--input--light--background',
                        value: [
                            {
                                name: '--input--light--background-h',
                                value: [
                                    {
                                        name: '--color-white-h'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--background-s',
                                value: [
                                    {
                                        name: '--color-white-s'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--background-l',
                                value: [
                                    {
                                        name: '--color-white-l'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--background-a',
                                value: [
                                    {
                                        name: '--color-white-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--light--disabled--background',
                        value: [
                            {
                                name: '--input--light--disabled--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--disabled--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--disabled--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--disabled--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--light--prepend--background',
                        value: [
                            {
                                name: '--input--light--prepend--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--prepend--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--prepend--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--prepend--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--light--append--background',
                        value: [
                            {
                                name: '--input--light--append--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--append--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--append--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--append--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--dark--background',
                        value: [
                            {
                                name: '--input--dark--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--dark--disabled--background',
                        value: [
                            {
                                name: '--input--dark--disabled--background-h',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--disabled--background-s',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--disabled--background-l',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--disabled--background-a',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--dark--prepend--background',
                        value: [
                            {
                                name: '--input--dark--prepend--background-h',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--prepend--background-s',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--prepend--background-l',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--prepend--background-a',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--dark--append--background',
                        value: [
                            {
                                name: '--input--dark--append--background-h',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--append--background-s',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--append--background-l',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--append--background-a',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
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
                        value: []
                    },
                    {
                        name: '--input--border-right-color',
                        value: []
                    },
                    {
                        name: '--input--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--input--border-left-color',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--input--light--border-color',
                        value: [
                            {
                                name: '--input--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--light--hover--border-color',
                        value: [
                            {
                                name: '--input--light--hover--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-100'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--hover--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-100'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--hover--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-100'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--hover--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-100'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--dark--border-color',
                        value: [
                            {
                                name: '--input--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--border-left-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--dark--hover--border-color',
                        value: [
                            {
                                name: '--input--dark--hover--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-100'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--hover--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-100'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--hover--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-100'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--hover--border-left-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-100'
                                    }
                                ]
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
                        value: []
                    },
                    {
                        name: '--input--border-bottom-left-radius',
                        value: []
                    },
                    {
                        name: '--input--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--input--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--input--border-top-left-radius',
                        value: []
                    },
                    {
                        name: '--input--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--input--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--input--border-bottom-left-radius',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--input--sm--border-radius',
                        value: [
                            {
                                name: '--input--sm--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--input--sm--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--input--sm--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--input--sm--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius-sm'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--md--border-radius',
                        value: [
                            {
                                name: '--input--md--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--input--md--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--input--md--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--input--md--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius-md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--lg--border-radius',
                        value: [
                            {
                                name: '--input--lg--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--input--lg--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--input--lg--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--input--lg--border-bottom-left-radius',
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
                name: '--input--box-shadow',
                value: []
            },
            {
                name: '--input--font-size',
                value: [],
                variants: [
                    {
                        name: '--input--sm--font-size',
                        value: [
                            {
                                name: '--font-size-sm'
                            }
                        ]
                    },
                    {
                        name: '--input--md--font-size',
                        value: [
                            {
                                name: '--font-size-md'
                            }
                        ]
                    },
                    {
                        name: '--input--lg--font-size',
                        value: [
                            {
                                name: '--font-size-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--transition',
                value: [
                    {
                        name: '--input--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
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
                        name: '--input--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
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
                    }
                ]
            },
            {
                name: '--input--color',
                value: [
                    {
                        name: '--input--color-h',
                        value: [
                            {
                                name: '--contrast-text-color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--input--color-s',
                        value: [
                            {
                                name: '--contrast-text-color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--input--color-l',
                        value: [
                            {
                                name: '--contrast-text-color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--input--color-a',
                        value: [
                            {
                                name: '--contrast-text-color-light-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--input--light--color',
                        value: [
                            {
                                name: '--input--light--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--input--light--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--dark--color',
                        value: [
                            {
                                name: '--input--dark--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--input--dark--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-a'
                                    }
                                ]
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
                        value: []
                    },
                    {
                        name: '--input--padding-right',
                        value: []
                    },
                    {
                        name: '--input--padding-bottom',
                        value: []
                    },
                    {
                        name: '--input--padding-left',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--input--sm--padding',
                        value: [
                            {
                                name: '--input--sm--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top-sm) * 3 / 4)'
                                    }
                                ]
                            },
                            {
                                name: '--input--sm--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-sm'
                                    }
                                ]
                            },
                            {
                                name: '--input--sm--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom-sm) * 3 / 4)'
                                    }
                                ]
                            },
                            {
                                name: '--input--sm--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-sm'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--md--padding',
                        value: [
                            {
                                name: '--input--md--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top-md) * 3 / 4)'
                                    }
                                ]
                            },
                            {
                                name: '--input--md--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-md'
                                    }
                                ]
                            },
                            {
                                name: '--input--md--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom-md) * 3 / 4)'
                                    }
                                ]
                            },
                            {
                                name: '--input--md--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--input--lg--padding',
                        value: [
                            {
                                name: '--input--lg--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top-lg) * 3 / 4)'
                                    }
                                ]
                            },
                            {
                                name: '--input--lg--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-lg'
                                    }
                                ]
                            },
                            {
                                name: '--input--lg--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom-lg) * 3 / 4)'
                                    }
                                ]
                            },
                            {
                                name: '--input--lg--padding-left',
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
                name: '--input--placeholder--color',
                value: [
                    {
                        name: '--input--placeholder--color-h',
                        value: [
                            {
                                name: '--text-color-weaker-h'
                            }
                        ]
                    },
                    {
                        name: '--input--placeholder--color-s',
                        value: [
                            {
                                name: '--text-color-weaker-s'
                            }
                        ]
                    },
                    {
                        name: '--input--placeholder--color-l',
                        value: [
                            {
                                name: '--text-color-weaker-l'
                            }
                        ]
                    },
                    {
                        name: '--input--placeholder--color-a',
                        value: [
                            {
                                name: '--text-color-weaker-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--prefix--border-width',
                value: [
                    {
                        name: '--input--prefix--border-right-width'
                    }
                ]
            },
            {
                name: '--input--prefix--border-style',
                value: [
                    {
                        name: '--input--prefix--border-right-style'
                    }
                ]
            },
            {
                name: '--input--prefix--border-color',
                value: []
            },
            {
                name: '--input--prefix--color',
                value: [
                    {
                        name: '--input--prefix--color-h',
                        value: [
                            {
                                name: '--text-color-weaker-h'
                            }
                        ]
                    },
                    {
                        name: '--input--prefix--color-s',
                        value: [
                            {
                                name: '--text-color-weaker-s'
                            }
                        ]
                    },
                    {
                        name: '--input--prefix--color-l',
                        value: [
                            {
                                name: '--text-color-weaker-l'
                            }
                        ]
                    },
                    {
                        name: '--input--prefix--color-a',
                        value: [
                            {
                                name: '--text-color-weaker-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--prefix--padding',
                value: [
                    {
                        name: '--input--prefix--padding-left'
                    },
                    {
                        name: '--input--prefix--padding-right'
                    }
                ]
            },
            {
                name: '--input--prefix--transition',
                value: [
                    {
                        name: '--input--prefix--transition-property'
                    },
                    {
                        name: '--input--prefix--transition-duration'
                    },
                    {
                        name: '--input--prefix--transition-timing-function'
                    }
                ]
            },
            {
                name: '--input--suffix--border-width',
                value: [
                    {
                        name: '--input--suffix--border-left-width'
                    }
                ]
            },
            {
                name: '--input--suffix--border-style',
                value: [
                    {
                        name: '--input--suffix--border-left-style'
                    }
                ]
            },
            {
                name: '--input--suffix--border-color',
                value: []
            },
            {
                name: '--input--suffix--color',
                value: [
                    {
                        name: '--input--suffix--color-h',
                        value: [
                            {
                                name: '--text-color-weaker-h'
                            }
                        ]
                    },
                    {
                        name: '--input--suffix--color-s',
                        value: [
                            {
                                name: '--text-color-weaker-s'
                            }
                        ]
                    },
                    {
                        name: '--input--suffix--color-l',
                        value: [
                            {
                                name: '--text-color-weaker-l'
                            }
                        ]
                    },
                    {
                        name: '--input--suffix--color-a',
                        value: [
                            {
                                name: '--text-color-weaker-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--suffix--padding',
                value: [
                    {
                        name: '--input--suffix--padding-left'
                    },
                    {
                        name: '--input--suffix--padding-right'
                    }
                ]
            },
            {
                name: '--input--suffix--transition',
                value: [
                    {
                        name: '--input--suffix--transition-property'
                    },
                    {
                        name: '--input--suffix--transition-duration'
                    },
                    {
                        name: '--input--suffix--transition-timing-function'
                    }
                ]
            },
            {
                name: '--input--icon--color',
                value: [
                    {
                        name: '--input--icon--color-h',
                        value: [
                            {
                                name: '--text-color-weak-h'
                            }
                        ]
                    },
                    {
                        name: '--input--icon--color-s',
                        value: [
                            {
                                name: '--text-color-weak-s'
                            }
                        ]
                    },
                    {
                        name: '--input--icon--color-l',
                        value: [
                            {
                                name: '--text-color-weak-l'
                            }
                        ]
                    },
                    {
                        name: '--input--icon--color-a',
                        value: [
                            {
                                name: '--text-color-weak-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--icon--transition',
                value: [
                    {
                        name: '--input--icon--transition-property'
                    },
                    {
                        name: '--input--icon--transition-duration'
                    },
                    {
                        name: '--input--icon--transition-timing-function'
                    }
                ]
            },
            {
                name: '--input--icon--width',
                value: [
                    {
                        value: 'auto'
                    }
                ]
            },
            {
                name: '--input--icon--height',
                value: []
            },
            {
                name: '--input--icon--hover--color',
                value: []
            },
            {
                name: '--input--icon--focus--color',
                value: []
            },
            {
                name: '--input--hover--border-color',
                value: [
                    {
                        name: '--input--hover--border-top-color',
                        value: []
                    },
                    {
                        name: '--input--hover--border-right-color',
                        value: []
                    },
                    {
                        name: '--input--hover--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--input--hover--border-left-color',
                        value: []
                    }
                ]
            },
            {
                name: '--input--focus--box-shadow',
                value: []
            },
            {
                name: '--input--focus--border-color',
                value: [
                    {
                        name: '--input--focus--border-top-color',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--input--focus--border-right-color',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--input--focus--border-bottom-color',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--input--focus--border-left-color',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--value-overlay--padding',
                value: [
                    {
                        name: '--input--value-overlay--padding-left'
                    },
                    {
                        name: '--input--value-overlay--padding-right'
                    }
                ]
            },
            {
                name: '--input--prepend--background',
                value: []
            },
            {
                name: '--input--prepend--font-size',
                value: []
            },
            {
                name: '--input--prepend--line-height',
                value: []
            },
            {
                name: '--input--prepend--transition',
                value: [
                    {
                        name: '--input--prepend--transition-property'
                    },
                    {
                        name: '--input--prepend--transition-duration'
                    },
                    {
                        name: '--input--prepend--transition-timing-function'
                    }
                ]
            },
            {
                name: '--input--prepend--padding',
                value: [
                    {
                        name: '--input--prepend--padding-left'
                    },
                    {
                        name: '--input--prepend--padding-right'
                    }
                ]
            },
            {
                name: '--input--append--background',
                value: []
            },
            {
                name: '--input--append--font-size',
                value: []
            },
            {
                name: '--input--append--line-height',
                value: []
            },
            {
                name: '--input--append--transition',
                value: [
                    {
                        name: '--input--append--transition-property'
                    },
                    {
                        name: '--input--append--transition-duration'
                    },
                    {
                        name: '--input--append--transition-timing-function'
                    }
                ]
            },
            {
                name: '--input--append--padding',
                value: [
                    {
                        name: '--input--append--padding-left'
                    },
                    {
                        name: '--input--append--padding-right'
                    }
                ]
            },
            {
                name: '--input--error--border-color',
                value: [
                    {
                        name: '--input--error--border-top-color',
                        value: [
                            {
                                name: '--color-danger'
                            }
                        ]
                    },
                    {
                        name: '--input--error--border-right-color',
                        value: [
                            {
                                name: '--color-danger'
                            }
                        ]
                    },
                    {
                        name: '--input--error--border-bottom-color',
                        value: [
                            {
                                name: '--color-danger'
                            }
                        ]
                    },
                    {
                        name: '--input--error--border-left-color',
                        value: [
                            {
                                name: '--color-danger'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--disabled--background',
                value: [
                    {
                        name: '--input--disabled--background-h',
                        value: [
                            {
                                name: '--color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--input--disabled--background-s',
                        value: [
                            {
                                name: '--color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--input--disabled--background-l',
                        value: [
                            {
                                name: '--color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--input--disabled--background-a',
                        value: [
                            {
                                name: '--color-light-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--input--disabled--border-color',
                value: []
            },
            {
                name: '--input--disabled--color',
                value: []
            }
        ]
    }
};

export default manifest;
