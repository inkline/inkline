import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ISelect',
    props: [
        {
            name: 'animationDuration',
            type: ['Number'],
            default: '300',
            description: 'The duration of the hide and show animation'
        },
        {
            name: 'autocomplete',
            type: ['Boolean'],
            default: 'false',
            description: 'Enable autocomplete functionality'
        },
        {
            name: 'arrow',
            type: ['Boolean'],
            default: 'true',
            description: 'Displays an arrow on the dropdown pointing to the trigger element'
        },
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the select'
        },
        {
            name: 'clearable',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the select as clearable'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the select'
        },
        {
            name: 'error',
            type: ['Boolean', 'Array'],
            default: "'touched', 'dirty', 'invalid'",
            description: 'The error state of the checkbox, computed based on schema by default.'
        },
        {
            name: 'trigger',
            type: ['hover', 'focus', 'click', 'manual'],
            default: 'click',
            description: 'The events used to trigger the dropdown'
        },
        {
            name: 'idField',
            type: ['String'],
            default: 'id',
            description: 'The field to be used for identifying the options'
        },
        {
            name: 'triggerKeyBindings',
            type: ['string[]'],
            default: 'up, down, enter, space, tab, esc',
            description: 'The keydown events bound to the trigger element'
        },
        {
            name: 'itemKeyBindings',
            type: ['string[]'],
            default: 'up, down, enter, space, tab, esc',
            description: 'The keydown events bound to the select option elements'
        },
        {
            name: 'interactable',
            type: ['Boolean'],
            default: 'true',
            description:
                'Determines whether hover state should be transferred from trigger to popup'
        },
        {
            name: 'label',
            type: ['String', 'Function'],
            default: 'label',
            description: 'Used to extract the label from the select option and select value'
        },
        {
            name: 'loading',
            type: ['Boolean'],
            default: 'false',
            description: 'The loading state of the select'
        },
        {
            name: 'modelValue',
            type: ['String,Number, Boolean'],
            default: 'null',
            description: 'Used to set the field value'
        },
        {
            name: 'visible',
            type: ['Boolean'],
            default: 'false',
            description: 'Used to manually control the visibility of the select dropdown'
        },
        {
            name: 'minLength',
            type: ['Number'],
            default: '0',
            description: 'The minimum input length to open the select dropdown at'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The unique identifier of the select'
        },
        {
            name: 'options',
            type: ['Array'],
            default: '',
            description: 'The options to be displayed in the select component'
        },
        {
            name: 'placeholder',
            type: ['String'],
            default: "''",
            description: 'The placeholder of the select input'
        },
        {
            name: 'offset',
            type: ['Number'],
            default: '6',
            description: 'The offset of the dropdown relative to the trigger element'
        },
        {
            name: 'placement',
            type: [
                'top',
                'top-start',
                'top-end',
                'bottom',
                'bottom-start',
                'bottom-end',
                'left',
                'left-start',
                'left-end',
                'right',
                'right-start',
                'right-end'
            ],
            default: 'false',
            description: 'The placement of the select dropdown'
        },
        {
            name: 'popupOptions',
            type: ['Object'],
            default: '',
            description: 'Used to override the floating-ui options used for creating the dropdown'
        },
        {
            name: 'readonly',
            type: ['Boolean'],
            default: 'false',
            description: 'The readonly state of the select'
        },
        {
            name: 'selectFirstOptionOnEnter',
            type: ['Boolean'],
            default: 'true',
            description: 'Selects the first option when pressing enter'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the select'
        },
        {
            name: 'tabindex',
            type: ['Number', 'String'],
            default: '0',
            description: 'The tabindex of the select'
        },
        {
            name: 'type',
            type: ['String'],
            default: 'text',
            description: 'The type of the select'
        },
        {
            name: 'hoverHideDelay',
            type: ['Number'],
            default: '300',
            description: 'Delay in milliseconds before the popover is hidden on hover'
        },
        {
            name: 'validate',
            type: ['Boolean'],
            default: 'true',
            description: 'Enable select validation using schema'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        },
        {
            description: 'Event emitted for setting the visible',
            name: 'update:visible'
        },
        {
            description: 'Event emitted when clicking outside the select component',
            name: 'click:outside'
        },
        {
            description: 'Event emitted when input value changes',
            name: 'search'
        },
        {
            description: 'Event emitted when the next page needs to be loaded',
            name: 'pagination'
        },
        {
            description: 'Event emitted when clearing the select element',
            name: 'clear'
        }
    ],
    slots: [
        {
            name: 'prepend',
            description: 'Slot for the select prepend content '
        },
        {
            name: 'prefix',
            description: 'Slot for the select prefix content '
        },
        {
            name: 'suffix',
            description: 'Slot for the select suffix content '
        },
        {
            name: 'append',
            description: 'Slot for the select append content '
        },
        {
            name: 'clearable',
            description: 'Slot for the select clearable button '
        },
        {
            name: 'header',
            description: 'Slot for the select header content '
        },
        {
            name: 'option',
            description: 'Slot for the select option content '
        },
        {
            name: 'footer',
            description: 'Slot for the select footer content '
        }
    ],
    css: {
        selector: '.select-wrapper',
        variables: [
            {
                name: '--select-line-height'
            },
            {
                name: '--select--min-width',
                value: [
                    {
                        value: '240px'
                    }
                ]
            },
            {
                name: '--select--max-width',
                value: [
                    {
                        value: '90vw'
                    }
                ]
            },
            {
                name: '--select--color',
                variants: [
                    {
                        name: '--select--light--color',
                        value: [
                            {
                                name: '--contrast-text-color-white'
                            }
                        ]
                    },
                    {
                        name: '--select--dark--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--select--sm--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--select--md--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--select--lg--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--box-shadow',
                value: [
                    {
                        name: '--select--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--select--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--select--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--select--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--select--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--header--border-style',
                value: [
                    {
                        name: '--select--header--border-top-style',
                        value: [
                            {
                                name: '--select--border-top-style',
                                value: [
                                    {
                                        name: '--border-top-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--header--border-right-style',
                        value: [
                            {
                                name: '--select--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--header--border-bottom-style',
                        value: [
                            {
                                name: '--select--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--header--border-left-style',
                        value: [
                            {
                                name: '--select--border-left-style',
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
                name: '--select--header--border-width',
                value: [
                    {
                        name: '--select--header--border-top-width',
                        value: [
                            {
                                name: '--select--border-top-width',
                                value: [
                                    {
                                        name: '--border-top-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--header--border-right-width',
                        value: [
                            {
                                name: '--select--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--header--border-bottom-width',
                        value: [
                            {
                                name: '--select--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--header--border-left-width',
                        value: [
                            {
                                name: '--select--border-left-width',
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
                name: '--select--header--border-color',
                value: [
                    {
                        name: '--select--header--border-top-color',
                        value: [
                            {
                                name: '--select--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--select--light--border-top-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--select--dark--border-top-color',
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
                        name: '--select--header--border-right-color',
                        value: [
                            {
                                name: '--select--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--select--light--border-right-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--select--dark--border-right-color',
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
                        name: '--select--header--border-bottom-color',
                        value: [
                            {
                                name: '--select--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--select--light--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--select--dark--border-bottom-color',
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
                        name: '--select--header--border-left-color',
                        value: [
                            {
                                name: '--select--border-left-color',
                                value: [
                                    {
                                        name: '--border-left-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--select--light--border-left-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--select--dark--border-left-color',
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
                ]
            },
            {
                name: '--select--header--background',
                value: [
                    {
                        name: '--select--background',
                        variants: [
                            {
                                name: '--select--light--background',
                                value: [
                                    {
                                        name: '--color-white'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--background',
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
                        name: '--select--light--header--background',
                        value: [
                            {
                                name: '--color-gray-50'
                            }
                        ]
                    },
                    {
                        name: '--select--dark--header--background',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--header--padding',
                value: [
                    {
                        name: '--select--header--padding-top',
                        value: [
                            {
                                name: '--select--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--select--sm--padding-top',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-top) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--select--md--padding-top',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-top) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--select--lg--padding-top',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-top) * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--select--sm--header--padding-top',
                                value: [
                                    {
                                        value: 'calc(calc(var(--select--padding-top) * 3 / 4) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--select--md--header--padding-top',
                                value: [
                                    {
                                        value: 'calc(calc(var(--select--padding-top) * 3 / 4) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--select--lg--header--padding-top',
                                value: [
                                    {
                                        value: 'calc(calc(var(--select--padding-top) * 3 / 4) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--header--padding-right',
                        value: [
                            {
                                name: '--select--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--select--sm--padding-right',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-right) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--select--md--padding-right',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-right) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--select--lg--padding-right',
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
                        name: '--select--header--padding-bottom',
                        value: [
                            {
                                name: '--select--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--select--sm--padding-bottom',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-bottom) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--select--md--padding-bottom',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-bottom) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--select--lg--padding-bottom',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-bottom) * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--select--sm--header--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(calc(var(--select--padding-bottom) * 3 / 4) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--select--md--header--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(calc(var(--select--padding-bottom) * 3 / 4) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--select--lg--header--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(calc(var(--select--padding-bottom) * 3 / 4) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--header--padding-left',
                        value: [
                            {
                                name: '--select--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--select--sm--padding-left',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-left) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--select--md--padding-left',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-left) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--select--lg--padding-left',
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
                name: '--select--body--border-style',
                value: [
                    {
                        name: '--select--body--border-top-style',
                        value: [
                            {
                                name: '--select--border-top-style',
                                value: [
                                    {
                                        name: '--border-top-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--body--border-right-style',
                        value: [
                            {
                                name: '--select--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--body--border-bottom-style',
                        value: [
                            {
                                name: '--select--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--body--border-left-style',
                        value: [
                            {
                                name: '--select--border-left-style',
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
                name: '--select--body--border-width',
                value: [
                    {
                        name: '--select--body--border-top-width',
                        value: [
                            {
                                name: '--select--border-top-width',
                                value: [
                                    {
                                        name: '--border-top-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--body--border-right-width',
                        value: [
                            {
                                name: '--select--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--body--border-bottom-width',
                        value: [
                            {
                                name: '--select--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--body--border-left-width',
                        value: [
                            {
                                name: '--select--border-left-width',
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
                name: '--select--body--border-color',
                value: [
                    {
                        name: '--select--body--border-top-color',
                        value: [
                            {
                                name: '--select--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--body--border-right-color',
                        value: [
                            {
                                name: '--select--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--body--border-bottom-color',
                        value: [
                            {
                                name: '--select--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--body--border-left-color',
                        value: [
                            {
                                name: '--select--border-left-color',
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
                name: '--select--body--background',
                value: [
                    {
                        name: '--select--background'
                    }
                ]
            },
            {
                name: '--select--body--padding',
                value: [
                    {
                        name: '--select--body--padding-top',
                        value: [
                            {
                                name: '--select--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--body--padding-right',
                        value: [
                            {
                                name: '--select--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--select--sm--body--padding-right',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--select--md--body--padding-right',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--select--lg--body--padding-right',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--body--padding-bottom',
                        value: [
                            {
                                name: '--select--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--body--padding-left',
                        value: [
                            {
                                name: '--select--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--select--sm--body--padding-left',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--select--md--body--padding-left',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--select--lg--body--padding-left',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--max-height',
                value: [
                    {
                        value: '300px'
                    }
                ]
            },
            {
                name: '--select--divider--border-color',
                value: [
                    {
                        name: '--select--border-top',
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--footer--border-style',
                value: [
                    {
                        name: '--select--footer--border-top-style',
                        value: [
                            {
                                name: '--select--border-top-style',
                                value: [
                                    {
                                        name: '--border-top-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--footer--border-right-style',
                        value: [
                            {
                                name: '--select--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--footer--border-bottom-style',
                        value: [
                            {
                                name: '--select--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--footer--border-left-style',
                        value: [
                            {
                                name: '--select--border-left-style',
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
                name: '--select--footer--border-width',
                value: [
                    {
                        name: '--select--footer--border-top-width',
                        value: [
                            {
                                name: '--select--border-top-width',
                                value: [
                                    {
                                        name: '--border-top-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--footer--border-right-width',
                        value: [
                            {
                                name: '--select--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--footer--border-bottom-width',
                        value: [
                            {
                                name: '--select--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--footer--border-left-width',
                        value: [
                            {
                                name: '--select--border-left-width',
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
                name: '--select--footer--border-color',
                value: [
                    {
                        name: '--select--footer--border-top-color',
                        value: [
                            {
                                name: '--select--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--footer--border-right-color',
                        value: [
                            {
                                name: '--select--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--footer--border-bottom-color',
                        value: [
                            {
                                name: '--select--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--footer--border-left-color',
                        value: [
                            {
                                name: '--select--border-left-color',
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
                name: '--select--footer--background',
                value: [
                    {
                        name: '--select--background'
                    }
                ],
                variants: [
                    {
                        name: '--select--light--footer--background',
                        value: [
                            {
                                name: '--color-gray-50'
                            }
                        ]
                    },
                    {
                        name: '--select--dark--footer--background',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--footer--padding',
                value: [
                    {
                        name: '--select--footer--padding-top',
                        value: [
                            {
                                name: '--select--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--select--sm--footer--padding-top',
                                value: [
                                    {
                                        value: 'calc(calc(var(--select--padding-top) * 3 / 4) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--select--md--footer--padding-top',
                                value: [
                                    {
                                        value: 'calc(calc(var(--select--padding-top) * 3 / 4) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--select--lg--footer--padding-top',
                                value: [
                                    {
                                        value: 'calc(calc(var(--select--padding-top) * 3 / 4) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--footer--padding-right',
                        value: [
                            {
                                name: '--select--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--footer--padding-bottom',
                        value: [
                            {
                                name: '--select--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--select--sm--footer--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(calc(var(--select--padding-bottom) * 3 / 4) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--select--md--footer--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(calc(var(--select--padding-bottom) * 3 / 4) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--select--lg--footer--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(calc(var(--select--padding-bottom) * 3 / 4) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--footer--padding-left',
                        value: [
                            {
                                name: '--select--padding-left',
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
                name: '--select--border-top-left-radius',
                value: [
                    {
                        name: '--border-top-left-radius'
                    }
                ],
                variants: [
                    {
                        name: '--select--sm--border-top-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--select--md--border-top-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--select--lg--border-top-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--border-top-right-radius',
                value: [
                    {
                        name: '--border-top-right-radius'
                    }
                ],
                variants: [
                    {
                        name: '--select--sm--border-top-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--select--md--border-top-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--select--lg--border-top-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--border-bottom-left-radius',
                value: [
                    {
                        name: '--border-bottom-left-radius'
                    }
                ],
                variants: [
                    {
                        name: '--select--sm--border-bottom-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--select--md--border-bottom-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--select--lg--border-bottom-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--border-bottom-right-radius',
                value: [
                    {
                        name: '--border-bottom-right-radius'
                    }
                ],
                variants: [
                    {
                        name: '--select--sm--border-bottom-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--select--md--border-bottom-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--select--lg--border-bottom-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-lg))'
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
                name: '--margin-left'
            }
        ]
    }
};

export default manifest;
