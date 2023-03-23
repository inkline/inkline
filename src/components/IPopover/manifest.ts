import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IPopover',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the popover'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the popover'
        },
        {
            name: 'visible',
            type: ['Boolean'],
            default: 'undefined',
            description: 'Used to manually control the visibility of the popover'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The identifier of the popover'
        },
        {
            name: 'arrow',
            type: ['Boolean'],
            default: 'true',
            description: 'Displays an arrow on the popover pointing to the trigger element'
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
            description: 'The placement of the popover'
        },
        {
            name: 'events',
            type: ['hover', 'focus', 'click', 'manual'],
            default: 'hover, focus',
            description: 'The events used to trigger the popover'
        },
        {
            name: 'offset',
            type: ['Number'],
            default: '6',
            description: 'The offset of the popover relative to the trigger element'
        },
        {
            name: 'interactable',
            type: ['Boolean'],
            default: 'false',
            description:
                'Determines whether hover state should be transferred from trigger to popup'
        },
        {
            name: 'popupOptions',
            type: ['Object'],
            default: '',
            description: 'Used to override the floating-ui options used for creating the popover'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the popover'
        },
        {
            name: 'hoverHideDelay',
            type: ['Number'],
            default: '300',
            description: 'Delay in milliseconds before the popover is hidden on hover'
        },
        {
            name: 'animationDuration',
            type: ['Number'],
            default: '300',
            description: 'Animation duration in milliseconds'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the visible',
            name: 'update:visible'
        },
        {
            description: 'Event emitted when clicking outside the popover',
            name: 'click:outside'
        }
    ],
    slots: [
        {
            name: 'default',
            description: 'Slot for popover trigger '
        },
        {
            name: 'header',
            description: 'Slot for popover header content '
        },
        {
            name: 'body',
            description: 'Slot for popover body content '
        },
        {
            name: 'footer',
            description: 'Slot for popover footer content '
        }
    ],
    css: {
        selector: '.popover-wrapper',
        variables: [
            {
                name: '--popover--line-height',
                value: [
                    {
                        name: '--line-height'
                    }
                ]
            },
            {
                name: '--popover--box-shadow',
                value: [
                    {
                        name: '--popover--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--popover--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--popover--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--popover--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--popover--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--popover--width',
                value: [
                    {
                        value: '280px'
                    }
                ]
            },
            {
                name: '--popover--max-width',
                value: [
                    {
                        value: '90vw'
                    }
                ]
            },
            {
                name: '--popover--color',
                variants: [
                    {
                        name: '--popover--light--color',
                        value: [
                            {
                                name: '--contrast-text-color-white'
                            }
                        ]
                    },
                    {
                        name: '--popover--dark--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--popover--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--popover--sm--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--popover--md--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--popover--lg--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--popover--header--border-style',
                value: [
                    {
                        name: '--popover--header--border-top-style',
                        value: [
                            {
                                name: '--popover--border-top-style',
                                value: [
                                    {
                                        name: '--border-top-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--header--border-right-style',
                        value: [
                            {
                                name: '--popover--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--header--border-bottom-style',
                        value: [
                            {
                                name: '--popover--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--header--border-left-style',
                        value: [
                            {
                                name: '--popover--border-left-style',
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
                name: '--popover--header--border-width',
                value: [
                    {
                        name: '--popover--header--border-top-width',
                        value: [
                            {
                                name: '--popover--border-top-width',
                                value: [
                                    {
                                        name: '--border-top-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--header--border-right-width',
                        value: [
                            {
                                name: '--popover--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--header--border-bottom-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--popover--header--border-left-width',
                        value: [
                            {
                                name: '--popover--border-left-width',
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
                name: '--popover--header--border-color',
                value: [
                    {
                        name: '--popover--header--border-top-color',
                        value: [
                            {
                                name: '--popover--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--popover--light--border-top-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--popover--dark--border-top-color',
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
                        name: '--popover--header--border-right-color',
                        value: [
                            {
                                name: '--popover--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--popover--light--border-right-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--popover--dark--border-right-color',
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
                        name: '--popover--header--border-bottom-color',
                        value: [
                            {
                                name: '--popover--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--popover--light--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--popover--dark--border-bottom-color',
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
                        name: '--popover--header--border-left-color',
                        value: [
                            {
                                name: '--popover--border-left-color',
                                value: [
                                    {
                                        name: '--border-left-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--popover--light--border-left-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--popover--dark--border-left-color',
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
                name: '--popover--header--padding',
                value: [
                    {
                        name: '--popover--header--padding-top',
                        value: [
                            {
                                name: '--popover--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--popover--sm--padding-top',
                                        value: [
                                            {
                                                value: 'calc(#{calc(var(--padding-top) * 3 / 4)} * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--popover--md--padding-top',
                                        value: [
                                            {
                                                value: 'calc(#{calc(var(--padding-top) * 3 / 4)} * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--popover--lg--padding-top',
                                        value: [
                                            {
                                                value: 'calc(#{calc(var(--padding-top) * 3 / 4)} * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--header--padding-right',
                        value: [
                            {
                                name: '--popover--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--popover--sm--padding-right',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-right) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--popover--md--padding-right',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-right) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--popover--lg--padding-right',
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
                        name: '--popover--header--padding-bottom',
                        value: [
                            {
                                name: '--popover--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--popover--sm--padding-bottom',
                                        value: [
                                            {
                                                value: 'calc(#{calc(var(--padding-bottom) * 3 / 4)} * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--popover--md--padding-bottom',
                                        value: [
                                            {
                                                value: 'calc(#{calc(var(--padding-bottom) * 3 / 4)} * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--popover--lg--padding-bottom',
                                        value: [
                                            {
                                                value: 'calc(#{calc(var(--padding-bottom) * 3 / 4)} * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--popover--sm--header--padding-bottom',
                                value: [
                                    {
                                        name: '----padding-bottom-sm'
                                    }
                                ]
                            },
                            {
                                name: '--popover--md--header--padding-bottom',
                                value: [
                                    {
                                        name: '----padding-bottom-md'
                                    }
                                ]
                            },
                            {
                                name: '--popover--lg--header--padding-bottom',
                                value: [
                                    {
                                        name: '----padding-bottom-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--header--padding-left',
                        value: [
                            {
                                name: '--popover--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--popover--sm--padding-left',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-left) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--popover--md--padding-left',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-left) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--popover--lg--padding-left',
                                        value: [
                                            {
                                                value: 'calc(var(--padding-left) * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--popover--sm--header--padding-left',
                                value: [
                                    {
                                        name: '----padding-left-sm'
                                    }
                                ]
                            },
                            {
                                name: '--popover--md--header--padding-left',
                                value: [
                                    {
                                        name: '----padding-left-md'
                                    }
                                ]
                            },
                            {
                                name: '--popover--lg--header--padding-left',
                                value: [
                                    {
                                        name: '----padding-left-lg'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--popover--header--background',
                value: [
                    {
                        name: '--popover--background',
                        variants: [
                            {
                                name: '--popover--light--background',
                                value: [
                                    {
                                        name: '--color-white'
                                    }
                                ]
                            },
                            {
                                name: '--popover--dark--background',
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
                        name: '--popover--light--header--background',
                        value: [
                            {
                                name: '--color-gray-50'
                            }
                        ]
                    },
                    {
                        name: '--popover--dark--header--background',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--popover--body--border-style',
                value: [
                    {
                        name: '--popover--body--border-top-style',
                        value: [
                            {
                                name: '--popover--border-top-style',
                                value: [
                                    {
                                        name: '--border-top-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--body--border-right-style',
                        value: [
                            {
                                name: '--popover--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--body--border-bottom-style',
                        value: [
                            {
                                name: '--popover--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--body--border-left-style',
                        value: [
                            {
                                name: '--popover--border-left-style',
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
                name: '--popover--body--border-width',
                value: [
                    {
                        name: '--popover--body--border-top-width',
                        value: [
                            {
                                name: '--popover--border-top-width',
                                value: [
                                    {
                                        name: '--border-top-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--body--border-right-width',
                        value: [
                            {
                                name: '--popover--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--body--border-bottom-width',
                        value: [
                            {
                                name: '--popover--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--body--border-left-width',
                        value: [
                            {
                                name: '--popover--border-left-width',
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
                name: '--popover--body--border-color',
                value: [
                    {
                        name: '--popover--body--border-top-color',
                        value: [
                            {
                                name: '--popover--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--body--border-right-color',
                        value: [
                            {
                                name: '--popover--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--body--border-bottom-color',
                        value: [
                            {
                                name: '--popover--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--body--border-left-color',
                        value: [
                            {
                                name: '--popover--border-left-color',
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
                name: '--popover--body--padding',
                value: [
                    {
                        name: '--popover--body--padding-top',
                        value: [
                            {
                                name: '--popover--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--body--padding-right',
                        value: [
                            {
                                name: '--popover--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--body--padding-bottom',
                        value: [
                            {
                                name: '--popover--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--popover--sm--body--padding-bottom',
                                value: [
                                    {
                                        name: '----padding-bottom-sm'
                                    }
                                ]
                            },
                            {
                                name: '--popover--md--body--padding-bottom',
                                value: [
                                    {
                                        name: '----padding-bottom-md'
                                    }
                                ]
                            },
                            {
                                name: '--popover--lg--body--padding-bottom',
                                value: [
                                    {
                                        name: '----padding-bottom-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--body--padding-left',
                        value: [
                            {
                                name: '--popover--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--popover--sm--body--padding-left',
                                value: [
                                    {
                                        name: '----padding-left-sm'
                                    }
                                ]
                            },
                            {
                                name: '--popover--md--body--padding-left',
                                value: [
                                    {
                                        name: '----padding-left-md'
                                    }
                                ]
                            },
                            {
                                name: '--popover--lg--body--padding-left',
                                value: [
                                    {
                                        name: '----padding-left-lg'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--popover--body--background',
                value: [
                    {
                        name: '--popover--background'
                    }
                ]
            },
            {
                name: '--popover--footer--border-style',
                value: [
                    {
                        name: '--popover--footer--border-top-style',
                        value: [
                            {
                                name: '--popover--border-top-style',
                                value: [
                                    {
                                        name: '--border-top-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--footer--border-right-style',
                        value: [
                            {
                                name: '--popover--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--footer--border-bottom-style',
                        value: [
                            {
                                name: '--popover--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--footer--border-left-style',
                        value: [
                            {
                                name: '--popover--border-left-style',
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
                name: '--popover--footer--border-width',
                value: [
                    {
                        name: '--popover--footer--border-top-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--popover--footer--border-right-width',
                        value: [
                            {
                                name: '--popover--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--footer--border-bottom-width',
                        value: [
                            {
                                name: '--popover--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--footer--border-left-width',
                        value: [
                            {
                                name: '--popover--border-left-width',
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
                name: '--popover--footer--border-color',
                value: [
                    {
                        name: '--popover--footer--border-top-color',
                        value: [
                            {
                                name: '--popover--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--footer--border-right-color',
                        value: [
                            {
                                name: '--popover--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--footer--border-bottom-color',
                        value: [
                            {
                                name: '--popover--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--footer--border-left-color',
                        value: [
                            {
                                name: '--popover--border-left-color',
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
                name: '--popover--footer--padding',
                value: [
                    {
                        name: '--popover--footer--padding-top',
                        value: [
                            {
                                name: '--popover--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--footer--padding-right',
                        value: [
                            {
                                name: '--popover--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--footer--padding-bottom',
                        value: [
                            {
                                name: '--popover--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--popover--sm--footer--padding-bottom',
                                value: [
                                    {
                                        name: '----padding-bottom-sm'
                                    }
                                ]
                            },
                            {
                                name: '--popover--md--footer--padding-bottom',
                                value: [
                                    {
                                        name: '----padding-bottom-md'
                                    }
                                ]
                            },
                            {
                                name: '--popover--lg--footer--padding-bottom',
                                value: [
                                    {
                                        name: '----padding-bottom-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--popover--footer--padding-left',
                        value: [
                            {
                                name: '--popover--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--popover--sm--footer--padding-left',
                                value: [
                                    {
                                        name: '----padding-left-sm'
                                    }
                                ]
                            },
                            {
                                name: '--popover--md--footer--padding-left',
                                value: [
                                    {
                                        name: '----padding-left-md'
                                    }
                                ]
                            },
                            {
                                name: '--popover--lg--footer--padding-left',
                                value: [
                                    {
                                        name: '----padding-left-lg'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--popover--footer--background',
                value: [
                    {
                        name: '--popover--background'
                    }
                ],
                variants: [
                    {
                        name: '--popover--light--footer--background',
                        value: [
                            {
                                name: '--color-gray-50'
                            }
                        ]
                    },
                    {
                        name: '--popover--dark--footer--background',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--popover--border-top-left-radius',
                value: [
                    {
                        name: '--border-top-left-radius'
                    }
                ],
                variants: [
                    {
                        name: '--popover--sm--border-top-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--popover--md--border-top-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--popover--lg--border-top-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--popover--border-top-right-radius',
                value: [
                    {
                        name: '--border-top-right-radius'
                    }
                ],
                variants: [
                    {
                        name: '--popover--sm--border-top-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--popover--md--border-top-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--popover--lg--border-top-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--popover--border-bottom-left-radius',
                value: [
                    {
                        name: '--border-bottom-left-radius'
                    }
                ],
                variants: [
                    {
                        name: '--popover--sm--border-bottom-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--popover--md--border-bottom-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--popover--lg--border-bottom-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--popover--border-bottom-right-radius',
                value: [
                    {
                        name: '--border-bottom-right-radius'
                    }
                ],
                variants: [
                    {
                        name: '--popover--sm--border-bottom-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--popover--md--border-bottom-right-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--popover--lg--border-bottom-right-radius',
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
