import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'Radio',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the radio'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the radio'
        },
        {
            name: 'error',
            type: ['Boolean', 'Array'],
            default: "'touched', 'dirty', 'invalid'",
            description: 'The error state of the radio, computed based on schema by default.'
        },
        {
            name: 'value',
            type: [],
            default: 'false',
            description: '[Deprecated] Used to set the radio value when used inside a radio group'
        },
        {
            name: 'modelValue',
            type: [],
            default: 'false',
            description: 'Used to set the radio value when used by itself'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The unique identifier of the radio'
        },
        {
            name: 'native',
            type: ['Boolean'],
            default: 'false',
            description: 'Displays the native browser radio input indicator'
        },
        {
            name: 'readonly',
            type: ['Boolean'],
            default: 'false',
            description: 'The readonly state of the radio'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the radio'
        },
        {
            name: 'tabindex',
            type: ['Number', 'String'],
            default: '0',
            description: 'The tabindex of the radio'
        },
        {
            name: 'label',
            type: ['String', 'Number', 'Boolean', 'Function', 'Object'],
            default: 'undefined',
            description:
                'The label to be displayed alongside the radio. Can be a string, number, render function, or component'
        },
        {
            name: 'option',
            type: ['Object'],
            default: 'undefined',
            description: 'The option object of the radio when used inside a radio group'
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
            description: 'Slot for default radio label '
        }
    ],
    css: {
        selector: '.radio',
        variables: [
            {
                name: '--radio--margin',
                value: [
                    {
                        name: '--radio--margin-right',
                        value: []
                    },
                    {
                        name: '--radio--margin-right',
                        value: []
                    },
                    {
                        name: '--radio--margin-bottom',
                        value: []
                    },
                    {
                        name: '--radio--margin-top',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--radio--margin-left',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--radio--sm--margin',
                        value: [
                            {
                                name: '--radio--sm--margin-right',
                                value: [
                                    {
                                        value: 'calc(var(--margin-right-sm) / 2)'
                                    }
                                ]
                            },
                            {
                                name: '--radio--sm--margin-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--margin-bottom-sm) / 2)'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--radio--md--margin',
                        value: [
                            {
                                name: '--radio--md--margin-right',
                                value: [
                                    {
                                        value: 'calc(var(--margin-right-md) / 2)'
                                    }
                                ]
                            },
                            {
                                name: '--radio--md--margin-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--margin-bottom-md) / 2)'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--radio--lg--margin',
                        value: [
                            {
                                name: '--radio--lg--margin-right',
                                value: [
                                    {
                                        value: 'calc(var(--margin-right-lg) / 2)'
                                    }
                                ]
                            },
                            {
                                name: '--radio--lg--margin-bottom',
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
                name: '--radio--label--color',
                value: []
            },
            {
                name: '--radio--label--font-size',
                value: []
            },
            {
                name: '--radio--label--transition',
                value: [
                    {
                        name: '--radio--label--transition-property'
                    },
                    {
                        name: '--radio--label--transition-duration'
                    },
                    {
                        name: '--radio--label--transition-timing-function'
                    }
                ]
            },
            {
                name: '--radio--width',
                value: [],
                variants: [
                    {
                        name: '--radio--sm--width',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--radio--sm--checkmark--width',
                        value: [
                            {
                                value: 'calc(0.5rem * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--radio--md--width',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--radio--md--checkmark--width',
                        value: [
                            {
                                value: 'calc(0.5rem * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--radio--lg--width',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-lg))'
                            }
                        ]
                    },
                    {
                        name: '--radio--lg--checkmark--width',
                        value: [
                            {
                                value: 'calc(0.5rem * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--height',
                value: [],
                variants: [
                    {
                        name: '--radio--sm--height',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--radio--sm--checkmark--height',
                        value: [
                            {
                                value: 'calc(0.5rem * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--radio--md--height',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--radio--md--checkmark--height',
                        value: [
                            {
                                value: 'calc(0.5rem * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--radio--lg--height',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-lg))'
                            }
                        ]
                    },
                    {
                        name: '--radio--lg--checkmark--height',
                        value: [
                            {
                                value: 'calc(0.5rem * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--background',
                value: [
                    {
                        name: '--radio--background-h',
                        value: [
                            {
                                name: '--color-white-h'
                            }
                        ]
                    },
                    {
                        name: '--radio--background-s',
                        value: [
                            {
                                name: '--color-white-s'
                            }
                        ]
                    },
                    {
                        name: '--radio--background-l',
                        value: [
                            {
                                name: '--color-white-l'
                            }
                        ]
                    },
                    {
                        name: '--radio--background-a',
                        value: [
                            {
                                name: '--color-white-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--radio--disabled--background',
                        value: [
                            {
                                name: '--radio--disabled--background-h',
                                value: [
                                    {
                                        name: '--color-gray-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--radio--disabled--background-s',
                                value: [
                                    {
                                        name: '--color-gray-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--radio--disabled--background-l',
                                value: [
                                    {
                                        name: '--color-gray-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--radio--disabled--background-a',
                                value: [
                                    {
                                        name: '--color-gray-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--radio--light--background',
                        value: [
                            {
                                name: '--radio--light--background-h',
                                value: [
                                    {
                                        name: '--color-white-h'
                                    }
                                ]
                            },
                            {
                                name: '--radio--light--background-s',
                                value: [
                                    {
                                        name: '--color-white-s'
                                    }
                                ]
                            },
                            {
                                name: '--radio--light--background-l',
                                value: [
                                    {
                                        name: '--color-white-l'
                                    }
                                ]
                            },
                            {
                                name: '--radio--light--background-a',
                                value: [
                                    {
                                        name: '--color-white-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--radio--light--disabled--background',
                        value: [
                            {
                                name: '--radio--light--disabled--background-h',
                                value: [
                                    {
                                        name: '--color-gray-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--radio--light--disabled--background-s',
                                value: [
                                    {
                                        name: '--color-gray-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--radio--light--disabled--background-l',
                                value: [
                                    {
                                        name: '--color-gray-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--radio--light--disabled--background-a',
                                value: [
                                    {
                                        name: '--color-gray-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--radio--light--checked--disabled--background',
                        value: [
                            {
                                name: '--radio--light--checked--disabled--background-h',
                                value: [
                                    {
                                        name: '--color-primary-300-h'
                                    }
                                ]
                            },
                            {
                                name: '--radio--light--checked--disabled--background-s',
                                value: [
                                    {
                                        name: '--color-primary-300-s'
                                    }
                                ]
                            },
                            {
                                name: '--radio--light--checked--disabled--background-l',
                                value: [
                                    {
                                        name: '--color-primary-300-l'
                                    }
                                ]
                            },
                            {
                                name: '--radio--light--checked--disabled--background-a',
                                value: [
                                    {
                                        name: '--color-primary-300-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--radio--dark--background',
                        value: [
                            {
                                name: '--radio--dark--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--radio--dark--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--radio--dark--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--radio--dark--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--radio--dark--disabled--background',
                        value: [
                            {
                                name: '--radio--dark--disabled--background-h',
                                value: [
                                    {
                                        name: '--color-gray-600-h'
                                    }
                                ]
                            },
                            {
                                name: '--radio--dark--disabled--background-s',
                                value: [
                                    {
                                        name: '--color-gray-600-s'
                                    }
                                ]
                            },
                            {
                                name: '--radio--dark--disabled--background-l',
                                value: [
                                    {
                                        name: '--color-gray-600-l'
                                    }
                                ]
                            },
                            {
                                name: '--radio--dark--disabled--background-a',
                                value: [
                                    {
                                        name: '--color-gray-600-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--radio--dark--checked--disabled--background',
                        value: [
                            {
                                name: '--radio--dark--checked--disabled--background-h',
                                value: [
                                    {
                                        name: '--color-primary-700-h'
                                    }
                                ]
                            },
                            {
                                name: '--radio--dark--checked--disabled--background-s',
                                value: [
                                    {
                                        name: '--color-primary-700-s'
                                    }
                                ]
                            },
                            {
                                name: '--radio--dark--checked--disabled--background-l',
                                value: [
                                    {
                                        name: '--color-primary-700-l'
                                    }
                                ]
                            },
                            {
                                name: '--radio--dark--checked--disabled--background-a',
                                value: [
                                    {
                                        name: '--color-primary-700-a'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--border-width',
                value: [
                    {
                        name: '--radio--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--radio--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--radio--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--radio--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--border-style',
                value: [
                    {
                        name: '--radio--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--radio--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--radio--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--radio--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--border-color',
                value: [
                    {
                        name: '--radio--border-top-color',
                        value: []
                    },
                    {
                        name: '--radio--border-right-color',
                        value: []
                    },
                    {
                        name: '--radio--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--radio--border-left-color',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--radio--light--border-color',
                        value: [
                            {
                                name: '--radio--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--radio--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--radio--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--radio--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--radio--light--checked--disabled--border-color',
                        value: [
                            {
                                name: '--radio--light--checked--disabled--border-top-color',
                                value: []
                            },
                            {
                                name: '--radio--light--checked--disabled--border-right-color',
                                value: []
                            },
                            {
                                name: '--radio--light--checked--disabled--border-bottom-color',
                                value: []
                            },
                            {
                                name: '--radio--light--checked--disabled--border-left-color',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--radio--dark--border-color',
                        value: [
                            {
                                name: '--radio--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--radio--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--radio--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--radio--dark--border-left-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--radio--dark--checked--disabled--border-color',
                        value: [
                            {
                                name: '--radio--dark--checked--disabled--border-top-color',
                                value: []
                            },
                            {
                                name: '--radio--dark--checked--disabled--border-right-color',
                                value: []
                            },
                            {
                                name: '--radio--dark--checked--disabled--border-bottom-color',
                                value: []
                            },
                            {
                                name: '--radio--dark--checked--disabled--border-left-color',
                                value: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--box-shadow',
                value: []
            },
            {
                name: '--radio--transition',
                value: [
                    {
                        name: '--radio--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color,\n      transform'
                            }
                        ]
                    },
                    {
                        name: '--radio--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--radio--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    },
                    {
                        name: '--radio--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color,\n      transform'
                            }
                        ]
                    },
                    {
                        name: '--radio--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--radio--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--checkmark--transition',
                value: [
                    {
                        name: '--radio--checkmark--transition-property'
                    },
                    {
                        name: '--radio--checkmark--transition-duration'
                    },
                    {
                        name: '--radio--checkmark--transition-timing-function'
                    }
                ]
            },
            {
                name: '--radio--checkmark--color',
                value: [
                    {
                        name: '--radio--checkmark--color-h',
                        value: [
                            {
                                name: '--color-white-h'
                            }
                        ]
                    },
                    {
                        name: '--radio--checkmark--color-s',
                        value: [
                            {
                                name: '--color-white-s'
                            }
                        ]
                    },
                    {
                        name: '--radio--checkmark--color-l',
                        value: [
                            {
                                name: '--color-white-l'
                            }
                        ]
                    },
                    {
                        name: '--radio--checkmark--color-a',
                        value: [
                            {
                                name: '--color-white-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--checkmark--width',
                value: []
            },
            {
                name: '--radio--checkmark--height',
                value: []
            },
            {
                name: '--radio--checked--border-color',
                value: [
                    {
                        name: '--radio--checked--border-top-color',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--radio--checked--border-right-color',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--radio--checked--border-bottom-color',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--radio--checked--border-left-color',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--checked--background',
                value: [
                    {
                        name: '--radio--checked--background-h',
                        value: [
                            {
                                name: '--color-primary-h'
                            }
                        ]
                    },
                    {
                        name: '--radio--checked--background-s',
                        value: [
                            {
                                name: '--color-primary-s'
                            }
                        ]
                    },
                    {
                        name: '--radio--checked--background-l',
                        value: [
                            {
                                name: '--color-primary-l'
                            }
                        ]
                    },
                    {
                        name: '--radio--checked--background-a',
                        value: [
                            {
                                name: '--color-primary-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--label--disabled--color',
                value: []
            },
            {
                name: '--checkbox--label--disabled--color',
                value: []
            },
            {
                name: '--radio--checked--disabled--border-color',
                value: [
                    {
                        name: '--radio--checked--disabled--border-top-color',
                        value: []
                    },
                    {
                        name: '--radio--checked--disabled--border-right-color',
                        value: []
                    },
                    {
                        name: '--radio--checked--disabled--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--radio--checked--disabled--border-left-color',
                        value: []
                    }
                ]
            },
            {
                name: '--radio--checked--disabled--background',
                value: [
                    {
                        name: '--radio--checked--disabled--background-h',
                        value: [
                            {
                                name: '--color-primary-300-h'
                            }
                        ]
                    },
                    {
                        name: '--radio--checked--disabled--background-s',
                        value: [
                            {
                                name: '--color-primary-300-s'
                            }
                        ]
                    },
                    {
                        name: '--radio--checked--disabled--background-l',
                        value: [
                            {
                                name: '--color-primary-300-l'
                            }
                        ]
                    },
                    {
                        name: '--radio--checked--disabled--background-a',
                        value: [
                            {
                                name: '--color-primary-300-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--checkmark--disabled--color',
                value: []
            }
        ]
    }
};

export default manifest;
