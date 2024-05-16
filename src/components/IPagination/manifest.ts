import type { ComponentManifest } from '@inkline/inkline/types';

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
                name: '--pagination--background',
                value: [],
                variants: [
                    {
                        name: '--pagination--light--item--background',
                        value: [
                            {
                                name: '--pagination--light--item--background-h',
                                value: [
                                    {
                                        name: '--color-white-h'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--light--item--background-s',
                                value: [
                                    {
                                        name: '--color-white-s'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--light--item--background-l',
                                value: [
                                    {
                                        name: '--color-white-l'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--light--item--background-a',
                                value: [
                                    {
                                        name: '--color-white-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--light--item--hover--background',
                        value: [
                            {
                                name: '--pagination--light--item--hover--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--light--item--hover--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--light--item--hover--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--light--item--hover--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--dark--item--background',
                        value: [
                            {
                                name: '--pagination--dark--item--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--dark--item--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--dark--item--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--dark--item--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--dark--item--hover--background',
                        value: [
                            {
                                name: '--pagination--dark--item--hover--background-h',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--dark--item--hover--background-s',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--dark--item--hover--background-l',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--dark--item--hover--background-a',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-a'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--border-width',
                value: []
            },
            {
                name: '--pagination--border-style',
                value: []
            },
            {
                name: '--pagination--border-color',
                value: [],
                variants: [
                    {
                        name: '--pagination--item--disabled--border-color',
                        value: [
                            {
                                name: '--pagination--item--disabled--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--item--disabled--border-right-color',
                                value: []
                            },
                            {
                                name: '--pagination--item--disabled--border-bottom-color',
                                value: []
                            },
                            {
                                name: '--pagination--item--disabled--border-left-color',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--pagination--light--item--border-color',
                        value: [
                            {
                                name: '--pagination--light--item--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--light--item--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--light--item--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--light--item--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--dark--item--border-color',
                        value: [
                            {
                                name: '--pagination--dark--item--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--dark--item--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--dark--item--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--dark--item--border-left-color',
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
                name: '--pagination--border-radius',
                value: [],
                variants: [
                    {
                        name: '--pagination--sm--item--border-radius',
                        value: [
                            {
                                name: '--pagination--sm--item--border-top-left-radius',
                                value: []
                            },
                            {
                                name: '--pagination--sm--item--border-top-right-radius',
                                value: []
                            },
                            {
                                name: '--pagination--sm--item--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--pagination--sm--item--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--pagination--md--item--border-radius',
                        value: [
                            {
                                name: '--pagination--md--item--border-top-left-radius',
                                value: []
                            },
                            {
                                name: '--pagination--md--item--border-top-right-radius',
                                value: []
                            },
                            {
                                name: '--pagination--md--item--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--pagination--md--item--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--pagination--lg--item--border-radius',
                        value: [
                            {
                                name: '--pagination--lg--item--border-top-left-radius',
                                value: []
                            },
                            {
                                name: '--pagination--lg--item--border-top-right-radius',
                                value: []
                            },
                            {
                                name: '--pagination--lg--item--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--pagination--lg--item--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--box-shadow',
                value: []
            },
            {
                name: '--pagination--color',
                value: [
                    {
                        name: '--pagination--color-h',
                        value: [
                            {
                                name: '--contrast-text-color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--pagination--color-s',
                        value: [
                            {
                                name: '--contrast-text-color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--pagination--color-l',
                        value: [
                            {
                                name: '--contrast-text-color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--pagination--color-a',
                        value: [
                            {
                                name: '--contrast-text-color-light-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--pagination--light--color',
                        value: [
                            {
                                name: '--pagination--light--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--light--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--light--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--light--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--dark--color',
                        value: [
                            {
                                name: '--pagination--dark--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--dark--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--dark--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--dark--color-a',
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
                name: '--pagination--font-size',
                value: [],
                variants: [
                    {
                        name: '--pagination--sm--font-size',
                        value: [
                            {
                                name: '--font-size-sm'
                            }
                        ]
                    },
                    {
                        name: '--pagination--md--font-size',
                        value: [
                            {
                                name: '--font-size-md'
                            }
                        ]
                    },
                    {
                        name: '--pagination--lg--font-size',
                        value: [
                            {
                                name: '--font-size-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--padding',
                value: [],
                variants: [
                    {
                        name: '--pagination--sm--item--padding',
                        value: [
                            {
                                name: '--pagination--sm--item--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-sm'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--sm--item--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-sm'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--sm--item--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-sm'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--sm--item--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-sm'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--md--item--padding',
                        value: [
                            {
                                name: '--pagination--md--item--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-md'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--md--item--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-md'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--md--item--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-md'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--md--item--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--pagination--lg--item--padding',
                        value: [
                            {
                                name: '--pagination--lg--item--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-lg'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--lg--item--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-lg'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--lg--item--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-lg'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--lg--item--padding-left',
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
                name: '--pagination--item--background',
                value: [
                    {
                        name: '--pagination--item--background-h',
                        value: [
                            {
                                name: '--color-white-h'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--background-s',
                        value: [
                            {
                                name: '--color-white-s'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--background-l',
                        value: [
                            {
                                name: '--color-white-l'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--background-a',
                        value: [
                            {
                                name: '--color-white-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--item--border-width',
                value: [
                    {
                        name: '--pagination--item--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--item--border-style',
                value: [
                    {
                        name: '--pagination--item--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--item--border-color',
                value: [
                    {
                        name: '--pagination--item--border-top-color',
                        value: []
                    },
                    {
                        name: '--pagination--item--border-right-color',
                        value: []
                    },
                    {
                        name: '--pagination--item--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--pagination--item--border-left-color',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--pagination--item--disabled--border-color',
                        value: [
                            {
                                name: '--pagination--item--disabled--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--pagination--item--disabled--border-right-color',
                                value: []
                            },
                            {
                                name: '--pagination--item--disabled--border-bottom-color',
                                value: []
                            },
                            {
                                name: '--pagination--item--disabled--border-left-color',
                                value: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--item--border-radius',
                value: [
                    {
                        name: '--pagination--item--border-top-left-radius',
                        value: []
                    },
                    {
                        name: '--pagination--item--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--pagination--item--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--pagination--item--border-bottom-left-radius',
                        value: []
                    }
                ]
            },
            {
                name: '--pagination--item--box-shadow',
                value: []
            },
            {
                name: '--pagination--item--color',
                value: []
            },
            {
                name: '--pagination--item--min-width',
                value: [
                    {
                        value: '40px'
                    }
                ]
            },
            {
                name: '--pagination--item--margin',
                value: []
            },
            {
                name: '--pagination--item--padding',
                value: [
                    {
                        name: '--pagination--item--padding-top',
                        value: []
                    },
                    {
                        name: '--pagination--item--padding-right',
                        value: []
                    },
                    {
                        name: '--pagination--item--padding-bottom',
                        value: []
                    },
                    {
                        name: '--pagination--item--padding-left',
                        value: []
                    }
                ]
            },
            {
                name: '--pagination--item--transition',
                value: [
                    {
                        name: '--pagination--item--transition-property'
                    },
                    {
                        name: '--pagination--item--transition-duration'
                    },
                    {
                        name: '--pagination--item--transition-timing-function'
                    }
                ]
            },
            {
                name: '--pagination--item--hover--background',
                value: [
                    {
                        name: '--pagination--item--hover--background-h',
                        value: [
                            {
                                name: '--color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--hover--background-s',
                        value: [
                            {
                                name: '--color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--hover--background-l',
                        value: [
                            {
                                name: '--color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--hover--background-a',
                        value: [
                            {
                                name: '--color-light-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--item--focus--background',
                value: []
            },
            {
                name: '--pagination--item--active--background',
                value: [
                    {
                        name: '--pagination--item--active--background-h',
                        value: [
                            {
                                name: '--color-primary-h'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--active--background-s',
                        value: [
                            {
                                name: '--color-primary-s'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--active--background-l',
                        value: [
                            {
                                name: '--color-primary-l'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--active--background-a',
                        value: [
                            {
                                name: '--color-primary-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--item--active--border-color',
                value: [
                    {
                        name: '--pagination--item--active--border-top-color',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--active--border-right-color',
                        value: []
                    },
                    {
                        name: '--pagination--item--active--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--pagination--item--active--border-left-color',
                        value: []
                    }
                ]
            },
            {
                name: '--pagination--item--active--color',
                value: [
                    {
                        name: '--pagination--item--active--color-h',
                        value: [
                            {
                                name: '--contrast-text-color-dark-h'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--active--color-s',
                        value: [
                            {
                                name: '--contrast-text-color-dark-s'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--active--color-l',
                        value: [
                            {
                                name: '--contrast-text-color-dark-l'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--active--color-a',
                        value: [
                            {
                                name: '--contrast-text-color-dark-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--item--active--font-weight',
                value: [
                    {
                        name: '--font-weight-semibold'
                    }
                ]
            },
            {
                name: '--pagination--item--active--hover--background',
                value: []
            },
            {
                name: '--pagination--item--active--focus--background',
                value: []
            },
            {
                name: '--pagination--item--disabled--color',
                value: [
                    {
                        name: '--pagination--item--disabled--color-h',
                        value: [
                            {
                                name: '--text-color-weaker-h'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--disabled--color-s',
                        value: [
                            {
                                name: '--text-color-weaker-s'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--disabled--color-l',
                        value: [
                            {
                                name: '--text-color-weaker-l'
                            }
                        ]
                    },
                    {
                        name: '--pagination--item--disabled--color-a',
                        value: [
                            {
                                name: '--text-color-weaker-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--pagination--item--disabled--opacity',
                value: [
                    {
                        value: '0.75'
                    }
                ]
            }
        ]
    }
};

export default manifest;
