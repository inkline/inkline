import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'INavbar',
    props: [
        {
            name: 'collapseOnItemClick',
            type: ['Boolean'],
            default: 'true',
            description: 'Determines if the navbar should close when clicking a navbar item'
        },
        {
            name: 'collapseOnClickOutside',
            type: ['Boolean'],
            default: 'true',
            description: 'Determines if the navbar should close when clicking outside'
        },
        {
            name: 'collapse',
            type: ['Boolean', 'String'],
            default: "'md'",
            description:
                'Breakpoint to collapse the navbar at. If boolean value, sets to always or never collapse'
        },
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the navbar'
        },
        {
            name: 'fluid',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the inner container as fluid, spanning 100% width'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the navbar'
        },
        {
            name: 'menuAnimation',
            type: ['close', 'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'plus', 'minus'],
            default: 'close',
            description: 'The animation of the hamburger menu component used for collapsing'
        },
        {
            name: 'modelValue',
            type: ['Boolean'],
            default: 'false',
            description: 'Used to manually control the collapsed state of the navbar'
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
            description: 'Slot for default navbar content '
        }
    ],
    css: {
        selector: '.navbar',
        variables: [
            {
                name: '--navbar--border-radius',
                value: [
                    {
                        name: '--navbar--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--navbar--sm--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--border-top-right-radius',
                        value: [
                            {
                                name: '--border-top-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--navbar--sm--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--border-bottom-right-radius',
                        value: [
                            {
                                name: '--border-bottom-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--navbar--sm--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--navbar--sm--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--border-bottom-left-radius',
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
                name: '--navbar--collapsed--margin-top',
                value: [
                    {
                        name: '--margin-top'
                    }
                ]
            },
            {
                name: '--navbar--transition-property',
                value: [
                    {
                        value: '(background-color, color)'
                    }
                ]
            },
            {
                name: '--navbar--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--navbar--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--navbar--color',
                variants: [
                    {
                        name: '--navbar--light--color',
                        value: [
                            {
                                name: '--contrast-text-color-light'
                            }
                        ]
                    },
                    {
                        name: '--navbar--dark--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--background',
                variants: [
                    {
                        name: '--navbar--light--background',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    },
                    {
                        name: '--navbar--dark--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--padding',
                value: [
                    {
                        name: '--navbar--padding-top',
                        value: [
                            {
                                name: '--padding-top'
                            }
                        ],
                        variants: [
                            {
                                name: '--navbar--sm--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--padding-right',
                        value: [
                            {
                                name: '--padding-right'
                            }
                        ],
                        variants: [
                            {
                                name: '--navbar--sm--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--padding-bottom',
                        value: [
                            {
                                name: '--padding-bottom'
                            }
                        ],
                        variants: [
                            {
                                name: '--navbar--sm--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--padding-left',
                        value: [
                            {
                                name: '--padding-left'
                            }
                        ],
                        variants: [
                            {
                                name: '--navbar--sm--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--navbar--sm--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--navbar--md--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--navbar--lg--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--box-shadow',
                value: [
                    {
                        name: '--navbar--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--navbar--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--navbar--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--navbar--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--navbar--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--border-width',
                value: [
                    {
                        name: '--navbar--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--navbar--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--navbar--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--navbar--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--border-style',
                value: [
                    {
                        name: '--navbar--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--navbar--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--navbar--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--navbar--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--border-color',
                value: [
                    {
                        name: '--navbar--border-top-color',
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--navbar--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--border-right-color',
                        value: [
                            {
                                name: '--border-right-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--navbar--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--border-bottom-color',
                        value: [
                            {
                                name: '--border-bottom-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--navbar--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--border-left-color',
                        value: [
                            {
                                name: '--border-left-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--navbar--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--border-left-color',
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
                name: '--navbar--item--color'
            },
            {
                name: '--navbar--item--padding',
                value: [
                    {
                        name: '--navbar--item--padding-top',
                        value: [
                            {
                                name: '--navbar--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--navbar--sm--item--padding-top',
                                value: [
                                    {
                                        value: 'calc(#{calc(var(--padding-top) / 2)} * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--item--padding-top',
                                value: [
                                    {
                                        value: 'calc(#{calc(var(--padding-top) / 2)} * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--item--padding-top',
                                value: [
                                    {
                                        value: 'calc(#{calc(var(--padding-top) / 2)} * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--padding-right',
                        value: [
                            {
                                name: '--navbar--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--navbar--sm--item--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--item--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--item--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--padding-bottom',
                        value: [
                            {
                                name: '--navbar--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--navbar--sm--item--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(#{calc(var(--padding-bottom) / 2)} * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--item--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(#{calc(var(--padding-bottom) / 2)} * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--item--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(#{calc(var(--padding-bottom) / 2)} * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--padding-left',
                        value: [
                            {
                                name: '--navbar--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ]
                            }
                        ],
                        variants: [
                            {
                                name: '--navbar--sm--item--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--item--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--item--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--item--font-size',
                value: [
                    {
                        name: '--navbar--font-size',
                        value: [
                            {
                                name: '--font-size'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--item--border-radius',
                value: [
                    {
                        name: '--navbar--item--border-top-left-radius',
                        value: [
                            {
                                name: '--navbar--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--border-top-right-radius',
                        value: [
                            {
                                name: '--navbar--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--border-bottom-right-radius',
                        value: [
                            {
                                name: '--navbar--border-bottom-right-radius',
                                value: [
                                    {
                                        name: '--border-bottom-right-radius'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--border-bottom-left-radius',
                        value: [
                            {
                                name: '--navbar--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--item--hover--color',
                value: [
                    {
                        name: '--navbar--item--color'
                    }
                ]
            },
            {
                name: '--navbar--item--hover--background',
                value: [
                    {
                        name: '--navbar--item--background',
                        variants: [
                            {
                                name: '--navbar--light--item--background',
                                value: [
                                    {
                                        name: '--color-light'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--item--background',
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
                        name: '--navbar--light--item--hover--background',
                        value: [
                            {
                                name: '--color-light-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--navbar--dark--item--hover--background',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--collapsed--background',
                variants: [
                    {
                        name: '--navbar--light--collapsed--background',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    },
                    {
                        name: '--navbar--dark--collapsed--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--collapsed--item--background',
                value: [
                    {
                        name: '--navbar--item--background'
                    }
                ]
            },
            {
                name: '--navbar--collapsed--item--color',
                value: [
                    {
                        name: '--navbar--item--color'
                    }
                ]
            },
            {
                name: '--navbar--collapsed--item--hover--color',
                value: [
                    {
                        name: '--navbar--item--hover--color'
                    }
                ]
            },
            {
                name: '--navbar--collapsed--item--hover--background',
                value: [
                    {
                        name: '--navbar--item--hover--background'
                    }
                ]
            }
        ]
    }
};

export default manifest;
