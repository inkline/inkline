import type { ComponentManifest } from '@inkline/devtools';

export const manifest: ComponentManifest = {
    name: 'Toggle',
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
            name: 'validateSchema',
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
                name: '--toggle--label--color',
                value: []
            },
            {
                name: '--toggle--label--font-size',
                value: []
            },
            {
                name: '--toggle--background',
                value: [
                    {
                        name: '--toggle--background-h',
                        value: [
                            {
                                name: '--color-light-shade-50-h'
                            }
                        ]
                    },
                    {
                        name: '--toggle--background-s',
                        value: [
                            {
                                name: '--color-light-shade-50-s'
                            }
                        ]
                    },
                    {
                        name: '--toggle--background-l',
                        value: [
                            {
                                name: '--color-light-shade-50-l'
                            }
                        ]
                    },
                    {
                        name: '--toggle--background-a',
                        value: [
                            {
                                name: '--color-light-shade-50-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--toggle--light--background',
                        value: [
                            {
                                name: '--toggle--light--background-h',
                                value: [
                                    {
                                        name: '--color-light-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--background-s',
                                value: [
                                    {
                                        name: '--color-light-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--background-l',
                                value: [
                                    {
                                        name: '--color-light-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--background-a',
                                value: [
                                    {
                                        name: '--color-light-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--light--disabled--background',
                        value: [
                            {
                                name: '--toggle--light--disabled--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--disabled--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--disabled--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--disabled--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--light--disabled--indicator--background',
                        value: [
                            {
                                name: '--toggle--light--disabled--indicator--background-h',
                                value: [
                                    {
                                        name: '--color-gray-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--disabled--indicator--background-s',
                                value: [
                                    {
                                        name: '--color-gray-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--disabled--indicator--background-l',
                                value: [
                                    {
                                        name: '--color-gray-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--disabled--indicator--background-a',
                                value: [
                                    {
                                        name: '--color-gray-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--light--readonly--background',
                        value: [
                            {
                                name: '--toggle--light--readonly--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--readonly--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--readonly--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--readonly--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--light--readonly--indicator--background',
                        value: [
                            {
                                name: '--toggle--light--readonly--indicator--background-h',
                                value: [
                                    {
                                        name: '--color-gray-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--readonly--indicator--background-s',
                                value: [
                                    {
                                        name: '--color-gray-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--readonly--indicator--background-l',
                                value: [
                                    {
                                        name: '--color-gray-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--readonly--indicator--background-a',
                                value: [
                                    {
                                        name: '--color-gray-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--light--checked--disabled--background',
                        value: [
                            {
                                name: '--toggle--light--checked--disabled--background-h',
                                value: []
                            },
                            {
                                name: '--toggle--light--checked--disabled--background-s',
                                value: []
                            },
                            {
                                name: '--toggle--light--checked--disabled--background-l',
                                value: []
                            },
                            {
                                name: '--toggle--light--checked--disabled--background-a',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--toggle--light--checked--readonly--background',
                        value: [
                            {
                                name: '--toggle--light--checked--readonly--background-h',
                                value: []
                            },
                            {
                                name: '--toggle--light--checked--readonly--background-s',
                                value: []
                            },
                            {
                                name: '--toggle--light--checked--readonly--background-l',
                                value: []
                            },
                            {
                                name: '--toggle--light--checked--readonly--background-a',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--toggle--dark--background',
                        value: [
                            {
                                name: '--toggle--dark--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--dark--disabled--background',
                        value: [
                            {
                                name: '--toggle--dark--disabled--background-h',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--disabled--background-s',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--disabled--background-l',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--disabled--background-a',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--dark--disabled--indicator--background',
                        value: [
                            {
                                name: '--toggle--dark--disabled--indicator--background-h',
                                value: [
                                    {
                                        name: '--color-gray-300-h'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--disabled--indicator--background-s',
                                value: [
                                    {
                                        name: '--color-gray-300-s'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--disabled--indicator--background-l',
                                value: [
                                    {
                                        name: '--color-gray-300-l'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--disabled--indicator--background-a',
                                value: [
                                    {
                                        name: '--color-gray-300-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--dark--readonly--background',
                        value: [
                            {
                                name: '--toggle--dark--readonly--background-h',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--readonly--background-s',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--readonly--background-l',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--readonly--background-a',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--dark--readonly--indicator--background',
                        value: [
                            {
                                name: '--toggle--dark--readonly--indicator--background-h',
                                value: [
                                    {
                                        name: '--color-gray-300-h'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--readonly--indicator--background-s',
                                value: [
                                    {
                                        name: '--color-gray-300-s'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--readonly--indicator--background-l',
                                value: [
                                    {
                                        name: '--color-gray-300-l'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--readonly--indicator--background-a',
                                value: [
                                    {
                                        name: '--color-gray-300-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--dark--checked--disabled--background',
                        value: [
                            {
                                name: '--toggle--dark--checked--disabled--background-h',
                                value: [
                                    {
                                        name: '--color-primary-800-h'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--checked--disabled--background-s',
                                value: [
                                    {
                                        name: '--color-primary-800-s'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--checked--disabled--background-l',
                                value: [
                                    {
                                        name: '--color-primary-800-l'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--checked--disabled--background-a',
                                value: [
                                    {
                                        name: '--color-primary-800-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--dark--checked--readonly--background',
                        value: [
                            {
                                name: '--toggle--dark--checked--readonly--background-h',
                                value: [
                                    {
                                        name: '--color-primary-800-h'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--checked--readonly--background-s',
                                value: [
                                    {
                                        name: '--color-primary-800-s'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--checked--readonly--background-l',
                                value: [
                                    {
                                        name: '--color-primary-800-l'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--checked--readonly--background-a',
                                value: [
                                    {
                                        name: '--color-primary-800-a'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--box-shadow',
                value: []
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
                        value: []
                    },
                    {
                        name: '--toggle--border-right-color',
                        value: []
                    },
                    {
                        name: '--toggle--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--toggle--border-left-color',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--toggle--light--border-color',
                        value: [
                            {
                                name: '--toggle--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-100'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-100'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-100'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-100'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--light--disabled--border-color',
                        value: [
                            {
                                name: '--toggle--light--disabled--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--disabled--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--disabled--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--disabled--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--light--readonly--border-color',
                        value: [
                            {
                                name: '--toggle--light--readonly--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--readonly--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--readonly--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--light--readonly--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--light--checked--disabled--border-color',
                        value: [
                            {
                                name: '--toggle--light--checked--disabled--border-top-color',
                                value: []
                            },
                            {
                                name: '--toggle--light--checked--disabled--border-right-color',
                                value: []
                            },
                            {
                                name: '--toggle--light--checked--disabled--border-bottom-color',
                                value: []
                            },
                            {
                                name: '--toggle--light--checked--disabled--border-left-color',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--toggle--light--checked--readonly--border-color',
                        value: [
                            {
                                name: '--toggle--light--checked--readonly--border-top-color',
                                value: []
                            },
                            {
                                name: '--toggle--light--checked--readonly--border-right-color',
                                value: []
                            },
                            {
                                name: '--toggle--light--checked--readonly--border-bottom-color',
                                value: []
                            },
                            {
                                name: '--toggle--light--checked--readonly--border-left-color',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--toggle--dark--border-color',
                        value: [
                            {
                                name: '--toggle--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
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
                            },
                            {
                                name: '--toggle--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
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
                    },
                    {
                        name: '--toggle--dark--disabled--border-color',
                        value: [
                            {
                                name: '--toggle--dark--disabled--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-100'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--disabled--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-100'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--disabled--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-100'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--disabled--border-left-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-100'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--toggle--dark--readonly--border-color',
                        value: [
                            {
                                name: '--toggle--dark--readonly--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-100'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--readonly--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-100'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--readonly--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-100'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--dark--readonly--border-left-color',
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
                name: '--toggle--border-radius',
                value: [
                    {
                        name: '--toggle--border-top-left-radius',
                        value: []
                    },
                    {
                        name: '--toggle--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--toggle--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--toggle--border-bottom-left-radius',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--toggle--sm--border-radius',
                        value: [
                            {
                                name: '--toggle--sm--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--sm--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--sm--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--toggle--sm--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--toggle--md--border-radius',
                        value: [
                            {
                                name: '--toggle--md--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--md--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--md--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--toggle--md--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--toggle--lg--border-radius',
                        value: [
                            {
                                name: '--toggle--lg--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--lg--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--toggle--lg--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--toggle--lg--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--width',
                value: [],
                variants: [
                    {
                        name: '--toggle--sm--width',
                        value: [
                            {
                                value: 'calc(40px * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--toggle--sm--indicator--width',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--toggle--md--width',
                        value: [
                            {
                                value: 'calc(40px * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--toggle--md--indicator--width',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--toggle--lg--width',
                        value: [
                            {
                                value: 'calc(40px * var(--size-multiplier-lg))'
                            }
                        ]
                    },
                    {
                        name: '--toggle--lg--indicator--width',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--height',
                value: [],
                variants: [
                    {
                        name: '--toggle--sm--height',
                        value: [
                            {
                                value: 'calc(20px * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--toggle--sm--indicator--height',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--toggle--md--height',
                        value: [
                            {
                                value: 'calc(20px * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--toggle--md--indicator--height',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--toggle--lg--height',
                        value: [
                            {
                                value: 'calc(20px * var(--size-multiplier-lg))'
                            }
                        ]
                    },
                    {
                        name: '--toggle--lg--indicator--height',
                        value: [
                            {
                                value: 'calc(1rem * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--transition',
                value: [
                    {
                        name: '--toggle--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color,\n      transform'
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
                        name: '--toggle--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    },
                    {
                        name: '--toggle--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color,\n      transform'
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
                        name: '--toggle--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--margin',
                value: [
                    {
                        name: '--toggle--margin-top',
                        value: [
                            {
                                value: '0'
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
                        name: '--toggle--margin-bottom',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--toggle--margin-left',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--indicator--background',
                value: [
                    {
                        name: '--toggle--indicator--background-h',
                        value: [
                            {
                                name: '--color-white-h'
                            }
                        ]
                    },
                    {
                        name: '--toggle--indicator--background-s',
                        value: [
                            {
                                name: '--color-white-s'
                            }
                        ]
                    },
                    {
                        name: '--toggle--indicator--background-l',
                        value: [
                            {
                                name: '--color-white-l'
                            }
                        ]
                    },
                    {
                        name: '--toggle--indicator--background-a',
                        value: [
                            {
                                name: '--color-white-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--indicator--border-radius',
                value: []
            },
            {
                name: '--toggle--indicator--transition',
                value: [
                    {
                        name: '--toggle--indicator--transition-property'
                    },
                    {
                        name: '--toggle--indicator--transition-duration'
                    },
                    {
                        name: '--toggle--indicator--transition-timing-function'
                    }
                ]
            },
            {
                name: '--toggle--indicator--width',
                value: []
            },
            {
                name: '--toggle--indicator--height',
                value: []
            },
            {
                name: '--toggle--rounded--border-radius',
                value: []
            },
            {
                name: '--toggle--checked--background',
                value: [
                    {
                        name: '--toggle--checked--background-h',
                        value: [
                            {
                                name: '--color-primary-h'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--background-s',
                        value: [
                            {
                                name: '--color-primary-s'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--background-l',
                        value: [
                            {
                                name: '--color-primary-l'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--background-a',
                        value: [
                            {
                                name: '--color-primary-a'
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
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--border-right-color',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--border-bottom-color',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--border-left-color',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--checked--indicator--background',
                value: [
                    {
                        name: '--toggle--checked--indicator--background-h',
                        value: [
                            {
                                name: '--color-white-h'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--indicator--background-s',
                        value: [
                            {
                                name: '--color-white-s'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--indicator--background-l',
                        value: [
                            {
                                name: '--color-white-l'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--indicator--background-a',
                        value: [
                            {
                                name: '--color-white-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--disabled--label--color',
                value: []
            },
            {
                name: '--toggle--disabled--background',
                value: [
                    {
                        name: '--toggle--disabled--background-h',
                        value: [
                            {
                                name: '--color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--toggle--disabled--background-s',
                        value: [
                            {
                                name: '--color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--toggle--disabled--background-l',
                        value: [
                            {
                                name: '--color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--toggle--disabled--background-a',
                        value: [
                            {
                                name: '--color-light-a'
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
                        value: []
                    },
                    {
                        name: '--toggle--disabled--border-right-color',
                        value: []
                    },
                    {
                        name: '--toggle--disabled--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--toggle--disabled--border-left-color',
                        value: []
                    }
                ]
            },
            {
                name: '--toggle--disabled--indicator--background',
                value: [
                    {
                        name: '--toggle--disabled--indicator--background-h',
                        value: [
                            {
                                name: '--color-light-shade-100-h'
                            }
                        ]
                    },
                    {
                        name: '--toggle--disabled--indicator--background-s',
                        value: [
                            {
                                name: '--color-light-shade-100-s'
                            }
                        ]
                    },
                    {
                        name: '--toggle--disabled--indicator--background-l',
                        value: [
                            {
                                name: '--color-light-shade-100-l'
                            }
                        ]
                    },
                    {
                        name: '--toggle--disabled--indicator--background-a',
                        value: [
                            {
                                name: '--color-light-shade-100-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--checked--disabled--background',
                value: [
                    {
                        name: '--toggle--checked--disabled--background-h',
                        value: [
                            {
                                name: '--color-primary-shade-100-h'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--disabled--background-s',
                        value: [
                            {
                                name: '--color-primary-shade-100-s'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--disabled--background-l',
                        value: [
                            {
                                name: '--color-primary-shade-100-l'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--disabled--background-a',
                        value: [
                            {
                                name: '--color-primary-shade-100-a'
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
                        value: []
                    },
                    {
                        name: '--toggle--checked--disabled--border-right-color',
                        value: []
                    },
                    {
                        name: '--toggle--checked--disabled--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--toggle--checked--disabled--border-left-color',
                        value: []
                    }
                ]
            },
            {
                name: '--toggle--checked--disabled--indicator--background',
                value: []
            },
            {
                name: '--toggle--readonly--label--color',
                value: []
            },
            {
                name: '--toggle--readonly--background',
                value: [
                    {
                        name: '--toggle--readonly--background-h',
                        value: [
                            {
                                name: '--color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--toggle--readonly--background-s',
                        value: [
                            {
                                name: '--color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--toggle--readonly--background-l',
                        value: [
                            {
                                name: '--color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--toggle--readonly--background-a',
                        value: [
                            {
                                name: '--color-light-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--readonly--border-color',
                value: [
                    {
                        name: '--toggle--readonly--border-top-color',
                        value: []
                    },
                    {
                        name: '--toggle--readonly--border-right-color',
                        value: []
                    },
                    {
                        name: '--toggle--readonly--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--toggle--readonly--border-left-color',
                        value: []
                    }
                ]
            },
            {
                name: '--toggle--readonly--indicator--background',
                value: [
                    {
                        name: '--toggle--readonly--indicator--background-h',
                        value: [
                            {
                                name: '--color-light-shade-100-h'
                            }
                        ]
                    },
                    {
                        name: '--toggle--readonly--indicator--background-s',
                        value: [
                            {
                                name: '--color-light-shade-100-s'
                            }
                        ]
                    },
                    {
                        name: '--toggle--readonly--indicator--background-l',
                        value: [
                            {
                                name: '--color-light-shade-100-l'
                            }
                        ]
                    },
                    {
                        name: '--toggle--readonly--indicator--background-a',
                        value: [
                            {
                                name: '--color-light-shade-100-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--checked--readonly--background',
                value: [
                    {
                        name: '--toggle--checked--readonly--background-h',
                        value: [
                            {
                                name: '--color-light-shade-100-h'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--readonly--background-s',
                        value: [
                            {
                                name: '--color-light-shade-100-s'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--readonly--background-l',
                        value: [
                            {
                                name: '--color-light-shade-100-l'
                            }
                        ]
                    },
                    {
                        name: '--toggle--checked--readonly--background-a',
                        value: [
                            {
                                name: '--color-light-shade-100-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--toggle--checked--readonly--border-color',
                value: [
                    {
                        name: '--toggle--checked--readonly--border-top-color',
                        value: []
                    },
                    {
                        name: '--toggle--checked--readonly--border-right-color',
                        value: []
                    },
                    {
                        name: '--toggle--checked--readonly--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--toggle--checked--readonly--border-left-color',
                        value: []
                    }
                ]
            },
            {
                name: '--toggle--checked--readonly--indicator--background',
                value: []
            }
        ]
    }
};

export default manifest;
