import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IPagination',
    props: [
        {
            name: 'ariaLabel',
            type: ['String'],
            default: 'Pagination',
            description: 'The aria-label of the pagination'
        },
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the pagination'
        },
        {
            name: 'itemsPerPage',
            type: ['Number'],
            default: '20',
            description: 'The number of items per page to be displayed'
        },
        {
            name: 'itemsTotal',
            type: ['Number'],
            default: '0',
            description: 'The total number of items'
        },
        {
            name: 'limit',
            type: ['Number', 'Object'],
            default: '',
            description: 'The maximum number of pagination buttons to show on each breakpoint'
        },
        {
            name: 'quickLink',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the quick link buttons'
        },
        {
            name: 'modelValue',
            type: ['Number'],
            default: '1',
            description: 'Used to determine the current page'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the pagination'
        },
        {
            name: 'showNavigationWhenDisabled',
            type: ['boolean'],
            default: 'true',
            description: 'Show or hide navigation buttons for first or last page'
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
            name: 'previous',
            description: 'Slot for previous button content '
        },
        {
            name: 'next',
            description: 'Slot for next button content '
        }
    ],
    css: {
        selector: '.pagination',
        variables: [
            {
                name: '--pagination--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--pagination--sm--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--pagination--md--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--pagination--lg--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--border-color',
                value: [
                    {
                        name: '--pagination--border-top-color',
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--pagination--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--border-right-color',
                        value: [
                            {
                                name: '--border-right-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--pagination--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--border-bottom-color',
                        value: [
                            {
                                name: '--border-bottom-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--pagination--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--border-left-color',
                        value: [
                            {
                                name: '--border-left-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--pagination--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--dark--border-left-color',
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
                name: '--pagination--border-width',
                value: [
                    {
                        name: '--pagination--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--pagination--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--pagination--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--pagination--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--border-style',
                value: [
                    {
                        name: '--pagination--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--pagination--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--pagination--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--pagination--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--border-radius',
                value: [
                    {
                        name: '--pagination--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--pagination--sm--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--md--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--lg--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--border-top-right-radius',
                        value: [
                            {
                                name: '--border-top-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--pagination--sm--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--md--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--lg--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--border-bottom-right-radius',
                        value: [
                            {
                                name: '--border-bottom-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--pagination--sm--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--md--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--lg--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--pagination--sm--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--md--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--lg--border-bottom-left-radius',
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
                name: '--pagination--box-shadow',
                value: [
                    {
                        name: '--pagination--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--pagination--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--pagination--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--pagination--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--pagination--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--padding',
                value: [
                    {
                        name: '--pagination--padding-top',
                        value: [
                            {
                                name: '--padding-top'
                            }
                        ],
                        variants: [
                            {
                                name: '--pagination--sm--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top) / 2 * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--md--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top) / 2 * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--lg--padding-top',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-top) / 2) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--padding-right',
                        value: [
                            {
                                name: '--padding-right'
                            }
                        ],
                        variants: [
                            {
                                name: '--pagination--sm--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) / 2 * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--md--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) / 2 * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--lg--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) / 2 * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--padding-bottom',
                        value: [
                            {
                                name: '--padding-bottom'
                            }
                        ],
                        variants: [
                            {
                                name: '--pagination--sm--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom) / 2 * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--md--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom) / 2 * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--lg--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom) / 2 * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--padding-left',
                        value: [
                            {
                                name: '--padding-left'
                            }
                        ],
                        variants: [
                            {
                                name: '--pagination--sm--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left) / 2 * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--md--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left) / 2 * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--lg--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left) / 2 * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--min-width',
                value: [
                    {
                        value: '40px'
                    }
                ],
                variants: [
                    {
                        name: '--pagination--sm--min-width',
                        value: [
                            {
                                value: 'calc(40px * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--pagination--md--min-width',
                        value: [
                            {
                                value: 'calc(40px * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--pagination--lg--min-width',
                        value: [
                            {
                                value: 'calc(40px * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--color',
                variants: [
                    {
                        name: '--pagination--light--color',
                        value: [
                            {
                                name: '--contrast-text-color-light'
                            }
                        ]
                    },
                    {
                        name: '--pagination--dark--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--background',
                variants: [
                    {
                        name: '--pagination--light--background',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    },
                    {
                        name: '--pagination--dark--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--margin',
                value: [
                    {
                        name: '--pagination--margin-top',
                        value: [
                            {
                                name: '--margin-top'
                            }
                        ]
                    },
                    {
                        name: '--pagination--margin-right',
                        value: [
                            {
                                name: '--margin-right'
                            }
                        ],
                        variants: [
                            {
                                name: '--pagination--sm--margin-right',
                                value: [
                                    {
                                        value: 'calc(calc(var(--margin-right) / 4) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--md--margin-right',
                                value: [
                                    {
                                        value: 'calc(var(--margin-right) / 4 * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--lg--margin-right',
                                value: [
                                    {
                                        value: 'calc(var(--margin-right) / 4 * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--margin-bottom',
                        value: [
                            {
                                name: '--margin-bottom'
                            }
                        ]
                    },
                    {
                        name: '--pagination--margin-left',
                        value: [
                            {
                                name: '--margin-left'
                            }
                        ],
                        variants: [
                            {
                                name: '--pagination--sm--margin-left',
                                value: [
                                    {
                                        value: 'calc(calc(var(--margin-left) / 4) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--md--margin-left',
                                value: [
                                    {
                                        value: 'calc(var(--margin-left) / 4 * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--lg--margin-left',
                                value: [
                                    {
                                        value: 'calc(var(--margin-left) / 4 * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--transition-property',
                value: [
                    {
                        value: '(background, color, border)'
                    }
                ]
            },
            {
                name: '--pagination--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--pagination--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--pagination--hover--background',
                variants: [
                    {
                        name: '--pagination--light--hover--background',
                        value: [
                            {
                                name: '--color-light-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--pagination--dark--hover--background',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--active--background',
                value: [
                    {
                        name: '--pagination--background'
                    }
                ],
                variants: [
                    {
                        name: '--pagination--light--active--background',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--pagination--dark--active--background',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--active--border-color',
                value: [
                    {
                        name: '--pagination--active--border-top-color',
                        value: [
                            {
                                name: '--pagination--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--active--border-right-color',
                        value: [
                            {
                                name: '--pagination--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--active--border-bottom-color',
                        value: [
                            {
                                name: '--pagination--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--active--border-left-color',
                        value: [
                            {
                                name: '--pagination--border-left-color',
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
                name: '--pagination--active--color',
                value: [
                    {
                        name: '--pagination--color'
                    }
                ],
                variants: [
                    {
                        name: '--pagination--light--active--color',
                        value: [
                            {
                                name: '--contrast-text-color-primary'
                            }
                        ]
                    },
                    {
                        name: '--pagination--dark--active--color',
                        value: [
                            {
                                name: '--contrast-text-color-primary'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--disabled--color',
                value: [
                    {
                        name: '--pagination--color'
                    }
                ],
                variants: [
                    {
                        name: '--pagination--light--disabled--color',
                        value: [
                            {
                                name: '--text-color-weak'
                            }
                        ]
                    },
                    {
                        name: '--pagination--dark--disabled--color',
                        value: [
                            {
                                name: '--text-color-weak'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--disabled--opacity',
                value: [
                    {
                        value: '0.75'
                    }
                ]
            },
            {
                name: '--pagination--quick--disabled--border-color',
                value: [
                    {
                        name: '--pagination--disabled--color'
                    }
                ]
            },
            {
                name: '--pagination--quick--disabled--opacity',
                value: [
                    {
                        name: '--pagination--disabled--opacity',
                        value: [
                            {
                                value: '0.75'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
