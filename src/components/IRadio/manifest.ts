import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IRadio',
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
            description: 'Used to set the radio value when used inside a radio group'
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
                name: '--radio--margin-right',
                value: [
                    {
                        name: '--margin-right'
                    }
                ]
            },
            {
                name: '--radio--transition-property',
                value: [
                    {
                        value: 'color'
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
                name: '--radio--label--color',
                variants: [
                    {
                        name: '--radio--light--label--color',
                        value: [
                            {
                                name: '--contrast-text-color-light'
                            }
                        ]
                    },
                    {
                        name: '--radio--dark--label--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--label--font-size',
                variants: [
                    {
                        name: '--radio--sm--label--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--radio--md--label--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--radio--lg--label--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--size',
                variants: [
                    {
                        name: '--radio--sm--size',
                        value: [
                            {
                                value: 'calc(#{1rem} * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--radio--md--size',
                        value: [
                            {
                                value: 'calc(#{1rem} * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--radio--lg--size',
                        value: [
                            {
                                value: 'calc(#{1rem} * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--border-color',
                value: [
                    {
                        value: '(\n                    var(--radio--border-top-color, var(--border-top-color))\n                        var(--radio--border-right-color, var(--border-right-color))\n                        var(--radio--border-bottom-color, var(--border-bottom-color))\n                        var(--radio--border-left-color, var(--border-left-color))\n                )'
                    }
                ],
                variants: [
                    {
                        name: '--radio--light--border-color',
                        value: [
                            {
                                name: '--color-light-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--radio--dark--border-color',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--border-style',
                value: [
                    {
                        value: '(\n                    var(--radio--border-top-style, var(--border-top-style))\n                        var(--radio--border-right-style, var(--border-right-style))\n                        var(--radio--border-bottom-style, var(--border-bottom-style))\n                        var(--radio--border-left-style, var(--border-left-style))\n                )'
                    }
                ]
            },
            {
                name: '--radio--border-width',
                value: [
                    {
                        value: '(\n                    var(--radio--border-top-width, var(--border-top-width))\n                        var(--radio--border-right-width, var(--border-right-width))\n                        var(--radio--border-bottom-width, var(--border-bottom-width))\n                        var(--radio--border-left-width, var(--border-left-width))\n                )'
                    }
                ]
            },
            {
                name: '--radio--box-shadow',
                value: [
                    {
                        name: '--radio--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--radio--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--radio--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--radio--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--radio--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--background',
                variants: [
                    {
                        name: '--radio--light--background',
                        value: [
                            {
                                name: '--color-white'
                            }
                        ]
                    },
                    {
                        name: '--radio--dark--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--color',
                variants: [
                    {
                        name: '--radio--light--color',
                        value: [
                            {
                                name: '--color-white'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--checkmark--size',
                variants: [
                    {
                        name: '--radio--sm--checkmark--size',
                        value: [
                            {
                                value: 'calc(#{8px} * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--radio--md--checkmark--size',
                        value: [
                            {
                                value: 'calc(#{8px} * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--radio--lg--checkmark--size',
                        value: [
                            {
                                value: 'calc(#{8px} * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--checked--border-color',
                value: [
                    {
                        name: '--radio--border-color'
                    }
                ],
                variants: [
                    {
                        name: '--radio--light--checked--border-color',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--radio--dark--checked--border-color',
                        value: [
                            {
                                name: '--color-primary-lighten-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--checked--background',
                value: [
                    {
                        name: '--radio--background'
                    }
                ],
                variants: [
                    {
                        name: '--radio--light--checked--background',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--radio--dark--checked--background',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--disabled--label--color',
                value: [
                    {
                        name: '--radio--label--color'
                    }
                ],
                variants: [
                    {
                        name: '--radio--light--disabled--label--color',
                        value: [
                            {
                                name: '--color-light-700'
                            }
                        ]
                    },
                    {
                        name: '--radio--dark--disabled--label--color',
                        value: [
                            {
                                name: '--color-dark-300'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--checked--disabled--border-color',
                value: [
                    {
                        name: '--radio--border-color'
                    }
                ],
                variants: [
                    {
                        name: '--radio--light--checked--disabled--border-color',
                        value: [
                            {
                                name: '--color-primary-300'
                            }
                        ]
                    },
                    {
                        name: '--radio--dark--checked--disabled--border-color',
                        value: [
                            {
                                name: '--color-primary-700'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--checked--disabled--background',
                value: [
                    {
                        name: '--radio--background'
                    }
                ],
                variants: [
                    {
                        name: '--radio--light--checked--disabled--background',
                        value: [
                            {
                                name: '--color-primary-200'
                            }
                        ]
                    },
                    {
                        name: '--radio--dark--checked--disabled--background',
                        value: [
                            {
                                name: '--color-primary-700'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--radio--disabled--color',
                value: [
                    {
                        name: '--radio--color'
                    }
                ],
                variants: [
                    {
                        name: '--radio--light--disabled--color',
                        value: [
                            {
                                name: '--color-light-200'
                            }
                        ]
                    },
                    {
                        name: '--radio--dark--disabled--color',
                        value: [
                            {
                                name: '--color-dark-200'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
