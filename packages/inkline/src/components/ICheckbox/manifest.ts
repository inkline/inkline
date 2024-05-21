import type { ComponentManifest } from '@inkline/inkline/types';

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
            description:
                '[Deprecated] Used to set the checkbox value when used inside a checkbox group'
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
            name: 'validateSchema',
            type: ['Boolean'],
            default: 'true',
            description: 'Enable checkbox validation using schema'
        },
        {
            name: 'label',
            type: ['String', 'Number', 'Boolean', 'Function', 'Object'],
            default: 'undefined',
            description:
                'The label to be displayed alongside the checkbox. Can be a string, number, render function, or component'
        },
        {
            name: 'option',
            type: ['Object'],
            default: 'undefined',
            description: 'The option object of the checkbox when used inside a checkbox group'
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
                name: '--checkbox--margin',
                value: [
                    {
                        name: '--checkbox--margin-right',
                        value: []
                    },
                    {
                        name: '--checkbox--margin-right',
                        value: []
                    },
                    {
                        name: '--checkbox--margin-bottom',
                        value: []
                    },
                    {
                        name: '--checkbox--margin-top',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--margin-left',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--checkbox--sm--margin',
                        value: [
                            {
                                name: '--checkbox--sm--margin-right',
                                value: [
                                    {
                                        value: 'calc(var(--margin-right-sm) / 2)'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--sm--margin-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--margin-bottom-sm) / 2)'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkbox--md--margin',
                        value: [
                            {
                                name: '--checkbox--md--margin-right',
                                value: [
                                    {
                                        value: 'calc(var(--margin-right-md) / 2)'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--md--margin-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--margin-bottom-md) / 2)'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkbox--lg--margin',
                        value: [
                            {
                                name: '--checkbox--lg--margin-right',
                                value: [
                                    {
                                        value: 'calc(var(--margin-right-lg) / 2)'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--lg--margin-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--margin-bottom-lg) / 2)'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--label--transition',
                value: [
                    {
                        name: '--checkbox--label--transition-property'
                    },
                    {
                        name: '--checkbox--label--transition-duration'
                    },
                    {
                        name: '--checkbox--label--transition-timing-function'
                    }
                ]
            },
            {
                name: '--checkbox--label--color',
                value: []
            },
            {
                name: '--checkbox--label--font-size',
                value: []
            },
            {
                name: '--checkbox--width',
                value: [],
                variants: [
                    {
                        name: '--checkbox--sm--width',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--sm--checkmark--width',
                        value: [
                            {
                                value: 'calc(0.5rem * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--md--width',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--md--checkmark--width',
                        value: [
                            {
                                value: 'calc(0.5rem * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--lg--width',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-lg))'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--lg--checkmark--width',
                        value: [
                            {
                                value: 'calc(0.5rem * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--height',
                value: [],
                variants: [
                    {
                        name: '--checkbox--sm--height',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--sm--checkmark--height',
                        value: [
                            {
                                value: 'calc(0.5rem * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--md--height',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--md--checkmark--height',
                        value: [
                            {
                                value: 'calc(0.5rem * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--lg--height',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-lg))'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--lg--checkmark--height',
                        value: [
                            {
                                value: 'calc(0.5rem * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--background',
                value: [
                    {
                        name: '--checkbox--background-h',
                        value: [
                            {
                                name: '--color-white-h'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--background-s',
                        value: [
                            {
                                name: '--color-white-s'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--background-l',
                        value: [
                            {
                                name: '--color-white-l'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--background-a',
                        value: [
                            {
                                name: '--color-white-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--checkbox--light--background',
                        value: [
                            {
                                name: '--checkbox--light--background-h',
                                value: [
                                    {
                                        name: '--color-white-h'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--light--background-s',
                                value: [
                                    {
                                        name: '--color-white-s'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--light--background-l',
                                value: [
                                    {
                                        name: '--color-white-l'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--light--background-a',
                                value: [
                                    {
                                        name: '--color-white-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkbox--light--disabled--background',
                        value: [
                            {
                                name: '--checkbox--light--disabled--background-h',
                                value: [
                                    {
                                        name: '--color-gray-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--light--disabled--background-s',
                                value: [
                                    {
                                        name: '--color-gray-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--light--disabled--background-l',
                                value: [
                                    {
                                        name: '--color-gray-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--light--disabled--background-a',
                                value: [
                                    {
                                        name: '--color-gray-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkbox--light--checked--disabled--background',
                        value: [
                            {
                                name: '--checkbox--light--checked--disabled--background-h',
                                value: []
                            },
                            {
                                name: '--checkbox--light--checked--disabled--background-s',
                                value: []
                            },
                            {
                                name: '--checkbox--light--checked--disabled--background-l',
                                value: []
                            },
                            {
                                name: '--checkbox--light--checked--disabled--background-a',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--checkbox--dark--background',
                        value: [
                            {
                                name: '--checkbox--dark--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--dark--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--dark--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--dark--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkbox--dark--disabled--background',
                        value: [
                            {
                                name: '--checkbox--dark--disabled--background-h',
                                value: [
                                    {
                                        name: '--color-gray-600-h'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--dark--disabled--background-s',
                                value: [
                                    {
                                        name: '--color-gray-600-s'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--dark--disabled--background-l',
                                value: [
                                    {
                                        name: '--color-gray-600-l'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--dark--disabled--background-a',
                                value: [
                                    {
                                        name: '--color-gray-600-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkbox--dark--checked--disabled--background',
                        value: [
                            {
                                name: '--checkbox--dark--checked--disabled--background-h',
                                value: []
                            },
                            {
                                name: '--checkbox--dark--checked--disabled--background-s',
                                value: []
                            },
                            {
                                name: '--checkbox--dark--checked--disabled--background-l',
                                value: []
                            },
                            {
                                name: '--checkbox--dark--checked--disabled--background-a',
                                value: []
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
                        value: []
                    },
                    {
                        name: '--checkbox--border-right-color',
                        value: []
                    },
                    {
                        name: '--checkbox--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--checkbox--border-left-color',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--checkbox--light--border-color',
                        value: [
                            {
                                name: '--checkbox--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkbox--light--checked--disabled--border-color',
                        value: [
                            {
                                name: '--checkbox--light--checked--disabled--border-top-color',
                                value: []
                            },
                            {
                                name: '--checkbox--light--checked--disabled--border-right-color',
                                value: []
                            },
                            {
                                name: '--checkbox--light--checked--disabled--border-bottom-color',
                                value: []
                            },
                            {
                                name: '--checkbox--light--checked--disabled--border-left-color',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--checkbox--dark--border-color',
                        value: [
                            {
                                name: '--checkbox--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
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
                            },
                            {
                                name: '--checkbox--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
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
                    },
                    {
                        name: '--checkbox--dark--checked--disabled--border-color',
                        value: [
                            {
                                name: '--checkbox--dark--checked--disabled--border-top-color',
                                value: []
                            },
                            {
                                name: '--checkbox--dark--checked--disabled--border-right-color',
                                value: []
                            },
                            {
                                name: '--checkbox--dark--checked--disabled--border-bottom-color',
                                value: []
                            },
                            {
                                name: '--checkbox--dark--checked--disabled--border-left-color',
                                value: []
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
                        value: []
                    },
                    {
                        name: '--checkbox--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--checkbox--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--checkbox--border-bottom-left-radius',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--checkbox--sm--border-radius',
                        value: [
                            {
                                name: '--checkbox--sm--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--sm--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--sm--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--checkbox--sm--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--checkbox--md--border-radius',
                        value: [
                            {
                                name: '--checkbox--md--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--md--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--md--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--checkbox--md--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--checkbox--lg--border-radius',
                        value: [
                            {
                                name: '--checkbox--lg--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--lg--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--checkbox--lg--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--checkbox--lg--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--box-shadow',
                value: []
            },
            {
                name: '--checkbox--transition',
                value: [
                    {
                        name: '--checkbox--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color,\n      transform'
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
                        name: '--checkbox--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color,\n      transform'
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
                    }
                ]
            },
            {
                name: '--checkbox--checkmark--transition',
                value: [
                    {
                        name: '--checkbox--checkmark--transition-property'
                    },
                    {
                        name: '--checkbox--checkmark--transition-duration'
                    },
                    {
                        name: '--checkbox--checkmark--transition-timing-function'
                    }
                ]
            },
            {
                name: '--checkbox--checkmark--color',
                value: [
                    {
                        name: '--checkbox--checkmark--color-h',
                        value: [
                            {
                                name: '--color-white-h'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--checkmark--color-s',
                        value: [
                            {
                                name: '--color-white-s'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--checkmark--color-l',
                        value: [
                            {
                                name: '--color-white-l'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--checkmark--color-a',
                        value: [
                            {
                                name: '--color-white-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--checkmark--width',
                value: []
            },
            {
                name: '--checkbox--checkmark--height',
                value: []
            },
            {
                name: '--checkbox--checked--border-color',
                value: [
                    {
                        name: '--checkbox--checked--border-top-color',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--checked--border-right-color',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--checked--border-bottom-color',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--checked--border-left-color',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--checked--background',
                value: [
                    {
                        name: '--checkbox--checked--background-h',
                        value: [
                            {
                                name: '--color-primary-h'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--checked--background-s',
                        value: [
                            {
                                name: '--color-primary-s'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--checked--background-l',
                        value: [
                            {
                                name: '--color-primary-l'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--checked--background-a',
                        value: [
                            {
                                name: '--color-primary-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--label--disabled--color',
                value: []
            },
            {
                name: '--checkbox--disabled--border-color',
                value: []
            },
            {
                name: '--checkbox--disabled--background',
                value: [
                    {
                        name: '--checkbox--disabled--background-h',
                        value: [
                            {
                                name: '--color-gray-100-h'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--disabled--background-s',
                        value: [
                            {
                                name: '--color-gray-100-s'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--disabled--background-l',
                        value: [
                            {
                                name: '--color-gray-100-l'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--disabled--background-a',
                        value: [
                            {
                                name: '--color-gray-100-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--checked--disabled--border-color',
                value: [
                    {
                        name: '--checkbox--checked--disabled--border-top-color',
                        value: []
                    },
                    {
                        name: '--checkbox--checked--disabled--border-right-color',
                        value: []
                    },
                    {
                        name: '--checkbox--checked--disabled--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--checkbox--checked--disabled--border-left-color',
                        value: []
                    }
                ]
            },
            {
                name: '--checkbox--checked--disabled--background',
                value: [
                    {
                        name: '--checkbox--checked--disabled--background-h',
                        value: [
                            {
                                name: '--color-primary-300-h'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--checked--disabled--background-s',
                        value: [
                            {
                                name: '--color-primary-300-s'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--checked--disabled--background-l',
                        value: [
                            {
                                name: '--color-primary-300-l'
                            }
                        ]
                    },
                    {
                        name: '--checkbox--checked--disabled--background-a',
                        value: [
                            {
                                name: '--color-primary-300-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkbox--checkmark--disabled--color',
                value: []
            }
        ]
    }
};

export default manifest;
