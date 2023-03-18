import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ISidebar',
    props: [
        {
            name: 'ariaLabel',
            type: ['String'],
            default: 'Sidebar',
            description: 'The aria-label of the sidebar'
        },
        {
            name: 'collapse',
            type: ['Boolean', 'String'],
            default: "'md'",
            description:
                'Breakpoint to collapse the sidebar at. If boolean value, sets to always or never collapse'
        },
        {
            name: 'collapseOnItemClick',
            type: ['Boolean'],
            default: 'true',
            description: 'Determines if the sidebar should close when clicking a sidebar item'
        },
        {
            name: 'collapseOnClickOutside',
            type: ['Boolean'],
            default: 'true',
            description:
                'Determines if the sidebar should close when clicking outside, on the overlay'
        },
        {
            name: 'collapsePosition',
            type: ['fixed', 'absolute', 'relative'],
            default: 'absolute',
            description: 'The collapse position of the sidebar'
        },
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the sidebar'
        },
        {
            name: 'placement',
            type: ['left', 'right'],
            default: 'left',
            description: 'The placement of the sidebar'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the navbar'
        },
        {
            name: 'modelValue',
            type: ['Boolean'],
            default: 'false',
            description: 'Used to manually control the collapsed state of the sidebar'
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
            description: 'Slot for sidebar content '
        }
    ],
    css: {
        selector: '.sidebar-wrapper',
        variables: [
            {
                name: '--sidebar--z-index',
                value: [
                    {
                        value: '1030'
                    }
                ]
            },
            {
                name: '--sidebar--width',
                value: [
                    {
                        value: '14rem'
                    }
                ],
                variants: [
                    {
                        name: '--sidebar--sm--width',
                        value: [
                            {
                                name: '--size-multiplier-sm'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--md--width',
                        value: [
                            {
                                name: '--size-multiplier-md'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--lg--width',
                        value: [
                            {
                                name: '--size-multiplier-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--sidebar--color',
                variants: [
                    {
                        name: '--sidebar--light--color',
                        value: [
                            {
                                name: '--contrast-text-color-light'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--dark--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--sidebar--background',
                variants: [
                    {
                        name: '--sidebar--light--background',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--dark--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--sidebar--width',
                value: [
                    {
                        value: '14rem'
                    }
                ],
                variants: [
                    {
                        name: '--sidebar--sm--width',
                        value: [
                            {
                                name: '--size-multiplier-sm'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--md--width',
                        value: [
                            {
                                name: '--size-multiplier-md'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--lg--width',
                        value: [
                            {
                                name: '--size-multiplier-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--sidebar--transition-property',
                value: [
                    {
                        value: 'background-color,\n            color,\n            border-color'
                    }
                ]
            },
            {
                name: '--sidebar--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--sidebar--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--sidebar--box-shadow',
                value: [
                    {
                        name: '--sidebar--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--sidebar--border-width',
                value: [
                    {
                        name: '--sidebar--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--sidebar--border-style',
                value: [
                    {
                        name: '--sidebar--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--sidebar--border-color',
                value: [
                    {
                        name: '--sidebar--border-top-color',
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--sidebar--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--sidebar--border-right-color',
                        value: [
                            {
                                name: '--border-right-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--sidebar--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--sidebar--border-bottom-color',
                        value: [
                            {
                                name: '--border-bottom-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--sidebar--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--sidebar--border-left-color',
                        value: [
                            {
                                name: '--border-left-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--sidebar--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--dark--border-left-color',
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
                name: '--sidebar--border-radius',
                value: [
                    {
                        name: '--sidebar--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--sidebar--sm--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius'
                                    },
                                    {
                                        name: '--size-multiplier-sm'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--md--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius'
                                    },
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--lg--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius'
                                    },
                                    {
                                        name: '--size-multiplier-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--sidebar--border-top-right-radius',
                        value: [
                            {
                                name: '--border-top-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--sidebar--sm--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius'
                                    },
                                    {
                                        name: '--size-multiplier-sm'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--md--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius'
                                    },
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--lg--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius'
                                    },
                                    {
                                        name: '--size-multiplier-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--sidebar--border-bottom-right-radius',
                        value: [
                            {
                                name: '--border-bottom-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--sidebar--sm--border-bottom-right-radius',
                                value: [
                                    {
                                        name: '--border-bottom-right-radius'
                                    },
                                    {
                                        name: '--size-multiplier-sm'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--md--border-bottom-right-radius',
                                value: [
                                    {
                                        name: '--border-bottom-right-radius'
                                    },
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--lg--border-bottom-right-radius',
                                value: [
                                    {
                                        name: '--border-bottom-right-radius'
                                    },
                                    {
                                        name: '--size-multiplier-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--sidebar--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--sidebar--sm--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius'
                                    },
                                    {
                                        name: '--size-multiplier-sm'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--md--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius'
                                    },
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--lg--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius'
                                    },
                                    {
                                        name: '--size-multiplier-lg'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--sidebar--padding',
                value: [
                    {
                        name: '--sidebar--padding-top',
                        value: [
                            {
                                name: '--padding-top'
                            }
                        ],
                        variants: [
                            {
                                name: '--sidebar--sm--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    },
                                    {
                                        name: '--size-multiplier-sm'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--md--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    },
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--lg--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    },
                                    {
                                        name: '--size-multiplier-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--sidebar--padding-right',
                        value: [
                            {
                                name: '--padding-right'
                            }
                        ],
                        variants: [
                            {
                                name: '--sidebar--sm--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    },
                                    {
                                        name: '--size-multiplier-sm'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--md--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    },
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--lg--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    },
                                    {
                                        name: '--size-multiplier-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--sidebar--padding-bottom',
                        value: [
                            {
                                name: '--padding-bottom'
                            }
                        ],
                        variants: [
                            {
                                name: '--sidebar--sm--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    },
                                    {
                                        name: '--size-multiplier-sm'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--md--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    },
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--lg--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    },
                                    {
                                        name: '--size-multiplier-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--sidebar--padding-left',
                        value: [
                            {
                                name: '--padding-left'
                            }
                        ],
                        variants: [
                            {
                                name: '--sidebar--sm--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    },
                                    {
                                        name: '--size-multiplier-sm'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--md--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    },
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--sidebar--lg--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    },
                                    {
                                        name: '--size-multiplier-lg'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--sidebar--overlay--background',
                value: [
                    {
                        value: 'rgba(0, 0, 0, 0.5)'
                    }
                ]
            },
            {
                name: '--sidebar--border-top-left-radius',
                value: [
                    {
                        name: '--border-top-left-radius'
                    }
                ],
                variants: [
                    {
                        name: '--sidebar--sm--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            },
                            {
                                name: '--size-multiplier-sm'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--md--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            },
                            {
                                name: '--size-multiplier-md'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--lg--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            },
                            {
                                name: '--size-multiplier-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--sidebar--border-bottom-left-radius',
                value: [
                    {
                        name: '--border-bottom-left-radius'
                    }
                ],
                variants: [
                    {
                        name: '--sidebar--sm--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            },
                            {
                                name: '--size-multiplier-sm'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--md--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            },
                            {
                                name: '--size-multiplier-md'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--lg--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            },
                            {
                                name: '--size-multiplier-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--sidebar--width',
                variants: [
                    {
                        name: '--sidebar--sm--width',
                        value: [
                            {
                                name: '--size-multiplier-sm'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--md--width',
                        value: [
                            {
                                name: '--size-multiplier-md'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--lg--width',
                        value: [
                            {
                                name: '--size-multiplier-lg'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
