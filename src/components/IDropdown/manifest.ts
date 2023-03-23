import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IDropdown',
    props: [
        {
            name: 'animationDuration',
            type: ['Number'],
            default: '300',
            description: 'The duration of the hide and show animation'
        },
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the dropdown'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the dropdown'
        },
        {
            name: 'hideOnItemClick',
            type: ['Boolean'],
            default: 'false',
            description: 'Used to hide the dropdown when clicking or selecting a dropdown item'
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
            description: 'The keydown events bound to the dropdown item elements'
        },
        {
            name: 'visible',
            type: ['Boolean'],
            default: 'false',
            description: 'Used to manually control the visibility of the dropdown'
        },
        {
            name: 'arrow',
            type: ['Boolean'],
            default: 'true',
            description: 'Displays an arrow on the dropdown pointing to the trigger element'
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
            description: 'The placement of the dropdown'
        },
        {
            name: 'trigger',
            type: ['hover', 'focus', 'click', 'manual'],
            default: 'click',
            description: 'The events used to trigger the dropdown'
        },
        {
            name: 'offset',
            type: ['Number'],
            default: '6',
            description: 'The offset of the dropdown relative to the trigger element'
        },
        {
            name: 'interactable',
            type: ['Boolean'],
            default: 'true',
            description:
                'Determines whether hover state should be transferred from trigger to popup'
        },
        {
            name: 'popupOptions',
            type: ['Object'],
            default: '',
            description: 'Used to override the floating-ui options used for creating the dropdown'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the dropdown'
        },
        {
            name: 'hoverHideDelay',
            type: ['Number'],
            default: '300',
            description: 'Delay in milliseconds before the popover is hidden on hover'
        }
    ],
    events: [
        {
            description: 'Event emitted when clicking outside the dropdown elements',
            name: 'click:outside'
        },
        {
            description: 'Event emitted for setting the visible',
            name: 'update:visible'
        }
    ],
    slots: [
        {
            name: 'default',
            description: 'Slot for dropdown trigger '
        },
        {
            name: 'header',
            description: 'Slot for dropdown header content '
        },
        {
            name: 'body',
            description: 'Slot for dropdown body content '
        },
        {
            name: 'footer',
            description: 'Slot for dropdown footer content '
        }
    ],
    css: {
        selector: '.dropdown-wrapper',
        variables: [
            {
                name: '--dropdown--line-height',
                value: [
                    {
                        name: '--line-height'
                    }
                ]
            },
            {
                name: '--dropdown--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--dropdown--sm--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--md--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--lg--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--min-width',
                value: [
                    {
                        value: '240px'
                    }
                ]
            },
            {
                name: '--dropdown--max-width',
                value: [
                    {
                        value: '90vw'
                    }
                ]
            },
            {
                name: '--dropdown--color',
                variants: [
                    {
                        name: '--dropdown--light--color',
                        value: [
                            {
                                name: '--contrast-text-color-light'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--dark--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--box-shadow',
                value: [
                    {
                        name: '--dropdown--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--header--border-style',
                value: [
                    {
                        name: '--dropdown--header--border-top-style',
                        value: [
                            {
                                name: '--dropdown--border-top-style',
                                value: [
                                    {
                                        name: '--border-top-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--header--border-right-style',
                        value: [
                            {
                                name: '--dropdown--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--header--border-bottom-style',
                        value: [
                            {
                                name: '--dropdown--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--header--border-left-style',
                        value: [
                            {
                                name: '--dropdown--border-left-style',
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
                name: '--dropdown--header--border-width',
                value: [
                    {
                        name: '--dropdown--header--border-top-width',
                        value: [
                            {
                                name: '--dropdown--border-top-width',
                                value: [
                                    {
                                        name: '--border-top-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--header--border-right-width',
                        value: [
                            {
                                name: '--dropdown--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--header--border-bottom-width',
                        value: [
                            {
                                name: '--dropdown--border-bottom-width',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--header--border-left-width',
                        value: [
                            {
                                name: '--dropdown--border-left-width',
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
                name: '--dropdown--header--border-color',
                value: [
                    {
                        name: '--dropdown--header--border-top-color',
                        value: [
                            {
                                name: '--dropdown--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--dropdown--light--border-top-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--dropdown--dark--border-top-color',
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
                        name: '--dropdown--header--border-right-color',
                        value: [
                            {
                                name: '--dropdown--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--dropdown--light--border-right-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--dropdown--dark--border-right-color',
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
                        name: '--dropdown--header--border-bottom-color',
                        value: [
                            {
                                name: '--dropdown--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--dropdown--light--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--dropdown--dark--border-bottom-color',
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
                        name: '--dropdown--header--border-left-color',
                        value: [
                            {
                                name: '--dropdown--border-left-color',
                                value: [
                                    {
                                        name: '--border-left-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--dropdown--light--border-left-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--dropdown--dark--border-left-color',
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
                name: '--dropdown--header--background',
                value: [
                    {
                        name: '--dropdown--background',
                        variants: [
                            {
                                name: '--dropdown--light--background',
                                value: [
                                    {
                                        name: '--color-white'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown--dark--background',
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
                        name: '--dropdown--light--header--background',
                        value: [
                            {
                                name: '--color-gray-50'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--dark--header--background',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--header--padding',
                value: [
                    {
                        name: '--dropdown--header--padding-top',
                        value: [
                            {
                                name: '--dropdown--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--dropdown--sm--padding-top',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-top) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--dropdown--md--padding-top',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-top) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--dropdown--lg--padding-top',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-top) * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--header--padding-right',
                        value: [
                            {
                                name: '--dropdown--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--dropdown--sm--padding-right',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-right) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--dropdown--md--padding-right',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-right) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--dropdown--lg--padding-right',
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
                        name: '--dropdown--header--padding-bottom',
                        value: [
                            {
                                name: '--dropdown--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--dropdown--sm--padding-bottom',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-bottom) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--dropdown--md--padding-bottom',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-bottom) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--dropdown--lg--padding-bottom',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-bottom) * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--header--padding-left',
                        value: [
                            {
                                name: '--dropdown--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--dropdown--sm--padding-left',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-left) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--dropdown--md--padding-left',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-left) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--dropdown--lg--padding-left',
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
                name: '--dropdown--header--transition-property',
                value: [
                    {
                        name: '--dropdown--transition-property',
                        value: [
                            {
                                value: 'border-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--header--transition-duration',
                value: [
                    {
                        name: '--dropdown--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--header--transition-timing-function',
                value: [
                    {
                        name: '--dropdown--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--body--border-style',
                value: [
                    {
                        name: '--dropdown--body--border-top-style',
                        value: [
                            {
                                name: '--dropdown--border-top-style',
                                value: [
                                    {
                                        name: '--border-top-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--body--border-right-style',
                        value: [
                            {
                                name: '--dropdown--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--body--border-bottom-style',
                        value: [
                            {
                                name: '--dropdown--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--body--border-left-style',
                        value: [
                            {
                                name: '--dropdown--border-left-style',
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
                name: '--dropdown--body--border-width',
                value: [
                    {
                        name: '--dropdown--body--border-top-width',
                        value: [
                            {
                                name: '--dropdown--border-top-width',
                                value: [
                                    {
                                        name: '--border-top-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--body--border-right-width',
                        value: [
                            {
                                name: '--dropdown--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--body--border-bottom-width',
                        value: [
                            {
                                name: '--dropdown--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--body--border-left-width',
                        value: [
                            {
                                name: '--dropdown--border-left-width',
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
                name: '--dropdown--body--border-color',
                value: [
                    {
                        name: '--dropdown--body--border-top-color',
                        value: [
                            {
                                name: '--dropdown--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--body--border-right-color',
                        value: [
                            {
                                name: '--dropdown--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--body--border-bottom-color',
                        value: [
                            {
                                name: '--dropdown--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--body--border-left-color',
                        value: [
                            {
                                name: '--dropdown--border-left-color',
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
                name: '--dropdown--body--background',
                value: [
                    {
                        name: '--dropdown--background'
                    }
                ]
            },
            {
                name: '--dropdown--body--padding',
                value: [
                    {
                        name: '--dropdown--body--padding-top',
                        value: [
                            {
                                name: '--dropdown--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--body--padding-right',
                        value: [
                            {
                                name: '--dropdown--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--body--padding-bottom',
                        value: [
                            {
                                name: '--dropdown--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--body--padding-left',
                        value: [
                            {
                                name: '--dropdown--padding-left',
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
                name: '--dropdown--body--transition-property',
                value: [
                    {
                        name: '--dropdown--transition-property',
                        value: [
                            {
                                value: 'border-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--body--transition-duration',
                value: [
                    {
                        name: '--dropdown--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--body--transition-timing-function',
                value: [
                    {
                        name: '--dropdown--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--footer--border-style',
                value: [
                    {
                        name: '--dropdown--footer--border-top-style',
                        value: [
                            {
                                name: '--dropdown--border-top-style',
                                value: [
                                    {
                                        name: '--border-top-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--footer--border-right-style',
                        value: [
                            {
                                name: '--dropdown--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--footer--border-bottom-style',
                        value: [
                            {
                                name: '--dropdown--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--footer--border-left-style',
                        value: [
                            {
                                name: '--dropdown--border-left-style',
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
                name: '--dropdown--footer--border-width',
                value: [
                    {
                        name: '--dropdown--footer--border-top-width',
                        value: [
                            {
                                name: '--dropdown--border-top-width',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--footer--border-right-width',
                        value: [
                            {
                                name: '--dropdown--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--footer--border-bottom-width',
                        value: [
                            {
                                name: '--dropdown--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--footer--border-left-width',
                        value: [
                            {
                                name: '--dropdown--border-left-width',
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
                name: '--dropdown--footer--border-color',
                value: [
                    {
                        name: '--dropdown--footer--border-top-color',
                        value: [
                            {
                                name: '--dropdown--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--footer--border-right-color',
                        value: [
                            {
                                name: '--dropdown--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--footer--border-bottom-color',
                        value: [
                            {
                                name: '--dropdown--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--footer--border-left-color',
                        value: [
                            {
                                name: '--dropdown--border-left-color',
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
                name: '--dropdown--footer--background',
                value: [
                    {
                        name: '--dropdown--background'
                    }
                ],
                variants: [
                    {
                        name: '--dropdown--light--footer--background',
                        value: [
                            {
                                name: '--color-gray-50'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--dark--footer--background',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--footer--padding',
                value: [
                    {
                        name: '--dropdown--footer--padding-top',
                        value: [
                            {
                                name: '--dropdown--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--footer--padding-right',
                        value: [
                            {
                                name: '--dropdown--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--footer--padding-bottom',
                        value: [
                            {
                                name: '--dropdown--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--footer--padding-left',
                        value: [
                            {
                                name: '--dropdown--padding-left',
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
                name: '--dropdown--footer--transition-property',
                value: [
                    {
                        value: '(var(--dropdown--transition-property, (border-color)))'
                    }
                ]
            },
            {
                name: '--dropdown--footer--transition-duration',
                value: [
                    {
                        name: '--dropdown--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--footer--transition-timing-function',
                value: [
                    {
                        name: '--dropdown--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--border-top-left-radius',
                value: [
                    {
                        name: '--border-top-left-radius'
                    }
                ],
                variants: [
                    {
                        name: '--dropdown--sm--border-top-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--md--border-top-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--lg--border-top-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--border-top-right-radius',
                value: [
                    {
                        name: '--border-top-right-radius'
                    }
                ],
                variants: [
                    {
                        name: '--dropdown--sm--border-top-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--md--border-top-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--lg--border-top-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--border-bottom-left-radius',
                value: [
                    {
                        name: '--border-bottom-left-radius'
                    }
                ],
                variants: [
                    {
                        name: '--dropdown--sm--border-bottom-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--md--border-bottom-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--lg--border-bottom-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--border-bottom-right-radius',
                value: [
                    {
                        name: '--border-bottom-right-radius'
                    }
                ],
                variants: [
                    {
                        name: '--dropdown--sm--border-bottom-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--md--border-bottom-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--lg--border-bottom-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
