import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'Navbar',
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
                name: '--navbar--background',
                value: [
                    {
                        name: '--navbar--background-h',
                        value: [
                            {
                                name: '--color-white-h'
                            }
                        ]
                    },
                    {
                        name: '--navbar--background-s',
                        value: [
                            {
                                name: '--color-white-s'
                            }
                        ]
                    },
                    {
                        name: '--navbar--background-l',
                        value: [
                            {
                                name: '--color-white-l'
                            }
                        ]
                    },
                    {
                        name: '--navbar--background-a',
                        value: [
                            {
                                name: '--color-white-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--navbar--light--background',
                        value: [
                            {
                                name: '--navbar--light--background-h',
                                value: [
                                    {
                                        name: '--color-white-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--background-s',
                                value: [
                                    {
                                        name: '--color-white-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--background-l',
                                value: [
                                    {
                                        name: '--color-white-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--background-a',
                                value: [
                                    {
                                        name: '--color-white-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--light--item--background',
                        value: [
                            {
                                name: '--navbar--light--item--background-h',
                                value: [
                                    {
                                        name: '--color-white-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--item--background-s',
                                value: [
                                    {
                                        name: '--color-white-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--item--background-l',
                                value: [
                                    {
                                        name: '--color-white-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--item--background-a',
                                value: [
                                    {
                                        name: '--color-white-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--light--item--hover--background',
                        value: [
                            {
                                name: '--navbar--light--item--hover--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--item--hover--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--item--hover--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--item--hover--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--light--item--focus--background',
                        value: [
                            {
                                name: '--navbar--light--item--focus--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--item--focus--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--item--focus--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--item--focus--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--light--item--active--background',
                        value: [
                            {
                                name: '--navbar--light--item--active--background-h',
                                value: [
                                    {
                                        name: '--color-light-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--item--active--background-s',
                                value: [
                                    {
                                        name: '--color-light-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--item--active--background-l',
                                value: [
                                    {
                                        name: '--color-light-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--item--active--background-a',
                                value: [
                                    {
                                        name: '--color-light-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--light--collapsed--background',
                        value: [
                            {
                                name: '--navbar--light--collapsed--background-h',
                                value: [
                                    {
                                        name: '--color-white-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--collapsed--background-s',
                                value: [
                                    {
                                        name: '--color-white-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--collapsed--background-l',
                                value: [
                                    {
                                        name: '--color-white-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--collapsed--background-a',
                                value: [
                                    {
                                        name: '--color-white-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--light--collapsed--item--background',
                        value: [
                            {
                                name: '--navbar--light--collapsed--item--background-h',
                                value: [
                                    {
                                        name: '--color-white-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--collapsed--item--background-s',
                                value: [
                                    {
                                        name: '--color-white-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--collapsed--item--background-l',
                                value: [
                                    {
                                        name: '--color-white-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--collapsed--item--background-a',
                                value: [
                                    {
                                        name: '--color-white-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--light--collapsed--item--hover--background',
                        value: [
                            {
                                name: '--navbar--light--collapsed--item--hover--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--collapsed--item--hover--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--collapsed--item--hover--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--collapsed--item--hover--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--light--collapsed--item--focus--background',
                        value: [
                            {
                                name: '--navbar--light--collapsed--item--focus--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--collapsed--item--focus--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--collapsed--item--focus--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--collapsed--item--focus--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--light--collapsed--item--active--background',
                        value: [
                            {
                                name: '--navbar--light--collapsed--item--active--background-h',
                                value: []
                            },
                            {
                                name: '--navbar--light--collapsed--item--active--background-s',
                                value: []
                            },
                            {
                                name: '--navbar--light--collapsed--item--active--background-l',
                                value: []
                            },
                            {
                                name: '--navbar--light--collapsed--item--active--background-a',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--navbar--dark--background',
                        value: [
                            {
                                name: '--navbar--dark--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--dark--item--background',
                        value: [
                            {
                                name: '--navbar--dark--item--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--item--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--item--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--item--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--dark--item--hover--background',
                        value: [
                            {
                                name: '--navbar--dark--item--hover--background-h',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--item--hover--background-s',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--item--hover--background-l',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--item--hover--background-a',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--dark--item--focus--background',
                        value: [
                            {
                                name: '--navbar--dark--item--focus--background-h',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--item--focus--background-s',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--item--focus--background-l',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--item--focus--background-a',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--dark--item--active--background',
                        value: [
                            {
                                name: '--navbar--dark--item--active--background-h',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--item--active--background-s',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--item--active--background-l',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--item--active--background-a',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--dark--collapsed--background',
                        value: [
                            {
                                name: '--navbar--dark--collapsed--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--collapsed--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--collapsed--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--collapsed--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--dark--collapsed--item--background',
                        value: [
                            {
                                name: '--navbar--dark--collapsed--item--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--collapsed--item--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--collapsed--item--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--collapsed--item--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--dark--collapsed--item--hover--background',
                        value: [
                            {
                                name: '--navbar--dark--collapsed--item--hover--background-h',
                                value: []
                            },
                            {
                                name: '--navbar--dark--collapsed--item--hover--background-s',
                                value: []
                            },
                            {
                                name: '--navbar--dark--collapsed--item--hover--background-l',
                                value: []
                            },
                            {
                                name: '--navbar--dark--collapsed--item--hover--background-a',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--navbar--dark--collapsed--item--focus--background',
                        value: [
                            {
                                name: '--navbar--dark--collapsed--item--focus--background-h',
                                value: []
                            },
                            {
                                name: '--navbar--dark--collapsed--item--focus--background-s',
                                value: []
                            },
                            {
                                name: '--navbar--dark--collapsed--item--focus--background-l',
                                value: []
                            },
                            {
                                name: '--navbar--dark--collapsed--item--focus--background-a',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--navbar--dark--collapsed--item--active--background',
                        value: [
                            {
                                name: '--navbar--dark--collapsed--item--active--background-h',
                                value: []
                            },
                            {
                                name: '--navbar--dark--collapsed--item--active--background-s',
                                value: []
                            },
                            {
                                name: '--navbar--dark--collapsed--item--active--background-l',
                                value: []
                            },
                            {
                                name: '--navbar--dark--collapsed--item--active--background-a',
                                value: []
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
                        value: []
                    },
                    {
                        name: '--navbar--border-right-color',
                        value: []
                    },
                    {
                        name: '--navbar--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--navbar--border-left-color',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--navbar--light--border-color',
                        value: [
                            {
                                name: '--navbar--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--dark--border-color',
                        value: [
                            {
                                name: '--navbar--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
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
                            },
                            {
                                name: '--navbar--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
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
                name: '--navbar--border-radius',
                value: [
                    {
                        name: '--navbar--border-top-left-radius',
                        value: []
                    },
                    {
                        name: '--navbar--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--navbar--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--navbar--border-bottom-left-radius',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--navbar--sm--border-radius',
                        value: [
                            {
                                name: '--navbar--sm--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--sm--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--sm--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--navbar--sm--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--navbar--md--border-radius',
                        value: [
                            {
                                name: '--navbar--md--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--navbar--md--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--navbar--lg--border-radius',
                        value: [
                            {
                                name: '--navbar--lg--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--navbar--lg--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--box-shadow',
                value: []
            },
            {
                name: '--navbar--color',
                value: [
                    {
                        name: '--navbar--color-h',
                        value: [
                            {
                                name: '--contrast-text-color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--navbar--color-s',
                        value: [
                            {
                                name: '--contrast-text-color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--navbar--color-l',
                        value: [
                            {
                                name: '--contrast-text-color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--navbar--color-a',
                        value: [
                            {
                                name: '--contrast-text-color-light-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--navbar--light--color',
                        value: [
                            {
                                name: '--navbar--light--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--light--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--dark--color',
                        value: [
                            {
                                name: '--navbar--dark--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--dark--color-a',
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
                name: '--navbar--font-size',
                value: [],
                variants: [
                    {
                        name: '--navbar--sm--font-size',
                        value: [
                            {
                                name: '--font-size-sm'
                            }
                        ]
                    },
                    {
                        name: '--navbar--md--font-size',
                        value: [
                            {
                                name: '--font-size-md'
                            }
                        ]
                    },
                    {
                        name: '--navbar--lg--font-size',
                        value: [
                            {
                                name: '--font-size-lg'
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
                        value: []
                    },
                    {
                        name: '--navbar--padding-right',
                        value: []
                    },
                    {
                        name: '--navbar--padding-bottom',
                        value: []
                    },
                    {
                        name: '--navbar--padding-left',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--navbar--brand--padding',
                        value: [
                            {
                                name: '--navbar--brand--padding-top',
                                value: []
                            },
                            {
                                name: '--navbar--brand--padding-right',
                                value: []
                            },
                            {
                                name: '--navbar--brand--padding-bottom',
                                value: []
                            },
                            {
                                name: '--navbar--brand--padding-left',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--navbar--sm--padding',
                        value: [
                            {
                                name: '--navbar--sm--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-sm'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--sm--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-sm'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--sm--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-sm'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--sm--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-sm'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--sm--brand--padding',
                        value: [
                            {
                                name: '--navbar--sm--brand--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top-sm) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--sm--brand--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-sm'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--sm--brand--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom-sm) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--sm--brand--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-sm'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--sm--item--padding',
                        value: [
                            {
                                name: '--navbar--sm--item--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top-sm) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--sm--item--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-sm'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--sm--item--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom-sm) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--sm--item--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-sm'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--md--padding',
                        value: [
                            {
                                name: '--navbar--md--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-md'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-md'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-md'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--md--brand--padding',
                        value: [
                            {
                                name: '--navbar--md--brand--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top-md) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--brand--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-md'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--brand--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom-md) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--brand--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--md--item--padding',
                        value: [
                            {
                                name: '--navbar--md--item--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top-md) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--item--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-md'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--item--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom-md) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--md--item--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--lg--padding',
                        value: [
                            {
                                name: '--navbar--lg--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-lg'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-lg'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-lg'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--lg--brand--padding',
                        value: [
                            {
                                name: '--navbar--lg--brand--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top-lg) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--brand--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-lg'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--brand--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom-lg) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--brand--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-lg'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--navbar--lg--item--padding',
                        value: [
                            {
                                name: '--navbar--lg--item--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top-lg) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--item--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-lg'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--item--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom-lg) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--navbar--lg--item--padding-left',
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
                name: '--navbar--transition',
                value: [
                    {
                        name: '--navbar--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
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
                        name: '--navbar--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    },
                    {
                        name: '--navbar--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
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
                        name: '--navbar--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--navbar--collapsible--transition',
                        value: [
                            {
                                name: '--navbar--collapsible--transition-property',
                                value: [
                                    {
                                        value: 'height, background-color, color,\n      border-color'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--item--background',
                value: [
                    {
                        name: '--navbar--item--background-h',
                        value: [
                            {
                                name: '--color-white-h'
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--background-s',
                        value: [
                            {
                                name: '--color-white-s'
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--background-l',
                        value: [
                            {
                                name: '--color-white-l'
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--background-a',
                        value: [
                            {
                                name: '--color-white-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--item--border-radius',
                value: []
            },
            {
                name: '--navbar--item--color',
                value: []
            },
            {
                name: '--navbar--item--font-size',
                value: []
            },
            {
                name: '--navbar--item--padding',
                value: [
                    {
                        name: '--navbar--item--padding-top',
                        value: []
                    },
                    {
                        name: '--navbar--item--padding-right',
                        value: []
                    },
                    {
                        name: '--navbar--item--padding-bottom',
                        value: []
                    },
                    {
                        name: '--navbar--item--padding-left',
                        value: []
                    }
                ]
            },
            {
                name: '--navbar--item--transition',
                value: [
                    {
                        name: '--navbar--item--transition-property'
                    },
                    {
                        name: '--navbar--item--transition-duration'
                    },
                    {
                        name: '--navbar--item--transition-timing-function'
                    }
                ]
            },
            {
                name: '--navbar--item--hover--background',
                value: [
                    {
                        name: '--navbar--item--hover--background-h',
                        value: [
                            {
                                name: '--color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--hover--background-s',
                        value: [
                            {
                                name: '--color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--hover--background-l',
                        value: [
                            {
                                name: '--color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--hover--background-a',
                        value: [
                            {
                                name: '--color-light-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--item--hover--color',
                value: []
            },
            {
                name: '--navbar--item--focus--background',
                value: [
                    {
                        name: '--navbar--item--focus--background-h',
                        value: [
                            {
                                name: '--color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--focus--background-s',
                        value: [
                            {
                                name: '--color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--focus--background-l',
                        value: [
                            {
                                name: '--color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--focus--background-a',
                        value: [
                            {
                                name: '--color-light-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--item--focus--color',
                value: []
            },
            {
                name: '--navbar--item--active--background',
                value: [
                    {
                        name: '--navbar--item--active--background-h',
                        value: [
                            {
                                name: '--color-light-shade-50-h'
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--active--background-s',
                        value: [
                            {
                                name: '--color-light-shade-50-s'
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--active--background-l',
                        value: [
                            {
                                name: '--color-light-shade-50-l'
                            }
                        ]
                    },
                    {
                        name: '--navbar--item--active--background-a',
                        value: [
                            {
                                name: '--color-light-shade-50-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--navbar--item--active--color',
                value: []
            },
            {
                name: '--navbar--item--active--font-weight',
                value: []
            },
            {
                name: '--navbar--collapsed--background',
                value: []
            },
            {
                name: '--navbar--collapsed--item--background',
                value: []
            },
            {
                name: '--navbar--collapsed--item--color',
                value: []
            },
            {
                name: '--navbar--collapsed--item--hover--background',
                value: []
            },
            {
                name: '--navbar--collapsed--item--hover--color',
                value: []
            },
            {
                name: '--navbar--collapsed--margin',
                value: [
                    {
                        name: '--navbar--collapsed--margin-top',
                        value: [
                            {
                                name: '--margin-top'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
