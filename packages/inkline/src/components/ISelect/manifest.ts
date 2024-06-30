import type { ComponentManifest } from '@inkline/inkline/types';

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
            type: ['String', 'Number', 'Boolean', 'Function', 'Object'],
            default: 'undefined',
            description:
                'The label of the select. Can be a string, number, render function, or component'
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
            name: 'validateSchema',
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
            name: 'no-results',
            description: 'Slot for showing no options message '
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
        selector: '.select',
        variables: [
            {
                name: '--select--error--border-color',
                value: [
                    {
                        name: '--select--error--border-top-color',
                        value: [
                            {
                                name: '--color-danger'
                            }
                        ]
                    },
                    {
                        name: '--select--error--border-right-color',
                        value: [
                            {
                                name: '--color-danger'
                            }
                        ]
                    },
                    {
                        name: '--select--error--border-bottom-color',
                        value: [
                            {
                                name: '--color-danger'
                            }
                        ]
                    },
                    {
                        name: '--select--error--border-left-color',
                        value: [
                            {
                                name: '--color-danger'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--caret--spacing',
                value: [
                    {
                        name: '--margin-right'
                    }
                ]
            },
            {
                name: '--select--caret--width',
                value: [
                    {
                        value: '1rem'
                    }
                ]
            },
            {
                name: '--select--caret--height',
                value: [
                    {
                        value: '1rem'
                    }
                ]
            },
            {
                name: '--select--caret--color',
                value: [
                    {
                        name: '--select--caret--color-h',
                        value: [
                            {
                                name: '--text-color-weak-h'
                            }
                        ]
                    },
                    {
                        name: '--select--caret--color-s',
                        value: [
                            {
                                name: '--text-color-weak-s'
                            }
                        ]
                    },
                    {
                        name: '--select--caret--color-l',
                        value: [
                            {
                                name: '--text-color-weak-l'
                            }
                        ]
                    },
                    {
                        name: '--select--caret--color-a',
                        value: [
                            {
                                name: '--text-color-weak-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--box-shadow',
                value: []
            },
            {
                name: '--select--color',
                value: [
                    {
                        name: '--select--color-h',
                        value: [
                            {
                                name: '--contrast-text-color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--select--color-s',
                        value: [
                            {
                                name: '--contrast-text-color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--select--color-l',
                        value: [
                            {
                                name: '--contrast-text-color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--select--color-a',
                        value: [
                            {
                                name: '--contrast-text-color-light-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--select--light--color',
                        value: [
                            {
                                name: '--select--light--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--light--option--disabled--color',
                        value: [
                            {
                                name: '--select--light--option--disabled--color-h',
                                value: [
                                    {
                                        name: '--text-color-weaker-h'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--option--disabled--color-s',
                                value: [
                                    {
                                        name: '--text-color-weaker-s'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--option--disabled--color-l',
                                value: [
                                    {
                                        name: '--text-color-weaker-l'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--option--disabled--color-a',
                                value: [
                                    {
                                        name: '--text-color-weaker-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--dark--color',
                        value: [
                            {
                                name: '--select--dark--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--dark--option--disabled--color',
                        value: [
                            {
                                name: '--select--dark--option--disabled--color-h',
                                value: [
                                    {
                                        name: '--text-color-weaker-h'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--option--disabled--color-s',
                                value: [
                                    {
                                        name: '--text-color-weaker-s'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--option--disabled--color-l',
                                value: [
                                    {
                                        name: '--text-color-weaker-l'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--option--disabled--color-a',
                                value: [
                                    {
                                        name: '--text-color-weaker-a'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--font-size',
                value: [],
                variants: [
                    {
                        name: '--select--sm--font-size',
                        value: [
                            {
                                name: '--font-size-sm'
                            }
                        ]
                    },
                    {
                        name: '--select--md--font-size',
                        value: [
                            {
                                name: '--font-size-md'
                            }
                        ]
                    },
                    {
                        name: '--select--lg--font-size',
                        value: [
                            {
                                name: '--font-size-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--line-height',
                value: [
                    {
                        name: '--line-height'
                    }
                ]
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
                name: '--select--z-index',
                value: [
                    {
                        value: '2000'
                    }
                ]
            },
            {
                name: '--select--arrow--size',
                value: [
                    {
                        value: '6px'
                    }
                ]
            },
            {
                name: '--select--header--border-width',
                value: [
                    {
                        name: '--select--header--border-bottom-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--header--border-style',
                value: []
            },
            {
                name: '--select--header--border-color',
                value: []
            },
            {
                name: '--select--header--background',
                value: []
            },
            {
                name: '--select--header--padding',
                value: [
                    {
                        name: '--select--header--padding-top',
                        value: []
                    },
                    {
                        name: '--select--header--padding-bottom',
                        value: []
                    }
                ]
            },
            {
                name: '--select--body--border-width',
                value: []
            },
            {
                name: '--select--body--border-style',
                value: []
            },
            {
                name: '--select--body--border-color',
                value: []
            },
            {
                name: '--select--body--background',
                value: []
            },
            {
                name: '--select--body--padding',
                value: [
                    {
                        name: '--select--body--padding-right',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--select--body--padding-left',
                        value: [
                            {
                                value: '0'
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
                name: '--select--divider--background',
                value: [
                    {
                        name: '--select--divider--background-h',
                        value: [
                            {
                                name: '--text-color-weaker-h'
                            }
                        ]
                    },
                    {
                        name: '--select--divider--background-s',
                        value: [
                            {
                                name: '--text-color-weaker-s'
                            }
                        ]
                    },
                    {
                        name: '--select--divider--background-l',
                        value: [
                            {
                                name: '--text-color-weaker-l'
                            }
                        ]
                    },
                    {
                        name: '--select--divider--background-a',
                        value: [
                            {
                                name: '--text-color-weaker-a'
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
                                value: '0'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--footer--border-style',
                value: []
            },
            {
                name: '--select--footer--border-color',
                value: []
            },
            {
                name: '--select--footer--background',
                value: []
            },
            {
                name: '--select--footer--padding',
                value: [
                    {
                        name: '--select--footer--padding-top',
                        value: []
                    },
                    {
                        name: '--select--footer--padding-bottom',
                        value: []
                    }
                ]
            },
            {
                name: '--select--border-radius',
                value: [
                    {
                        name: '--select--border-top-left-radius',
                        value: []
                    },
                    {
                        name: '--select--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--select--border-bottom-left-radius',
                        value: []
                    },
                    {
                        name: '--select--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--select--border-top-left-radius',
                        value: []
                    },
                    {
                        name: '--select--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--select--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--select--border-bottom-left-radius',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--select--sm--border-radius',
                        value: [
                            {
                                name: '--select--sm--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--select--sm--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--select--sm--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--select--sm--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--select--md--border-radius',
                        value: [
                            {
                                name: '--select--md--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--select--md--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--select--md--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--select--md--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--select--lg--border-radius',
                        value: [
                            {
                                name: '--select--lg--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--select--lg--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--select--lg--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--select--lg--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '--select--border-color',
                value: [
                    {
                        name: '--select--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--select--border-left-color',
                        value: []
                    },
                    {
                        name: '--select--border-top-color',
                        value: []
                    },
                    {
                        name: '--select--border-right-color',
                        value: []
                    },
                    {
                        name: '--select--border-top-color',
                        value: []
                    },
                    {
                        name: '--select--border-right-color',
                        value: []
                    },
                    {
                        name: '--select--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--select--border-left-color',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--select--light--border-color',
                        value: [
                            {
                                name: '--select--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--dark--border-color',
                        value: [
                            {
                                name: '--select--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
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
                            },
                            {
                                name: '--select--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
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
            },
            {
                name: '--select--background',
                value: [
                    {
                        name: '--select--background-h',
                        value: [
                            {
                                name: '--color-white-h'
                            }
                        ]
                    },
                    {
                        name: '--select--background-s',
                        value: [
                            {
                                name: '--color-white-s'
                            }
                        ]
                    },
                    {
                        name: '--select--background-l',
                        value: [
                            {
                                name: '--color-white-l'
                            }
                        ]
                    },
                    {
                        name: '--select--background-a',
                        value: [
                            {
                                name: '--color-white-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--select--light--background',
                        value: [
                            {
                                name: '--select--light--background-h',
                                value: [
                                    {
                                        name: '--color-white-h'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--background-s',
                                value: [
                                    {
                                        name: '--color-white-s'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--background-l',
                                value: [
                                    {
                                        name: '--color-white-l'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--background-a',
                                value: [
                                    {
                                        name: '--color-white-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--light--option--hover--background',
                        value: [
                            {
                                name: '--select--light--option--hover--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--option--hover--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--option--hover--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--option--hover--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--light--option--active--background',
                        value: [
                            {
                                name: '--select--light--option--active--background-h',
                                value: []
                            },
                            {
                                name: '--select--light--option--active--background-s',
                                value: []
                            },
                            {
                                name: '--select--light--option--active--background-l',
                                value: []
                            },
                            {
                                name: '--select--light--option--active--background-a',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--select--light--header--background',
                        value: [
                            {
                                name: '--select--light--header--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--header--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--header--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--header--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--light--footer--background',
                        value: [
                            {
                                name: '--select--light--footer--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--footer--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--footer--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--select--light--footer--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--dark--background',
                        value: [
                            {
                                name: '--select--dark--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--dark--option--hover--background',
                        value: [
                            {
                                name: '--select--dark--option--hover--background-h',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--option--hover--background-s',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--option--hover--background-l',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--option--hover--background-a',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--dark--option--active--background',
                        value: [
                            {
                                name: '--select--dark--option--active--background-h',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--option--active--background-s',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--option--active--background-l',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--option--active--background-a',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--dark--header--background',
                        value: [
                            {
                                name: '--select--dark--header--background-h',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--header--background-s',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--header--background-l',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--header--background-a',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--select--dark--footer--background',
                        value: [
                            {
                                name: '--select--dark--footer--background-h',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--footer--background-s',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--footer--background-l',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--select--dark--footer--background-a',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-a'
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
