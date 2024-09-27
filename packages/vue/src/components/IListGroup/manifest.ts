import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IListGroup',
    props: [
        {
            name: 'border',
            type: ['Boolean'],
            default: 'true',
            description: 'Display the list group border'
        },
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the list group'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the list group'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for list group items '
        }
    ],
    css: {
        selector: '.list-group',
        variables: [
            {
                name: '--list-group--background',
                value: [
                    {
                        name: '--list-group--background-h',
                        value: [
                            {
                                name: '--color-white-h'
                            }
                        ]
                    },
                    {
                        name: '--list-group--background-s',
                        value: [
                            {
                                name: '--color-white-s'
                            }
                        ]
                    },
                    {
                        name: '--list-group--background-l',
                        value: [
                            {
                                name: '--color-white-l'
                            }
                        ]
                    },
                    {
                        name: '--list-group--background-a',
                        value: [
                            {
                                name: '--color-white-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--list-group--item--active--background',
                        value: [
                            {
                                name: '--list-group--item--active--background-h',
                                value: [
                                    {
                                        name: '--color-primary-h'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--item--active--background-s',
                                value: [
                                    {
                                        name: '--color-primary-s'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--item--active--background-l',
                                value: [
                                    {
                                        name: '--color-primary-l'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--item--active--background-a',
                                value: [
                                    {
                                        name: '--color-primary-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--list-group--light--background',
                        value: [
                            {
                                name: '--list-group--light--background-h',
                                value: [
                                    {
                                        name: '--color-white-h'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--light--background-s',
                                value: [
                                    {
                                        name: '--color-white-s'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--light--background-l',
                                value: [
                                    {
                                        name: '--color-white-l'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--light--background-a',
                                value: [
                                    {
                                        name: '--color-white-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--list-group--dark--background',
                        value: [
                            {
                                name: '--list-group--dark--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--dark--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--dark--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--dark--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--list-group--border-radius',
                value: [
                    {
                        name: '--list-group--border-top-left-radius',
                        value: []
                    },
                    {
                        name: '--list-group--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--list-group--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--list-group--border-bottom-left-radius',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--list-group--item--border-radius',
                        value: [
                            {
                                name: '--list-group--item--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--item--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--item--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--list-group--item--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--list-group--sm--border-radius',
                        value: [
                            {
                                name: '--list-group--sm--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--sm--border-top-right-radius',
                                value: []
                            },
                            {
                                name: '--list-group--sm--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--list-group--sm--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--list-group--md--border-radius',
                        value: [
                            {
                                name: '--list-group--md--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--md--border-top-right-radius',
                                value: []
                            },
                            {
                                name: '--list-group--md--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--list-group--md--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--list-group--lg--border-radius',
                        value: [
                            {
                                name: '--list-group--lg--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--lg--border-top-right-radius',
                                value: []
                            },
                            {
                                name: '--list-group--lg--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--list-group--lg--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '--list-group--color',
                value: [
                    {
                        name: '--list-group--color-h',
                        value: [
                            {
                                name: '--contrast-text-color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--list-group--color-s',
                        value: [
                            {
                                name: '--contrast-text-color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--list-group--color-l',
                        value: [
                            {
                                name: '--contrast-text-color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--list-group--color-a',
                        value: [
                            {
                                name: '--contrast-text-color-light-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--list-group--item--active--color',
                        value: [
                            {
                                name: '--list-group--item--active--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--item--active--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--item--active--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--item--active--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--list-group--item--disabled--color',
                        value: [
                            {
                                name: '--list-group--item--disabled--color-h',
                                value: [
                                    {
                                        name: '--text-color-weaker-h'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--item--disabled--color-s',
                                value: [
                                    {
                                        name: '--text-color-weaker-s'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--item--disabled--color-l',
                                value: [
                                    {
                                        name: '--text-color-weaker-l'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--item--disabled--color-a',
                                value: [
                                    {
                                        name: '--text-color-weaker-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--list-group--light--color',
                        value: [
                            {
                                name: '--list-group--light--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--light--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--light--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--light--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--list-group--dark--color',
                        value: [
                            {
                                name: '--list-group--dark--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--dark--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--dark--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--dark--color-a',
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
                name: '--list-group--font-size',
                value: [],
                variants: [
                    {
                        name: '--list-group--sm--font-size',
                        value: [
                            {
                                name: '--font-size-sm'
                            }
                        ]
                    },
                    {
                        name: '--list-group--md--font-size',
                        value: [
                            {
                                name: '--font-size-md'
                            }
                        ]
                    },
                    {
                        name: '--list-group--lg--font-size',
                        value: [
                            {
                                name: '--font-size-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--list-group--padding',
                value: [
                    {
                        name: '--list-group--padding-top',
                        value: []
                    },
                    {
                        name: '--list-group--padding-right',
                        value: []
                    },
                    {
                        name: '--list-group--padding-bottom',
                        value: []
                    },
                    {
                        name: '--list-group--padding-left',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--list-group--item--padding',
                        value: [
                            {
                                name: '--list-group--item--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--item--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--item--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--item--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--list-group--sm--padding',
                        value: [
                            {
                                name: '--list-group--sm--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-sm'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--sm--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-sm'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--sm--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-sm'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--sm--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-sm'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--list-group--md--padding',
                        value: [
                            {
                                name: '--list-group--md--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-md'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--md--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-md'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--md--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-md'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--md--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--list-group--lg--padding',
                        value: [
                            {
                                name: '--list-group--lg--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-lg'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--lg--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-lg'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--lg--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-lg'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--lg--padding-left',
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
                name: '--list-group--transition',
                value: [
                    {
                        name: '--list-group--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
                            }
                        ]
                    },
                    {
                        name: '--list-group--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--list-group--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    },
                    {
                        name: '--list-group--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
                            }
                        ]
                    },
                    {
                        name: '--list-group--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--list-group--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--list-group--border-width',
                value: [
                    {
                        name: '--list-group--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--list-group--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--list-group--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--list-group--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--list-group--border-style',
                value: [
                    {
                        name: '--list-group--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--list-group--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--list-group--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--list-group--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--list-group--border-color',
                value: [
                    {
                        name: '--list-group--border-top-color',
                        value: []
                    },
                    {
                        name: '--list-group--border-right-color',
                        value: []
                    },
                    {
                        name: '--list-group--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--list-group--border-left-color',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--list-group--item--active--border-color',
                        value: [
                            {
                                name: '--list-group--item--active--border-top-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--item--active--border-right-color',
                                value: []
                            },
                            {
                                name: '--list-group--item--active--border-bottom-color',
                                value: []
                            },
                            {
                                name: '--list-group--item--active--border-left-color',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--list-group--light--border-color',
                        value: [
                            {
                                name: '--list-group--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--list-group--dark--border-color',
                        value: [
                            {
                                name: '--list-group--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--list-group--dark--border-left-color',
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
    }
};

export default manifest;
