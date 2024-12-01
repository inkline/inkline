import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'DropdownItem',
    props: [
        {
            name: 'active',
            type: ['Boolean'],
            default: 'false',
            description: 'The active state of the dropdown item'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the dropdown item'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as an anchor link with a `href` attribute'
        },
        {
            name: 'plaintext',
            type: ['String'],
            default: 'div',
            description: 'Display the dropdown item as plaintext'
        },
        {
            name: 'tag',
            type: ['String'],
            default: 'div',
            description: 'Set the HTML tag to be used for rendering the dropdown item'
        },
        {
            name: 'tabindex',
            type: ['Number', 'String'],
            default: '0',
            description: 'The tabindex of the list group item'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as a Router Link component with a `to` attribute'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default dropdown item content '
        }
    ],
    css: {
        selector: '.dropdown-item',
        variables: [
            {
                name: '--dropdown-item--background',
                value: [
                    {
                        value: 'transparent'
                    }
                ],
                variants: [
                    {
                        name: '--dropdown-item--light--hover--background',
                        value: [
                            {
                                name: '--dropdown-item--light--hover--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--light--hover--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--light--hover--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--light--hover--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--light--focus--background',
                        value: [
                            {
                                name: '--dropdown-item--light--focus--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--light--focus--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--light--focus--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--light--focus--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--light--active--background',
                        value: [
                            {
                                name: '--dropdown-item--light--active--background-h',
                                value: [
                                    {
                                        name: '--color-light-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--light--active--background-s',
                                value: [
                                    {
                                        name: '--color-light-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--light--active--background-l',
                                value: [
                                    {
                                        name: '--color-light-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--light--active--background-a',
                                value: [
                                    {
                                        name: '--color-light-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--dark--hover--background',
                        value: [
                            {
                                name: '--dropdown-item--dark--hover--background-h',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--dark--hover--background-s',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--dark--hover--background-l',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--dark--hover--background-a',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--dark--focus--background',
                        value: [
                            {
                                name: '--dropdown-item--dark--focus--background-h',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--dark--focus--background-s',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--dark--focus--background-l',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--dark--focus--background-a',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--dark--active--background',
                        value: [
                            {
                                name: '--dropdown-item--dark--active--background-h',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--dark--active--background-s',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--dark--active--background-l',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--dark--active--background-a',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-a'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown-item--border-width',
                value: [
                    {
                        name: '--dropdown-item--border-top-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--border-right-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--border-bottom-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--border-left-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown-item--border-style',
                value: [
                    {
                        name: '--dropdown-item--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown-item--border-color',
                value: [
                    {
                        name: '--dropdown-item--border-top-color',
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--border-right-color',
                        value: [
                            {
                                name: '--border-right-color'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--border-bottom-color',
                        value: [
                            {
                                name: '--border-bottom-color'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--border-left-color',
                        value: [
                            {
                                name: '--border-left-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown-item--color',
                value: [
                    {
                        value: 'inherit'
                    }
                ]
            },
            {
                name: '--dropdown-item--margin',
                value: [
                    {
                        name: '--dropdown-item--margin-right',
                        value: []
                    },
                    {
                        name: '--dropdown-item--margin-left',
                        value: []
                    },
                    {
                        name: '--dropdown-item--margin-top',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--margin-bottom',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--dropdown-item--sm--margin',
                        value: [
                            {
                                name: '--dropdown-item--sm--margin-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right-sm) * -1)'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--sm--margin-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left-sm) * -1)'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--md--margin',
                        value: [
                            {
                                name: '--dropdown-item--md--margin-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right-md) * -1)'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--md--margin-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left-md) * -1)'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--lg--margin',
                        value: [
                            {
                                name: '--dropdown-item--lg--margin-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right-lg) * -1)'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--lg--margin-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left-lg) * -1)'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown-item--padding',
                value: [
                    {
                        name: '--dropdown-item--padding-top',
                        value: []
                    },
                    {
                        name: '--dropdown-item--padding-right',
                        value: []
                    },
                    {
                        name: '--dropdown-item--padding-bottom',
                        value: []
                    },
                    {
                        name: '--dropdown-item--padding-left',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--dropdown-item--sm--padding',
                        value: [
                            {
                                name: '--dropdown-item--sm--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top-sm) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--sm--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-sm'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--sm--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom-sm) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--sm--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-sm'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--md--padding',
                        value: [
                            {
                                name: '--dropdown-item--md--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top-md) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--md--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-md'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--md--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom-md) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--md--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--lg--padding',
                        value: [
                            {
                                name: '--dropdown-item--lg--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top-lg) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--lg--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-lg'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--lg--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom-lg) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--dropdown-item--lg--padding-left',
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
                name: '--dropdown-item--transition',
                value: [
                    {
                        name: '--dropdown-item--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--transition-timing-function',
                        value: []
                    },
                    {
                        name: '--dropdown-item--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--transition-timing-function',
                        value: []
                    }
                ]
            },
            {
                name: '--dropdown-item--disabled--background',
                value: []
            },
            {
                name: '--dropdown-item--disabled--color',
                value: [
                    {
                        name: '--dropdown-item--disabled--color-h',
                        value: [
                            {
                                name: '--text-color-weaker-h'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--disabled--color-s',
                        value: [
                            {
                                name: '--text-color-weaker-s'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--disabled--color-l',
                        value: [
                            {
                                name: '--text-color-weaker-l'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--disabled--color-a',
                        value: [
                            {
                                name: '--text-color-weaker-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown-item--active--background',
                value: []
            },
            {
                name: '--dropdown-item--active--color',
                value: []
            },
            {
                name: '--dropdown-item--active--font-weight',
                value: [
                    {
                        name: '--font-weight-semibold'
                    }
                ]
            },
            {
                name: '--dropdown-item--hover--background',
                value: [
                    {
                        name: '--dropdown-item--hover--background-h',
                        value: [
                            {
                                name: '--color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--hover--background-s',
                        value: [
                            {
                                name: '--color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--hover--background-l',
                        value: [
                            {
                                name: '--color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--hover--background-a',
                        value: [
                            {
                                name: '--color-light-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown-item--hover--color',
                value: []
            },
            {
                name: '--dropdown-item--focus--background',
                value: [
                    {
                        name: '--dropdown-item--focus--background-h',
                        value: [
                            {
                                name: '--color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--focus--background-s',
                        value: [
                            {
                                name: '--color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--focus--background-l',
                        value: [
                            {
                                name: '--color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--dropdown-item--focus--background-a',
                        value: [
                            {
                                name: '--color-light-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown-item--focus--color',
                value: []
            }
        ]
    }
};

export default manifest;
